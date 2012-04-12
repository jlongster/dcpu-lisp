
;; util

(define (list-union lst1 lst2)
  (list-append lst1
               (fold (lambda (el acc)
                       (if (list-find lst1 el)
                           acc
                           (cons el acc)))
                     '()
                     lst2)))

(define (list-difference lst1 lst2)
  (fold (lambda (el acc)
          (if (list-find lst2 el)
              acc
              (cons el acc)))
        '()
        lst1))

(define (true? x) x)
(define (false? x) (not x))

;; syntactic analysis

(define self-evaluating? literal?)
(define variable? symbol?)

(define (quoted? expr)
  (eq? (car expr) 'quote))

(define (assignment? expr)
  (eq? (car expr) 'set!))

(define (definition? expr)
  (eq? (car expr) 'define))

(define (if? expr)
  (eq? (car expr) 'if))

(define (lambda? expr)
  (eq? (car expr) 'lambda))

(define (begin? expr)
  (eq? (car expr) 'begin))

(define application? list?)

;; inspecting syntax

(define (text-of-quotation expr)
  (cadr expr))

(define assignment-variable cadr)
(define assignment-value caddr)

(define (make-lambda args body)
  (cons 'lambda (cons args body)))

(define (definition-variable expr)
  (if (symbol? (cadr expr))
      (cadr expr)
      (caadr expr)))

(define (definition-value expr)
  (if (symbol? (cadr expr))
      (caddr expr)
      (make-lambda (cdadr expr)
              (cddr expr))))

(define if-predicate cadr)
(define if-consequent caddr)
(define (if-alternative exp)
  (if (not (null? (cdddr exp)))
      (car (cdddr exp))
      #f))

(define first-exp car)
(define rest-exps cdr)
(define (last-exp? exp) (null? (cdr exp)))

(define lambda-parameters cadr)
(define lambda-body cddr)

(define begin-actions cdr)

(define operator car)
(define operands cdr)

;; labels

(define label-counter 0)
(define (new-label-counter)
  (set! label-counter (+ label-counter 1))
  label-counter)

(define (make-label name)
  (string->symbol
   (str name (new-label-counter))))

;; breakpoints

(define always-should-break #f)
(define should-break #f)

(define (breakpoint exp)
  (if (or always-should-break
          should-break)
      (begin
        (set! should-break #f)
        `((assign exp (const ,exp))
          (break)))
      '((nop))))

;; instruction sequences

(define (make-instruction-sequence needs modifies statements)
  (list needs modifies statements))

(define (empty-instruction-sequence)
  (make-instruction-sequence '() '() '()))

(define (registers-needed s)
  (if (symbol? s) '() (car s)))

(define (registers-modified s)
  (if (symbol? s) '() (cadr s)))

(define (statements s)
  (if (symbol? s) (list s) (caddr s)))

(define (needs-register? seq reg)
  (list-find (registers-needed seq) reg))

(define (modifies-register? seq reg)
  (list-find (registers-modified seq) reg))

(define (append-instruction-sequences . seqs)
  (define (append-2-sequences seq1 seq2)
    (make-instruction-sequence
     (list-union (registers-needed seq1)
                 (list-difference (registers-needed seq2)
                                  (registers-modified seq1)))
     (list-union (registers-modified seq1)
                 (registers-modified seq2))
     (list-append (statements seq1) (statements seq2))))

  (define (append-seq-list seqs)
    (if (null? seqs)
        (empty-instruction-sequence)
        (append-2-sequences (car seqs)
                            (append-seq-list (cdr seqs)))))

  (append-seq-list seqs))

(define (preserving regs seq1 seq2)
  (if (null? regs)
      (append-instruction-sequences seq1 seq2)
      (let ((first-reg (car regs)))
        (if (and (needs-register? seq2 first-reg)
                 (modifies-register? seq1 first-reg))
            (preserving
             (cdr regs)
             (make-instruction-sequence
              (list-union (list first-reg)
                          (registers-needed seq1))
              (list-difference (registers-modified seq1)
                               (list first-reg))
              (list-append `((save ,first-reg))
                           (list-append (statements seq1)
                                        `((restore ,first-reg)))))
             seq2)
            (preserving (cdr regs) seq1 seq2)))))

(define (tack-on-instruction-sequence seq body-seq)
  (make-instruction-sequence
   (registers-needed seq)
   (registers-modified seq)
   (list-append (statements seq) (statements body-seq))))

(define (parallel-instruction-sequences seq1 seq2)
  (make-instruction-sequence
   (list-union (registers-needed seq1)
               (registers-needed seq2))
   (list-union (registers-modified seq1)
               (registers-modified seq2))
   (list-append (statements seq1) (statements seq2))))

;; frames/environments

(define (make-frame vars vals)
  (zip vars vals))

(define enclosing-environment cdr)
(define first-frame car)
(define (last-frame env)
  (car (reverse env)))
(define empty-environment '())

(define (extend-environment vars vals base-env)
  (if (== (length vars) (length vals))
      (cons (make-frame vars vals) base-env)
      (if (< (length vars) (length vals))
          (throw "too many arguments supplied")
          (throw "too few arguments supplied"))))

(define (find-frame-with-var varr env)
  (if (= env empty-environment)
      #f
      (let ((frame (first-frame env)))
        (if (list-find (keys frame) varr)
            frame
            (find-frame-with-var varr (enclosing-environment env))))))

(define (lookup-variable-value varr env)
  (let ((frame (find-frame-with-var varr env)))
    (if frame
        (dict-ref frame varr)
        (throw (str "unbound variable: " varr)))))

(define (set-variable-value! varr val env)
  (let ((frame (find-frame-with-var varr env)))
    (if frame
        (dict-put! frame varr val)
        (throw (str "unbound variable: " varr)))))

(define (define-variable! varr val env)
  (dict-put! (first-frame env) varr val))

(define (setup-environment)
  (extend-environment
   (primitive-procedure-names)
   (primitive-procedure-objects)
   empty-environment))

(define (install-primitives procs)
  (let ((bottom (last-frame global-environment)))
    (for-each (lambda (key)
                (dict-put!
                 bottom key
                 (make-primitive-procedure (dict-ref procs key))))
              (keys procs))))

;; procedures

(define primitive-procedures
  {:car car
   :cdr cdr
   :cons cons
   :list list
   :null? null?
   :pp pp
   :+ (lambda (x y) (+ x y))
   :- (lambda (x y) (- x y))
   :* (lambda (x y) (* x y))
   :> (lambda (x y) (> x y))
   :< (lambda (x y) (< x y))
   :== ==})

(define (primitive-procedure-names)
  (keys primitive-procedures))

(define (primitive-procedure-objects)
  (map make-primitive-procedure
       (vals primitive-procedures)))

(define (make-primitive-procedure proc)
  (list 'primitive proc))

(define (primitive-procedure? proc)
  (eq? (car proc) 'primitive))

(define primitive-implementation cadr)

(define (apply-primitive-procedure proc args)
  (apply (primitive-implementation proc) args))

(define (make-compiled-procedure entry env)
  (list 'compiled-procedure entry env))

(define (compiled-procedure? proc)
  (eq? (car proc) 'compiled-procedure))

(define compiled-procedure-entry cadr)
(define compiled-procedure-env caddr)

;; code generators

(define (compile-linkage linkage)
  (cond
   ((eq? linkage 'return)
    (make-instruction-sequence '(continue) ()
                               '((goto (reg continue)))))
   ((eq? linkage 'next)
    (empty-instruction-sequence))
   (else
    (make-instruction-sequence '() '()
                               `((goto (label ,linkage)))))))

(define (end-with-linkage linkage instruction-sequence)
  (preserving '(continue)
              instruction-sequence
              (compile-linkage linkage)))

(define (compile-self-evaluating exp target linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    '() (list target)
    `(,@(breakpoint exp)
      (SET ,target (const ,exp))))))

(define (compile-quoted exp target linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    '() (list target)
    `(,@(breakpoint exp)
      (SET ,target (const ,(text-of-quotation exp)))))))

(define (compile-variable exp target linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    '(env) (list target)
    `(,@(breakpoint exp)
      (SET ,target
           (op lookup-variable-value)
           (const ,exp)
           (reg env))))))

(define (compile-assignment exp target linkage)
  (let ((var (assignment-variable exp))
        (value-code
         (compile (assignment-value exp) 'val 'next)))
    (end-with-linkage
     linkage
     (preserving
      '(env)
      value-code
      (make-instruction-sequence
       '(env val) (list target)
       `(,@(breakpoint exp)
         (perform (op set-variable-value!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))))))))

(define (compile-definition exp target linkage)
  (let ((var (definition-variable exp))
        (value-code
         (compile (definition-value exp) 'val 'next)))
    (end-with-linkage
     linkage
     (preserving
      '(env)
      value-code
      (make-instruction-sequence
       '(env val) (list target)
       `(,@(breakpoint exp)
         (perform (op define-variable!)
                  (const ,var)
                  (reg val)
                  (reg env))
         (assign ,target (const ok))))))))

(define (compile-if exp target linkage)
  (let ((t-branch (make-label 'true-branch))
        (f-branch (make-label 'false-branch))
        (after-if (make-label 'after-if))
        (consequent-linkage
         (if (eq? linkage 'next) after-if linkage))
        (p-code (compile (if-predicate exp) 'val 'next))
        (c-code (compile (if-consequent exp) target consequent-linkage))
        (a-code (compile (if-alternative exp) target linkage)))
    (preserving
     '(env continue)
     p-code
     (append-instruction-sequences
      (make-instruction-sequence
       '(val) '()
       `(,@(breakpoint exp)
         (test (op false?) (reg val))
         (branch (label ,f-branch))))
      (parallel-instruction-sequences
       (append-instruction-sequences t-branch c-code)
       (append-instruction-sequences f-branch a-code))
      after-if))))

(define (compile-sequence seq target linkage)
  (if (last-exp? seq)
      (compile (first-exp seq) target linkage)
      (preserving
       '(env continue)
       (compile (first-exp seq) target 'next)
       (compile-sequence (rest-exps seq) target linkage))))

(define (compile-lambda exp target linkage)
  (let ((proc-entry (make-label 'entry))
        (after-lambda (make-label 'after-lambda))
        (lambda-linkage (if (eq? linkage 'next) after-lambda linkage)))
    (append-instruction-sequences
     (tack-on-instruction-sequence
      (end-with-linkage
       lambda-linkage
       (make-instruction-sequence
        '(env) (list target)
        `(,@(breakpoint exp)
          (assign ,target
                  (op make-compiled-procedure)
                  (label ,proc-entry)
                  (reg env)))))
      (compile-lambda-body exp proc-entry))
     after-lambda)))

(define (compile-lambda-body exp proc-entry)
  (let ((formals (lambda-parameters exp)))
    (append-instruction-sequences
     (make-instruction-sequence
      '(env proc arg1) '(env)
      `(,proc-entry
        (assign env (op compiled-procedure-env) (reg proc))
        (assign env
                (op extend-environment)
                (const ,formals)
                (reg arg1)
                (reg env))))
     (compile-sequence (lambda-body exp) 'val 'return))))

(define (compile-application exp target linkage)
  (let ((bp (breakpoint exp))
        (proc-code (compile (operator exp) 'proc 'next))
        (operand-codes
         (map (lambda (operand) (compile operand 'val 'next))
              (operands exp))))
    (preserving
     '(env continue)
     proc-code
     (preserving
      '(proc continue) (construct-arglist operand-codes)
      (append-instruction-sequences
       (make-instruction-sequence '() '() bp)
       (compile-procedure-call exp target linkage))))))

(define (construct-arglist operand-codes)
  (let ((operand-codes (reverse operand-codes)))
    (if (null? operand-codes)
        (make-instruction-sequence
         '() '(arg1)
         '((assign arg1 (const ()))))
        (let ((code-to-get-last-arg
               (append-instruction-sequences
                (car operand-codes)
                (make-instruction-sequence
                 '(val) '(arg1)
                 '((assign arg1 (op list) (reg val)))))))
          (if (null? (cdr operand-codes))
              code-to-get-last-arg
              (preserving '(env)
                          code-to-get-last-arg
                          (code-to-get-rest-args
                           (cdr operand-codes))))))))

(define (code-to-get-rest-args operand-codes)
  (let ((code-for-next-arg
         (preserving
          '(arg1)
          (car operand-codes)
          (make-instruction-sequence
           '(val arg1) '(arg1)
           '((assign arg1
                     (op cons) (reg val) (reg arg1)))))))
    (if (null? (cdr operand-codes))
        code-for-next-arg
        (preserving
         '(env)
         code-for-next-arg
         (code-to-get-rest-args (cdr operand-codes))))))

(define (compile-procedure-call exp target linkage)
  (let ((primitive-branch (make-label 'primitive-branch))
        (compiled-branch (make-label 'compiled-branch))
        (after-call (make-label 'after-call))
        (compiled-linkage
         (if (eq? linkage 'next) after-call linkage)))
    (append-instruction-sequences
     (make-instruction-sequence
      '(proc) '()
      `((test (op primitive-procedure?) (reg proc))
        (branch (label ,primitive-branch))))
     (parallel-instruction-sequences
      (append-instruction-sequences
       compiled-branch
       (compile-proc-app1 target compiled-linkage))
      (append-instruction-sequences
       primitive-branch
       (end-with-linkage
        linkage
        (make-instruction-sequence
         '(proc arg1) (list target)
         `((assign ,target
                   (op apply-primitive-procedure)
                   (reg proc)
                   (reg arg1)))))))
     after-call)))

(define (compile-proc-app1 target linkage)
  (cond
   ((and (eq? target 'val)
         (not (eq? linkage 'return)))
    (make-instruction-sequence
     '(proc) all-regs
     `((assign continue (label ,linkage))
       (assign val (op compiled-procedure-entry) (reg proc))
       (goto (reg val)))))
   ((and (not (eq? target 'val))
         (not (eq? linkage 'return)))
    (make-instruction-sequence
     '(proc) all-regs
     `((assign continue (label ,proc-return))
       (assign val (op compiled-procedure-entry) (reg proc))
       (goto (reg val))
       ,proc-return
       (assign ,target (reg val))
       (goto (label ,linkage)))))
   ((and (eq? target 'val)
         (eq? linkage 'return))
    (make-instruction-sequence
     '(proc continue) all-regs
     `((assign val (op compiled-procedure-entry) (reg proc))
       (goto (reg val)))))
   ((and (not (eq? target 'val))
         (eq? linkage 'return))
    (throw
     (str "compile-proc-app1: return linkage, target not val: "
          target)))))

;; flow control

(define (next? exp)
  (and (list? exp)
       (eq? (car exp) 'next)))

(define (compile-next linkage)
  (end-with-linkage
   linkage
   (make-instruction-sequence
    '() '()
    '((next)))))

;; main

(define all-regs '(env proc val arg1 continue exp))

(define (compile exp target linkage)
  (cond
   ((next? exp)
    (compile-next linkage))
   ((self-evaluating? exp)
    (compile-self-evaluating exp target linkage))
   ((quoted? exp)
    (compile-quoted exp target linkage))
   ((variable? exp)
    (compile-variable exp target linkage))
   ((assignment? exp)
    (compile-assignment exp target linkage))
   ((definition? exp)
    (compile-definition exp target linkage))
   ((if? exp) (compile-if exp target linkage))
   ((lambda? exp) (compile-lambda exp target linkage))
   ((begin? exp)
    (compile-sequence (begin-actions exp)
                      target
                      linkage))
   ((application? exp)
    (if (eq? (car exp) 'break)
        (begin
          (set! should-break #t)
          (empty-instruction-sequence))
        (compile-application exp target linkage)))
   (else
    (throw (str "compiler: unknown expression type" exp)))))

(pp (compile 'foo 'val 'next))

;; runtime ops

(define runtime-ops
  {:make-compiled-procedure make-compiled-procedure
   :compiled-procedure? compiled-procedure?
   :compiled-procedure-env compiled-procedure-env
   :compiled-procedure-entry compiled-procedure-entry
   :extend-environment extend-environment
   :lookup-variable-value lookup-variable-value
   :define-variable! define-variable!
   :list list
   :cons cons
   :primitive-procedure? primitive-procedure? 
   :apply-primitive-procedure apply-primitive-procedure
   :false? false?
   :true? true?})

(define global-environment (setup-environment))

(set! module.exports
      {:compile (lambda (src)
                  (statements (compile src 'val 'next)))
       :ops runtime-ops
       :first-frame first-frame
       :install-primitives install-primitives
       :stepping-mode (lambda ()
                        (set! always-should-break #t))
       :primitive-procedure? primitive-procedure?
       :compiled-procedure? compiled-procedure?
       :global-environment global-environment})
