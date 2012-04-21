;; This is written in Outlet: https://github.com/jlongster/outlet

(require (fs "fs")
         (path "path"))

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

(define (list-pop lst v)
  (reverse
   (fold (lambda (el acc)
           (if (== v el)
               acc
               (cons el acc)))
         '()
         lst)))

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

;; macros

(define (expand exp)
  (cond
   ((or (atom? exp)
        (vector? exp)
        (dict? exp)) exp)
   ((macro? (car exp))
    (expand ((macro-function (car exp)) exp)))
   ((eq? (car exp) 'quote) exp)
   ((eq? (car exp) 'lambda)
    `(lambda ,(cadr exp)
       ,@(map expand (cddr exp))))
   ((eq? (car exp) 'define)
    `(define ,(cadr exp)
       ,@(map expand (cddr exp))))
   (else (map expand exp))))

(define %macros {})

(define (macro-function name)
  (dict-ref %macros name))

(define (install-macro name f)
  (dict-put! %macros name f))

(define (macro? name)
  (and (dict-ref %macros name) #t))

(install-macro 'define-macro
               (lambda (form)
                 (let ((sig (cadr form)))
                   (let ((name (car sig))
                         (pattern (cdr sig))
                         (body (cddr form)))
                     ;; install it during expand-time
                     (install-macro name (make-macro pattern body))
                     0))))

(install-macro 'define-inline
               (lambda (form)
                 (let ((name/args (cadr form))
                       (body (cddr form)))
                   (install-inline (car name/args)
                                   (cdr name/args)
                                   body)
                   0)))

(install-macro 'define-prim
               (lambda (form)
                 (let ((name/args (cadr form))
                       (body (cddr form)))
                   (install-global-func (car name/args)
                                        (cdr name/args)
                                        '()
                                        #f)
                   0)))

(install-macro 'require
               (lambda (form)
                 (read (get-file-source (cadr form)))))

(install-macro 'include
               (lambda (form)
                 `(%raw ,(get-file-source (cadr form)))))

(define (get-file-source file)
  (define (rd p)
    (if p
        (let ((joined (path.join p file)))
          (if (path.existsSync joined)
              (fs.readFileSync joined "utf-8")
              #f))
        #f))

  (let ((src (or (rd (get-current-filepath))
                 (rd __dirname))))
    (if (not src)
        (throw (str "cannot find file: " file))
        src)))

(define (make-macro pattern body)
  (let ((x (gensym))
        (e (gensym)))
    (eval `(lambda (,x)
             (let ,(destructure pattern `(cdr ,x) '())
               ,@body)))))

(define (destructure pattern access bindings)
  (cond
   ((null? pattern) bindings)
   ((eq? (car pattern) '.) (cons (list (cadr pattern) access)
                                bindings))
   (else
    (cons (list (car pattern) `(car ,access))
          (destructure (cdr pattern) `(cdr ,access)
                       bindings)))))

;; environments and frames

(define (environment? obj)
  (and (list? obj)
       (and (vector? (car obj))
            (== (vector-length (car obj)) 3)
            (symbol? (vector-ref (car obj) 2)))))

(define (extend-environment env vars enclosing-func)
  (cons (make-frame vars enclosing-func) env))

(define (empty-dict vals def)
  (zip vals (map (lambda (v) def) vals)))

;; a frame is a three-element vector, a dict representing variables and
;; associated registers, a dict of function names and objects, and the
;; name of the enclosing function
(define (make-frame vars enclosing-func)
  [(empty-dict vars 'not-allocated)
   (empty-dict '() 'not-created)
   enclosing-func])

(define (frame-vars frame)
  (vector-ref frame 0))

(define (set-frame-vars! frame vars)
  (vector-put! frame 0 vars))

(define (frame-funcs frame)
  (vector-ref frame 1))

(define (set-frame-funcs! frame funcs)
  (vector-put! frame 1 funcs))

(define (frame-enclosing-function frame)
  (vector-ref frame 2))

(define (set-frame-enclosing-function frame name)
  (vector-set! frame 2 name))

(define top-frame car)
(define next-frames cdr)

(define (add-to-frame frame vars)
  (let ((v* (frame-vars frame))
        (vf* (frame-funcs frame)))
    (for-each (lambda (var)
                (if (or (dict-ref v* var)
                        (dict-ref vf* var))
                    (throw (str "can't redefine variable: " var))))
              vars)
    (set-frame-vars!
     frame
     (dict-merge v* (empty-dict vars 'not-allocated)))))

(define (add-func-to-frame frame name)
  (let ((v* (frame-vars frame))
        (vf* (frame-funcs frame)))
    (if (or (dict-ref v* name)
            (dict-ref vf* name))
        (throw (str "can't redefine variable: " name)))
    (dict-put! vf* name 'not-created)))

(define (lookup-variable env var)
  (if (global-variable? var)
      var
      (%lookup-variable env var)))

(define (%lookup-variable env var)
  (if (list? env)
      (let ((frame (car env))
            (v (dict-ref (frame-vars frame) var)))
        (if v var (lookup-variable (cdr env) var)))
      #f))

(define (lookup-variable-reg env var)
  (if (global-variable? var)
      var
      (%lookup-variable-reg env var)))

(define (%lookup-variable-reg env var)
  (if (list? env)
      (let ((frame (car env))
            (v (dict-ref (frame-vars frame) var)))
        (if v v (lookup-variable-reg (cdr env) var)))
      #f))

(define (%allocate-registers env vars free-regs)
  ;; note that we don't verify that all vars exist, that's someone
  ;; else's job
  (if (and (list? env)
           (not (null? vars)))
      (let ((frame (car env))
            (v* (frame-vars frame)))
        (%allocate-registers
         (cdr env)
         (fold (lambda (v acc)
                 (if (== (dict-ref v* v) 'not-allocated)
                     (begin
                       ;; this is hacky, need to check the free regs
                       ;; and pop one off
                       (if (null? free-regs)
                           (throw "ran out of registers, too many variables"))
                       (dict-put! v* v (car free-regs))
                       (set! free-regs (cdr free-regs))
                       acc)
                     (cons v acc)))
               '()
               vars)
         free-regs))))

(define (allocate-registers env vars)
  (let loop ((vars vars)
             (unallocated '())
             (free-regs all-regs))
    (if (null? vars)
        (%allocate-registers env unallocated free-regs)
        (let ((reg (lookup-variable-reg env (car vars))))
          (if (not reg)
              (throw (str "can't allocate reg for non-existant variable: "
                          (car vars)
                          "\nwhat the heck man? why'd you give me that?")))
          (if (== reg 'not-allocated)
              (loop (cdr vars)
                    (cons (car vars) unallocated)
                    free-regs)
              (loop (cdr vars)
                    unallocated
                    (list-pop free-regs reg)))))))

(define (lookup-function env name)
  (if (inline-function? name)
      name
      (%lookup-function env name)))

(define (%lookup-function env name)
  (if (list? env)
      (let ((frame (car env))
            (def (dict-ref (frame-funcs frame) name)))
        (if def name (%lookup-function (cdr env) name)))
      #f))

(define (lookup-function-def env name)
  (if (list? env)
      (let ((frame (car env))
            (def (dict-ref (frame-funcs frame) name)))
        (if def def (lookup-function-def (cdr env) name)))
      #f))

(define (namespaced-function-name env name)
  (if (inline-function? name)
      name
      (%namespaced-function-name env name)))

(define (%namespaced-function-name env name)
  (if (list? env)
      (let ((frame (car env))
            (def (dict-ref (frame-funcs frame) name)))
        (if def
            (string->symbol
             (generate-global-name env name))
            (%namespaced-function-name (cdr env) name)))))

(define (generate-global-name env name)
  (define names
    (list->vector
     (list-append
      (if (null? env)
          '()
          (map str
               (map frame-enclosing-function
                    (cdr (reverse env)))))
      (list (str name)))))
  (names.join "-"))

(define (save-function-def! env name def)
  (let ((frame (car env))
        (vf* (frame-funcs frame))
        (vf-def (dict-ref vf* name)))
    (if vf-def
        (begin
          (if (not (== vf-def 'not-created))
              (throw
               (str "can't set function environment, already set: " name)))
          (dict-put! vf* name def))
        (throw "can't set function environment of non-local functio"))))

;; deref

(define (strip-deref var)
  (if (vector? var)
      (vector-ref var 0)
      var))

(define dereference? vector?)

;; globals

(define %globals '())

(define (add-to-globals var)
  (set! %globals (cons var %globals)))

(define (global-variable? var)
  (list-find %globals var))

;; inlines

(define %inlines '())

(define (add-inline inl)
  (set! %inlines (cons inl %inlines)))

(define (make-inline name args body)
  `(INLINE ,name ,args ,body))

(define inline-name cadr)
(define inline-args caddr)
(define (inline-body e)
  (car (cdddr e)))

(define (inline? exp)
  (and (list? exp)
       (== (car exp) 'INLINE)))

(define (inline-function? name)
  (fold (lambda (el acc)
          (or (== (inline-name el) name)
              acc))
        #f
        %inlines))

(define (get-inline-def name)
  (let loop ((lst %inlines))
    (if (== (inline-name (car lst)) name)
        (car lst)
        (loop (cdr lst)))))

;; inlines aren't guaranteed to be inlined, so we need to also install
;; them as regular functions
(define (linearized-inline-functions)
  (apply
   list-append
   (map (lambda (i)
          (linearize
           (lookup-function-def r-init-template
                                (inline-name i))))
        %inlines)))

(define (install-inline name args body)
  (let ((compiled (compile `(define (,name ,@args) ,@body)))
        (target (car args)))
    (add-inline
     (make-inline name args
                  (replace-variable-refs
                   (function-body (car compiled))
                   #f #f)))

    (define walked
      (walk body
            (lambda (e)
              (if (symbol? e)
                  (cond
                   ((== e target) 'J)
                   (else #f))
                  #f))))
    
    ;; the function version doesn't take a target argument (the first
    ;; arg) and has all references to target replaced with the J
    ;; register
    (install-global-func name (cdr args)
                         walked
                         #f)))

(define-macro (define-inline name/args . body)
  (let ((name (car name/args))
        (args (cdr name/args))
        (target (car args)))
    `(install-inline ',name ',args ',body)))

;; J is used to hold the return value
(define all-regs '(A B C X Y Z I))
(define r-init-template (list (make-frame '() 'global)))

(define (install-global-func name args body native?)
  (let ((env (extend-environment r-init-template
                                 args
                                 name)))
    (add-func-to-frame (top-frame r-init-template) name)
    (allocate-registers env args)
    
    (save-function-def!
     r-init-template
     name
     (make-function-def name args env
                        (compile-sequence body env)
                        native?))))

(define-macro (define-prim func . native?)
  (let ((name (car func))
        (args (cdr func))
        (native? (if (null? native?) #f (car native?))))
    `(install-global-func ',name ',args '() ,native?)))

(define-macro (define-native func)
  `(define-prim ,func #t))

(define-macro (define-global name)
  `(add-to-globals ,name))

(define (r-init-make)
  ;; Copy r-init-template and make a fresh environment
  (let ((frame-template (top-frame r-init-template))
        (frame (make-frame (keys (frame-vars frame-template))
                           (frame-enclosing-function frame-template))))
    (set-frame-funcs! frame
                      (dict-map (lambda (x) x)
                                (frame-funcs frame-template)))
    (list frame)))

(define r-init #f)

(define (r-init-initialize!)
  (set! r-init (r-init-make)))

;; intermediate representation

(define register? symbol?)
(define label? symbol?)

(define (value? e)
  (or (number? e)
      (register? e)
      (label? e)))

(define (call? e)
  (and (list? e)
       (== (car e) 'CALL)))

(define (make-function-def name args env body . native?)
  (let ((native? (if (null? native?) #f (car native?))))
    `(FUNCTION ,name ,args ,env ,body ,native?)))

(define (function-def? e)
  (and (list? e)
       (== (car e) 'FUNCTION)))

(define function-name cadr)
(define function-args caddr)
(define (function-env f)
  (car (cdddr f)))
(define (function-body f)
  (cadr (cdddr f)))
(define (function-native? f)
  (caddr (cdddr f)))
(define (function-prefix f)
  (car (cdddr (cdddr f))))

(define (make-application env name args)
  `(CALL ,env ,name ,args))

(define (application? e)
  (and (list? e)
       (== (car e) 'CALL)))

(define application-env cadr)
(define application-name caddr)
(define (application-args e)
  (car (cdddr e)))

(define (application-full-name env e)
  (namespaced-function-name env (application-name e)))

(define (make-set name env v)
  `(SET ,env ,name ,v))

(define (set? e)
  (and (list? e)
       (== (car e) 'SET)))

(define set-name caddr)
(define set-env cadr)
(define (set-value s)
  (car (cdddr s)))

(define (variable-ref? e)
  (and (list? e)
       (== (car e) 'VARIABLE-REF)))

(define (make-const v)
  `(CONST ,v))

(define (const? v)
  (and (list? v)
       (== (car v) 'CONST)))

(define const-value cadr)

(define (make-if cnd tru alt)
  `(IF ,cnd ,tru ,alt))

(define (if? exp)
  (and (list? exp)
       (== (car exp) 'IF)))

(define if-cnd cadr)
(define if-tru caddr)
(define (if-alt exp)
  (car (cdddr exp)))

(define (make-deref v)
  `(DEREF ,v))

(define (deref? v)
  (and (list? v)
       (== (car v) 'DEREF)))

(define deref-value cadr)

;; compiler

(define (compile-variable v env)
  (let ((var (lookup-variable env v)))
    (if var
        `(VARIABLE-REF ,v)
        (let ((f (lookup-function env v)))
          (if f
              `(FUNCTION-REF ,f)
              (throw (str "compile-variable: undefined variable: " v)))))))

(define (compile-deref exp env)
  (let ((v (vector-ref exp 0)))
    (if (not (or (number? v) (symbol? v)))
        (throw (str "can't deref expression: " v)))
    (make-deref (compile* v env))))

(define (compile-quoted exp)
  (make-const exp))

(define (compile-definition e e* env)
  (cond
   ((list? e)
    (let ((name (car e)))
      (add-func-to-frame (top-frame env) name)
      (let ((fenv (extend-environment env (cdr e) name)))
        (let ((def (make-function-def
                    name
                    (cdr e)
                    fenv
                    (compile-sequence e* fenv))))
          (save-function-def! env name def)))))
   ((symbol? e)
    (add-to-frame (top-frame env) (list e))
    (compile-assignment e (car e*) env))
   (else
    (throw (str "invalid define: " e)))))

(define (compile-assignment var exp env)
  (let ((res (compile* exp env))
        (v (lookup-variable env var)))
    (if (not v)
        (throw (str "compile-assignment: undefined variable: " var)))
    (make-set v env res)))

(define (compile-conditional cnd exp alt env)
  (make-if (compile* cnd env)
           (compile* exp env)
           (and alt (compile* alt env))))

(define (compile-sequence e* env)
  (define (begin? e)
    (and (list? e) (== (car e) 'begin)))

  (if (list? e*)
      (let ((exp (car e*)))
        (if (list? (cdr e*))
            ;; begin expressions are spliced in
            (begin
              ((if (begin? exp) list-append cons)
               (compile* exp env)
               (compile-sequence (cdr e*) env)))
            (let ((e (compile* exp env)))
              (cond
               ((begin? exp) e)
               ((function-def? e) (list e))
               (else (list `(RETURN ,e)))))))
      '()))

(define (compile-application v a* env)
  (let ((frame (top-frame env))
        (vars (frame-vars frame)))
    (if (not (or (register? v)
                 (label? v)))
        (throw (str "cannot apply to non-function type: " v)))
    (let ((f (or (lookup-variable env v)
                 (lookup-function env v)))
          (args (map
                 (lambda (a)
                   (if (and (list? a)
                            (== (car a) 'set!))
                       (throw (str "bad function value: " a)))
                   (compile* a env))
                 a*)))
      (if (not f)
          (throw (str "compile-application: undefined variable: " v)))
      (make-application env f args))))

(define (compile* exp cenv)
  (cond
   ((atom? exp) (if (symbol? exp)
                    (compile-variable exp cenv)
                    (compile-quoted exp)))
   ((dereference? exp) (compile-deref exp cenv))
   (else
    (case (car exp)
      ((define) (compile-definition (cadr exp) (cddr exp) cenv))
      ((set!) (compile-assignment (cadr exp) (caddr exp) cenv))
      ((if) (compile-conditional (cadr exp)
                                 (caddr exp)
                                 (if (null? (cdddr exp))
                                     #f
                                     (car (cdddr exp)))
                                 cenv))
      ((begin) (compile-sequence (cdr exp) cenv))
      ((%raw) `(RAW ,(cadr exp)))
      (else (compile-application (car exp) (cdr exp) cenv))))))

;; hoist functions to top-level
(define (hoist exp)
  (let ((hoisted (%hoist exp)))
    ;; simply combine the top-leve expressions with the list of
    ;; functions
    (if (null? (cadr hoisted))
        (caddr hoisted)
        (if (null? (caddr hoisted))
            (cadr hoisted)
            (list-append (cadr hoisted) (caddr hoisted))))))

(define (%hoist exp)
  (define (reconstruct func e*)
    (make-function-def
     (function-name func)
     (function-args func)
     (function-env func)
     (reverse e*)))

  ;; walk through each element, passing a 2-element list through to
  ;; keep track of expressions and functions
  (cond
   ((or (literal? exp)
        (symbol? exp)
        (vector? exp)
        (dict? exp)) (list 'VALUE exp '()))
   ((function-def? exp)
    (let ((r (%hoist (function-body exp))))
      (list 'FUNCTIONS '() (cons (reconstruct exp (reverse (cadr r)))
                                 (caddr r)))))
   (else
    (fold (lambda (el acc)
            (let ((r (%hoist el)))
              (list 'VALUE
                    ;; append what's in cadr if it's not a function
                    ;; def
                    (if (== (car r) 'VALUE)
                        (list-append (cadr acc) (list (cadr r)))
                        (cadr acc))
                    (list-append (caddr acc) (caddr r)))))
          (list #f '() '())
          exp))))

;; allocate registers for each function
(define (allocate e*)
  ;; we expect that all functions have been hoisted by now, so just
  ;; need to walk across the top-level forms
  (for-each (lambda (e)
              (if (function-def? e)
                  (if (null? (function-body e))
                      (throw (str "error: empty function body: "
                                  (function-name e)
                                  " (WAT?)"))
                      (%allocate e))
                  e))
            e*)
  e*)

(define (%allocate f)
  (allocate-registers
   (function-env f)
   (map (lambda (v)
          (if (variable-ref? v)
              (cadr v)
              (set-name v)))
        (scan (function-body f)
              (lambda (e)
                (or (== (car e) 'SET)
                    (and (== (car e) 'VARIABLE-REF)
                         (not (global-variable? (cadr e))))))))))

(define (linearize-deref exp target)
  (let ((x (deref-value exp))
        (v (if (const? x)
               (const-value x)
               x)))
    (if target
        `((SET ,target [,v]))
        [v])))

(define (linearize-reference exp target)
  (if (and target (not (== exp target)))
      `((SET ,target ,exp))
      '()))

(define (linearize-return exp)
  (linearize (cadr exp) 'J))

(define (replace-variable-refs exp env . strict?)
  (let ((strict? (if (null? strict?) #t (car strict?))))
    (walk exp
          (lambda (e)
            (cond
             ((== (car e) 'VARIABLE-REF)
              (if strict?
                  (let ((v (cadr e))
                        (r (lookup-variable-reg env v)))
                    (if (not r)
                        (throw (str "error, register not assigned: " e)))
                    r)
                  (cadr e)))
             ((== (car e) 'FUNCTION-REF)
              (if strict?
                  (namespaced-function-name env (cadr e))
                  (cadr e)))
             (else #f))))))

(define (linearize-function exp)
  (let ((env (function-env exp))
        (replaced (replace-variable-refs exp env))
        (vars (frame-vars (top-frame env))))
    `(,(namespaced-function-name env (function-name exp))
      ,@(fold (lambda (el acc)
                (if (not (== (dict-ref vars el) 'not-allocated))
                    (cons
                     `(SET ,(dict-ref vars el) POP) acc)
                    acc))
              '()
              (function-args exp))
      ,@(linearize (function-body replaced))
      (SET PC POP))))

(define (linearize-assignment exp)
  (let ((var (set-name exp))
        (reg (lookup-variable-reg (set-env exp) var))
        (v (set-value exp)))
    (linearize v reg)))

(define (linearize-constant exp target)
  (if target
      `((SET ,target ,(const-value exp)))
      '()))

(define (linearize-if exp target)
  (let ((exit-label (string->symbol (str "exit-" (gensym))))
        (alt-label (string->symbol (str "alt-" (gensym)))))
    (list-append
     (linearize (if-cnd exp) 'J)
     `((IFE J 0)
       (SET PC ,alt-label)
       ,@(linearize (if-tru exp) target)
       (SET PC ,exit-label)
       ,alt-label
       ,@(if (if-alt exp)
             (linearize (if-alt exp) target)
             '())
       ,exit-label))))

(define (linearize-arg exp)
  (if (or (application? exp)
          (if? exp))
      (list-append
       (linearize exp 'J)
       `((SET PUSH J)))
      (linearize exp 'PUSH)))

(define (linearize-arguments args arg-values arg-regs)
  (let loop ((a* args)
             (acc '()))
    (if (null? a*)
        acc
        (let ((var (car a*))
              (reg (dict-ref arg-regs var))
              (exp (dict-ref arg-values var)))
          (if (not reg)
              (throw (str "linearize-arguments: undefined variable" var)))
          (loop (cdr a*)
                (if (== reg 'not-allocated)
                    acc
                    (list-append
                     acc
                     (linearize-arg exp))))))))

(define (native-application? exp)
  (let ((env (application-env exp))
        (def (lookup-function-def env (application-name exp))))
    (if (not def)
        (throw (str "undefined function: " (application-name exp))))
    (function-native? def)))

(define (inline-application? exp)
  (inline-function? (application-name exp)))

(define (simple-exp? e)
  (or (const? e) (symbol? e) (deref? e)))

(define (linearize-inline-application exp target)
  (let ((env (application-env exp))
        (def (get-inline-def (application-name exp)))
        (all-args (inline-args def))
        (target-name (car all-args))
        (args (zip (cdr all-args)
                   (application-args exp))))

    (if (fold (lambda (el acc) (and acc (simple-exp? el)))
              #t
              (application-args exp))
        (begin
          ;; inlinable, replace variables with the arguments and the
          ;; target register
          (define walked
            (walk (inline-body def)
                  (lambda (e)
                    (if (symbol? e)
                        (cond
                         ((dict-ref args e) (dict-ref args e))
                         ((== e target-name) target)
                         (else #f))
                        #f))))
          (linearize walked))
        ;; not inlinable, call as normal function
        (linearize-application
         (make-application env
                           (application-name exp)
                           (application-args exp))
         target))))

(define (linearize-native-application exp)
  (define (simplify a)
    (cond
     ((const? a) (const-value a))
     ((symbol? a) a)
     ((deref? a) (linearize-deref a))
     (else
      (throw "error: found compound expression as native arg"))))
  
  (let ((env (application-env exp))
        (def (lookup-function-def env (application-name exp)))
        (fenv (function-env def))
        (arg-regs (frame-vars (top-frame fenv)))
        (args (application-args exp)))

    ;; DAT is a special hack for now because it takes variable args
    (if (== (application-name exp) 'DAT)
        `((DAT ,@(map simplify (application-args exp))))
        (begin
          (if (and (not (null? args))
                   (not (simple-exp? (car args))))
              (throw "error: first arg to native application must be simple"))
          (list-append
           (if (and (not (null? args))
                    (not (null? (cdr args)))
                    (not (simple-exp? (cadr args))))
               (let ((arg1 (linearize (cadr args) 'J)))
                 (set! args (list (car args) 'J))
                 arg1)
               '())
           `((,(application-name exp)
              ,@(map simplify args))))))))

(define (linearize-application exp target)
  (define (allocated-regs frame)
    (let ((vars (frame-vars frame)))
      (fold (lambda (v acc)
              (if (== (dict-ref vars v) 'not-allocated)
                  acc
                  (cons (dict-ref vars v) acc)))
            '()
            (keys vars))))

  (define (all-allocated-regs env)
    (apply list-append (map allocated-regs env)))

  (let ((env (application-env exp))
        (def (lookup-function-def env (application-name exp)))
        (fenv (function-env def))
        (all-regs (all-allocated-regs env))
        (arg-regs (frame-vars (top-frame fenv)))
        (arg-vals (zip (function-args def)
                       (application-args exp)))
        (ret (string->symbol (str "return-" (gensym)))))

    (if (not (== (length (function-args def))
                 (length (application-args exp))))
        (throw (str "wrong number of arguments for "
                    (cons (function-name def) (function-args def))
                    ", got " (length (application-args exp)))))

    (list-append
     ;; save the env
     (fold (lambda (reg acc)
             (if (== reg target)
                 acc
                 (cons `(SET PUSH ,reg) acc)))
           '()
           all-regs)

     ;; calling convention: return value is pushed first, then the args
     `((SET PUSH ,ret))
     
     ;; push the arguments
     (linearize-arguments (function-args def) arg-vals arg-regs)

     ;; call the function
     `((SET PC ,(application-full-name env exp))
       ,ret)

     ;; set the result (if needed)
     (if (and target (not (== target 'J)))
         `((SET ,target J))
         '())
     
     ;; restore the env
     (fold (lambda (reg acc)
             (if (== reg target)
                 acc
                 (cons `(SET ,reg POP) acc)))
           '()
           (reverse all-regs)))))

(define (linearize exp . target)
  (let ((target (if (null? target) #f (car target))))
    (if (list? exp)
        (case (car exp)
          ((FUNCTION) (linearize-function exp))
          ((RETURN) (linearize-return exp))
          ((CALL) (cond
                   ((inline-application? exp)
                    (linearize-inline-application exp target))
                   ((native-application? exp)
                    (linearize-native-application exp))
                   (else
                    (linearize-application exp target))))
          ((SET) (linearize-assignment exp))
          ((CONST) (linearize-constant exp target))
          ((DEREF) (linearize-deref exp target))
          ((IF) (linearize-if exp target))
          ((RAW) (list exp))
          (else
           (let loop ((lst exp)
                      (acc '()))
             (if (null? lst)
                 acc
                 (if (null? (cdr lst))
                     (list-append acc
                                  (linearize (car lst) target))
                     (loop (cdr lst)
                           (list-append acc
                                        (linearize (car lst)))))))))
        (if target
            (linearize-reference exp target)
            (throw (str "cannot linearize expression: " exp))))))

(define (compile exp)
  (r-init-initialize!)
  (allocate (hoist (compile* exp r-init))))

(define (output . e*)
  ;; wow, this is bad code
  (define (to-str v)
    (cond
     ((number? v)
      (str "0x" (v.toString 16)))
     ((vector? v)
      (apply str `("[" ,@(map to-str (vector->list v)) "]")))
     ((symbol? v)
      (let ((s (str v)))
        ;; This is hacky, but gets rid of a bunch of invalid
        ;; characters in names
        (set! s (s.replace (RegExp "-" "g") "_dash_"))
        (set! s (s.replace (RegExp "\\?" "g") "_p_"))
        (set! s (s.replace (RegExp "\\!" "g") "_excl_"))
        (set! s (s.replace (RegExp ">" "g") "_gt_"))
        (set! s (s.replace (RegExp "<" "g") "_lt_"))
        (set! s (s.replace (RegExp "%" "g") "_per_"))
        (set! s (s.replace (RegExp "=" "g") "_eq_"))
        (set! s (s.replace (RegExp "\\/" "g") "_slash_"))
        (set! s (s.replace (RegExp "\\+" "g") "_plus_"))
        (set! s (s.replace (RegExp "\\*" "g") "_star_"))
        s))
     (else
      (str v))))

  (for-each (lambda (e)
              (cond
               ((list? e)
                (case (car e)
                  ((%) (begin
                         (print "; ")
                         (let ((v* (list->vector (map str (cdr e)))))
                           (println (v*.join " ")))))
                  ((RAW) (println (cadr e)))
                  (else
                   (print (str (car e) " "))
                   (let ((v (list->vector (map to-str (cdr e)))))
                     (println (v.join ", "))))))
               ((symbol? e) (println (str ":" (to-str e))))
               (else
                (throw (str "invalid expression: " e)))))
            (apply list-append e*)))

;; strip the env objects out of our structure so that we can inspect
;; it easier (envs contain tons of circular references). only works on
;; non-linearized forms
(define (strip-envs exp)
  (if (list? exp)
      (reverse
       (fold (lambda (el acc)
               (if (environment? el)
                   acc
                   (cons (strip-envs el) acc)))
             '()
             exp))
      exp))

;; print a non-linearized form without its envs (which have tons of
;; circular references)
(define (pp-w/o-envs exp)
  (let ((stripped (strip-envs exp)))
    (pp stripped)))

(define-native (SET x y))
(define-native (ADD x y))
(define-native (SUB x y))
(define-native (MUL x y))
(define-native (DIV x y))
(define-native (MOD x y))
(define-native (SHL x y))
(define-native (SHR x y))
(define-native (AND x y))
(define-native (BOR x y))
(define-native (XOR x y))
(define-native (IFE x y))
(define-native (IFN x y))
(define-native (IFG x y))
(define-native (IFB x y))
(define-native (BRK))
(define-native (DAT))

(define-global 'PC)
(define-global 'SP)
(define-global 'POP)
(define-global 'PUSH)
(define-global 'A)
(define-global 'B)
(define-global 'C)
(define-global 'X)
(define-global 'Y)
(define-global 'Z)
(define-global 'I)
(define-global 'J)
(define-global '__exit)

(define %current-filepath #f)

(define (get-current-filepath)
  %current-filepath)

(define (compile-file path . rest)
  (set! %current-filepath path)
  (apply
   compile-program
   (cons (fs.readFileSync path "utf-8") rest)))

(define (compile-program src . rest)
  ;; read the source and force it into a begin expression
  (let ((target (if (null? rest) #f (car rest)))
        (runtime? (if (or (not (list? rest))
                          (null? (cdr rest)))
                      #t
                      (cadr rest)))
        (exp (if (string? src) (read src) src))
        (lib (read (fs.readFileSync (str __dirname "/lib.ol") "utf-8")))
        (exp (if (and (list? exp)
                      (== (car exp) 'begin))
                 exp
                 `(begin ,exp))))

    (define code
      ;; wrap it around these forms because they are required for it
      ;; to work right, and splice in the body of the begin exp
      `(begin
         ,@(if runtime? (cdr lib) '())
         (define (entry)
           ,@(cdr exp))))

    (case target
      ((expand) (expand code))

      ((compile-phase1)
       (r-init-initialize!)
       (compile* (expand code) r-init))

      ((compile-phase2)
       (r-init-initialize!)
       (hoist (compile* (expand code) r-init)))

      ((compile-phase3)
       (compile (expand code)))

      ((linearize)
       (linearize (compile (expand code))))

      (else
       ;; expand first because it might install inline functions
       (let ((expanded (expand code)))
         (output
          '((% Generated by LCPU)
            (% http://jlongster.github.com/dcpu-lisp/)
            (%)
            (JSR entry)
            (SET PC __exit))
          (if runtime? (linearized-inline-functions) '())
          (linearize
           (compile expanded))
          '(__exit
            (SET PC __exit)
            __end)))))))

(define (print-expand src)
  (pp (compile-program src 'expand)))

(define (print-compiled-phase1 src)
  (pp-w/o-envs (compile-program src 'compile-phase1)))

(define (print-compiled-phase2 src)
  (pp-w/o-envs (compile-program src 'compile-phase2)))

(define (print-compiled-phase3 src)
  (pp-w/o-envs (compile-program src 'compile-phase3)))

(define (print-linearized src)
  (pp (compile-program src 'linearize)))

(set! module.exports {:compile-file compile-file
                      :compile compile-program
                      :print-expand print-expand
                      :print-compiled-phase1 print-compiled-phase1
                      :print-compiled-phase2 print-compiled-phase2
                      :print-compiled-phase3 print-compiled-phase3
                      :print-linearized print-linearized
                      :pp-w/o-envs pp-w/o-envs
                      :walk walk
                      :scan scan})
