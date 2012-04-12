;; This is written in Outlet: https://github.com/jlongster/outlet

;; util

(define-macro (case c . variants)
  `(cond
    ,@(map (lambda (exp)
             (if (== (car exp) 'else)
                 exp
                 `((list-find ',(car exp) ,c)
                   ,@(cdr exp))))
           variants)))


(define (list-slice lst start . end)
  (let ((end (if (null? end) (length lst) (car end))))
    (let loop ((lst lst)
               (i 0)
               (acc '()))
      (if (null? lst)
          (reverse acc)
          (loop
           (cdr lst)
           (+ i 1)
           (if (and (>= i start) (< i end))
               (cons (car lst) acc)
               acc))))))

(define (atom? exp)
  (or (symbol? exp)
      (literal? exp)))

(define (scan exp eq)
  (and (list? exp)
       (fold (lambda (el acc)
               (if (eq el)
                   (cons el acc)
                   (let ((res (scan el eq)))
                     (if res
                         (list-append res acc)
                         acc))))
             '()
             exp)))

(define (walk exp f)
  (cond
   ((symbol? exp) (or (f exp) exp))
   ((list? exp) (map (lambda (e)
                       (let ((ne (f e)))
                         (if ne ne (walk e f))))
                     exp))
   (else exp)))

;; environments and frames

(define (extend-environment env vars)
  (cons (make-frame vars) env))

(define (with-empty-regs vars)
  (zip vars (map (lambda (v) 'not-allocated))))

;; a frame is a two-element vector, a dict representing variables and
;; associated registers and a list of function names
(define (make-frame vars)
  [(with-empty-regs vars) '()])

(define (frame-vars frame)
  (vector-ref frame 0))

(define (set-frame-vars! frame vars)
  (vector-put! frame 0 vars))

(define (frame-funcs frame)
  (vector-ref frame 1))

(define (set-frame-funcs! frame funcs)
  (vector-put! frame 1 funcs))

(define top-frame car)

(define (add-to-frame frame vars)
  (let ((v* (frame-vars frame))
        (vf* (frame-funcs frame)))
    (for-each (lambda (var)
                (if (or (dict-ref v* var)
                        (list-find vf* var))
                    (throw (str "can't redefine variable: " var))))
              vars)
    (set-frame-vars!
     frame
     (dict-merge v* (with-empty-regs vars)))))

(define (add-func-to-frame frame name)
  (let ((v* (frame-vars frame))
        (vf* (frame-funcs frame)))
    (if (or (list-find v* name)
            (list-find vf* name))
        (throw (str "can't redefine variable: " name)))
    (set-frame-funcs! frame (cons name vf*))))

(define (lookup-variable env var)
  (if (list? env)
      (let ((frame (car env))
            (v (dict-ref (frame-vars frame) var)))
        (if v var (lookup-variable (cdr env) var)))
      #f))

(define (lookup-variable-reg env var)
  (if (list? env)
      (let ((frame (car env))
            (v (dict-ref (frame-vars frame) var)))
        (if v v (lookup-variable (cdr env) var)))
      #f))

(define (lookup-function env name)
  (if (list? env)
      (let ((frame (car env))
            (f (list-find (frame-funcs frame) name)))
        (if f (car f) (lookup-function (cdr env) name)))
      #f))

;; J is used to hold the return value
(define all-regs '(A B C X Y Z I))
(define r-init-template (list (make-frame '())))

(define-macro (define-prim name)
  `(add-func-to-frame (top-frame r-init-template) ',name))

(define-prim /)
(define-prim +)

(define (r-init-make)
  ;; Copy r-init-template and make a fresh environment
  (let ((frame-template (top-frame r-init-template))
        (frame (make-frame (frame-vars frame-template))))
    (set-frame-funcs! frame
                      (map (lambda (x) x)
                           (frame-funcs frame-template)))
    (list frame)))

(define r-init #f)

(define (r-init-initialize!)
  (set! r-init (r-init-make)))

;; compiler

(define register? symbol?)
(define label? symbol?)

(define (value? e)
  (or (number? e)
      (register? e)
      (label? e)))

(define (call? e)
  (== (car e) 'CALL))

(define (make-function-def name env body)
  `(FUNCTION ,name ,env ,body))

(define (function-def? e)
  (and (list? e)
       (== (car e) 'FUNCTION)))

(define function-name cadr)
(define function-env caddr)
(define (function-body f)
  (car (cdddr f)))

(define (variable-ref? e)
  (and (list? e)
       (== (car e) 'VARIABLE-REF)))

(define (compile-variable v env)
  (let ((var (lookup-variable env v)))
    (if var `(VARIABLE-REF ,var)
        (let ((f (lookup-function env v)))
          (if f `(FUNCTION-REF ,f)
              (throw (str "undefined variable: " v)))))))

(define (compile-quoted exp)
  exp)

(define (compile-definition e e* env)
  (cond
   ((list? e)
    (add-func-to-frame (top-frame env) (car e))
    (let ((fenv (extend-environment env (cdr e))))
      (make-function-def
       (car e)
       fenv
       (compile-sequence e* fenv))))
   ((symbol? e)
    (add-to-frame (top-frame env) (list e))
    (compile-assignment e (car e*) env))
   (else
    (throw (str "invalid define: " e)))))

(define (compile-assignment var exp env)
  (let ((res (compile* exp env))
        (v (lookup-variable env var)))
    (if (not v)
        (throw (str "undefined variable: " var)))
    `(SET ,v ,res)))

(define (compile-sequence e* env)
  (if (list? e*)
      (if (list? (cdr e*))
          (cons (compile* (car e*) env)
                (compile-sequence (cdr e*) env))
          (let ((e (compile* (car e*) env)))
            (if (not (or (value? e)
                         (call? e)
                         (variable-ref? e)))
                (throw (str "must return a value: " e)))
            (list `(RETURN ,e))))
      '()))

(define (compile-application v a* env)
  ;; push all the registers in the top frame
  ;; extend the environment with new frame with args
  ;; v should be a variable in the environment
  (let ((frame (top-frame env))
        (vars (frame-vars frame)))
    (if (not (or (register? v)
                 (label? v)))
        (throw (str "cannot apply to non-function type: " v)))
    (let ((f (or (lookup-variable env v)
                 (lookup-function env v)))
          (args (map
                 (lambda (a)
                   (cond
                    ((number? a) a)
                    ((value? a) (compile-variable a env))
                    (else (throw (str "bad function value: " a)))))
                 a*)))
      (if (not f)
          (throw (str "undefined variable: " v)))
      `(CALL ,frame ,f ,@args))))

(define (compile* exp cenv)
  (if (atom? exp)
      (if (symbol? exp)
          (compile-variable exp cenv)
          (compile-quoted exp))
      (case (car exp)
        ((define) (compile-definition (cadr exp) (cddr exp) cenv))
        ((set!) (compile-assignment (cadr exp) (caddr exp) cenv))
        ((if) (compile-conditional exp cenv))
        ((begin) (compile-sequence (cdr exp) cenv))
        (else (compile-application (car exp) (cdr exp) cenv)))))

;; hoist all functions within f
(define (hoist f)
  (define (reconstruct func e*)
    (make-function-def
     (function-name func)
     (function-env func)
     (reverse e*)))

  ;; walk through the function body recursively and accumulate 2
  ;; lists, one with expressions and the other with the functions.
  (define sliced
    (fold (lambda (el acc)
            (if (function-def? el)
                (let ((hoisted (hoist el)))
                  (list (car acc)
                        (list-append
                         hoisted
                         (cadr acc))))
                (list (cons el (car acc))
                      (cadr acc))))
          (list '() '())
          (function-body f)))

  ;; Returns a list of functions, reconstructing the original
  ;; function with all functions removed
  (cons (reconstruct f (car sliced))
        (cadr sliced)))

(define (linearize-return exp)
  (linearize (cadr exp) #t))

(define (linearize-function exp)
  ;; Scan the body for variable references and allocate registers
  (let ((env (function-env exp))
        (refs (map cadr (scan exp (lambda (e) (== (car e) 'VARIABLE-REF)))))
        (regs (map (lambda (r) (lookup-variable-reg env r)) refs)))
    (define walked
      (walk exp
            (lambda (e)
              (if (== (car e) 'VARIABLE-REF)
                  (let ((r (or (list-find regs (cadr e))
                               (allocate-register regs))))
                    (if (not r)
                        (throw "ran out of registers, too many variables")))
                  #f))))
    `(,(cadr walked)
      ,@(linearize (cddr walked)))))

(define (linearize exp . return?)
  (let ((r? (if (null? return?) #f (car return?))))
    (if (list? exp)
        (case (car exp)
          ((FUNCTION) (linearize-function exp))
          ((RETURN) (linearize-return exp))
          (else (map linearize exp)))))
  #f)

(define (compile exp)
  (r-init-initialize!)

  (let ((exp (compile* exp r-init)))
    ;; first, hoist all functions to top-level
    (cond
     ((atom? exp) (linearize exp))
     ((function-def? exp) (linearize (hoist exp)))
     (else
      (linearize
       (let loop ((e exp))
         (reverse
          (fold (lambda (el acc)
                  (if (function-def? el)
                      (list-append (hoist el) acc)
                      (cons el acc)))
                '()
                e))))))))

(define-macro (assert v1 v2)
  `(let ((res1 ,v1)
         (res2 ,v2))
     (if (not (= res1 res2))
         (throw (str "assert failed: "
                     ',v1 " got " res1
                     " but expected " res2)))))

;; (r-init-initialize!)
;; (assert (compile* 3 r-init) 3)
;; (r-init-initialize!)
;; (assert (compile* '(define OO 3) r-init) '(SET OO 3))
;; (r-init-initialize!)
;; (assert (compile* '(define (a) 3) r-init) '(FUNCTION a ((RETURN 3))))

(r-init-initialize!)
(pp (compile* '(begin
                (define (foo x y z w)
                  x y z (+ w 1))
                3)
             r-init))

;; (pp (compile '(begin
;;                 (define (foo x y z w)
;;                   (define (baz y u i o p q e) (/ x 1))
;;                   (define (biz x) (/ x 1))
;;                   (define (buz x)
;;                     (define (inside c) (/ c 1))
;;                     (/ x 1))
;;                   (+ baz 1))
;;                 (foo 1 2 3))))
