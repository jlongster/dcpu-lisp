
;; util

(define-macro (case c . variants)
  `(cond
    ,@(map (lambda (exp)
             (if (== (car exp) 'else)
                 exp
                 `((list-find ',(car exp) ,c)
                   ,@(cdr exp))))
           variants)))

(define (atom? exp)
  (or (number? exp)
      (string? exp)
      (boolean? exp)
      (null? exp)
      (symbol? exp)))

(define (hex v)
  ;; Hack because Outlet doesn't support raw hex values right now
  (parseInt v 16))

(define (number->hex exp)
  (if (or (> exp (hex "ffff"))
          (< exp 0))
      (throw (str "out of range:" exp)))
  (str "0x" (exp.toString 16)))

;; objects

(define HEAP (vector 65536))
(define HEAPPTR 0)

;; (define (allocate )
;;   )

(define (collapse-bytes bytes)
  (let ((vec (vector (Math.round (/ bytes.length 2)))))
    (let loop ((i 0))
      (let ((idx (Math.floor (/ i 2))))
        (if (not (< i bytes.length))
            vec
            (begin
              (if (== (% i 2) 0)
                  (vector-put! vec idx
                               (<< (vector-ref bytes i) 8))
                  (vector-put! vec idx
                               (bitwise-or (vector-ref bytes i)
                                           (vector-ref vec idx))))
              (loop (+ i 1))))))))

(define (transcode obj)
  (cond
   ((number? obj)
    (if (or (< obj 0)
            (> obj (hex "3fff")))
        (throw (str "number out of range: " obj)))
    ;; type tag: 0
    [(%raw "obj & 0x3fff")])
   ((string? obj)
    ;; type tag: 1
    ;; strings are null-terminated with 0
    (collapse-bytes
     (vector-concat
      [(hex "0x40")]
      (vector-concat
       (vector-map (lambda (c) (c.charCodeAt))
                   obj)
       [0]))))))

;; variables

(define (compute-kind r n)
  (or (local-variable? r 0 n)
      (global-variable? g-current n)
      (global-variable? g-init n)))

(define (local-variable? r i n)
  (if (null? r)
      #f
      (let ((res (list-find (car r) n)))
        (if res
            `(local ,i ,(- (length (car r))
                           (length res)))
            (local-variable? (cdr r) (+ i 1) n)))))

(define (global-variable? g n)
  (let ((x (list-find g n)))
    (and x (cadr (car x)))))

;; environments

(define (r-extend* r n*)
  (cons n* r))

(define r-init '())

(define g-current '())
(define (g-current-extend! n)
  (let ((level (length g-current)))
    (set! g-current
          (cons (cons n `(global . ,level))
                g-current))
    level))

(define g-init '())
(define (g-init-extend! n)
  (let ((level (length g-init)))
    (set! g-init
          (cons (cons n `(predefined ,level))
                g-init))
    level))

;; compiler

(define (meaning-quotation v r tail?)
  `(CONSTANT ,v))

(define (meaning-reference n r tail?)
  (let ((kind (compute-kind r n)))
    (if kind
        (case (car kind)
          ((local)
           (let ((i (cadr kind))
                 (j (caddr kind)))
             (if (== i 0)
                 `(SHALLOW-ARGUMENT-REF ,j)
                 `(DEEP-ARGUMENT-REF ,i ,j))))
          ((global)
           (let ((i (cadr kind)))
             `(CHECKED-GLOBAL-REF ,i)))
          ((predefined)
           (let ((i (cadr kind)))
             `(PREDEFINED ,i))))
        (throw (str "undefined variable: " n)))))

(define (meaning e r tail?)
  (if (atom? e)
      (if (symbol? e)
          (meaning-reference e r tail?)
          (meaning-quotation e r tail?))
      (case (car e)
        ((quote) (meaning-quotation (cadr e) r tail?))
        (else (throw (str "invalid expression: " e))))))

;; tests

(define-macro (assert v1 v2)
  `(let ((res1 ,v1)
         (res2 ,v2))
     (if (not (= res1 res2))
         (throw (str "assert failed: "
                     ',v1 " got " res1
                     " but expected " res2)))))

(assert (collapse-bytes [(hex "3") (hex "f4")]) [1012])
(assert (collapse-bytes [(hex "3") (hex "f4")
                         (hex "4") (hex "3d")]) [1012 1085])
(assert (transcode 3) [(hex "3")])
(assert (transcode 16) [(hex "10")])
;;(assert (transcode "hellop") #f)

(pp (meaning '(quote foo) r-init #t))


;; numbers -> 0x30
;; define
;; set!
;; if
;; begin
;; application
