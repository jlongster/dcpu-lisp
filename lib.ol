
(define-macro (return)
  `(SET PC POP))

(define-macro (not exp)
  `(begin
     ,exp
     (IFE J 0)
     (SET J 1)
     (SET J 0)))

(define-macro (exit)
  `(SET PC __exit))

;; arithmetic

(define-inline (+ t x y)
  (SET t x)
  (ADD t y))

(define-inline (- t x y)
  (SET t x)
  (SUB t y))

(define-inline (* t x y)
  (SET t x)
  (MUL t y))

(define-inline (/ t x y)
  (SET t x)
  (DIV t y))

(define-inline (% t x y)
  (SET t x)
  (MOD t y))

(define-inline (<< t x y)
  (SET t x)
  (SHL t y))

(define-inline (>> t x y)
  (SET t x)
  (SHR t y))

;; predicates

;; we must branch on the instruction after the test, and jump to a
;; unique place and return a success value. do this by creating an
;; internal function and using `SET PC` to jump right to it.
;; TODO: make these inlinable

(define (< x y)
  (define (ret) (SET J 0))
  (IFG x y)
  (SET PC ret)
  (IFE x y)
  (SET PC ret)
  (SET J 1))

(define (<= x y)
  (define (ret) (SET J 0))
  (IFG x y)
  (SET PC ret)
  (SET J 1))

(define (> x y)
  (define (ret) (SET J 1))
  (IFG x y)
  (SET PC ret)
  (SET J 0))

(define (>= x y)
  (define (ret) (SET J 1))
  (IFG x y)
  (SET PC ret)
  (IFE x y)
  (SET PC ret)
  (SET J 0))

(define (= x y)
  (define (ret) (SET J 1))
  (IFE x y)
  (SET PC ret)
  (SET J 0))

;; looping

;; TODO: this is a quick hack, and is recursive, while it should be
;; iterative. need to convert it into optimized assembly.
(define-macro (do act . body)
  (if (not (symbol? (car act)))
      (throw (str "do requires a variable name as "
                  " the first element: " act)))

  (let ((var (car act)))
    (cond 
     ((== (length act) 3)
      `(do (,var ,(cadr act)
                 (+ ,var 1)
                 (< ,var ,(caddr act)))
           ,@body))
     ((== (length act) 4)
      (let ((name (gensym))
            (start (cadr act))
            (step (caddr act))
            (cnd (car (cdddr act))))
        `(begin
           (define (,name ,var)
             (if ,cnd
                 (begin
                   ,@body
                   (,name ,step))))
           (,name ,start))))
      (else
       (throw (str "invalid do: " `(do ,act ...)))))))
