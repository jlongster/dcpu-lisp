
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
  ;; Hack because Outlet doesn't support raw hex values right now, so
  ;; pass in hex as a string and emit it straight out
  (%raw "v"))

(define (number->hex exp)
  (if (or (> exp (hex "0xffff"))
          (< exp 0))
      (throw (str "out of range:" exp)))
  (str "0x" (exp.toString 16)))

;; constants

(define SET 1)
(define ADD 2)
(define SUB 3)
(define MUL 4)
(define DIV 5)
(define MOD 6)
(define SHL 7)
(define SHR 8)
(define AND 9)
(define BOR (hex "0xa"))
(define XOR (hex "0xb"))
(define IFE (hex "0xc"))
(define IFN (hex "0xd"))
(define IFG (hex "0xe"))
(define IFB (hex "0xf"))

(define A 0)
(define B 1)
(define C 2)
(define X 3)
(define Y 4)
(define Z 5)
(define I 6)
(define J 7)
(define VAL-A 8)
(define VAL-B 9)
(define VAL-C (hex "0xa"))
(define VAL-X (hex "0xb"))
(define VAL-Y (hex "0xc"))
(define VAL-Z (hex "0xd"))
(define VAL-I (hex "0xe"))
(define VAL-J (hex "0xf"))
(define NEXT-VAL-A (hex "0x10"))
(define NEXT-VAL-B (hex "0x11"))
(define NEXT-VAL-C (hex "0x12"))
(define NEXT-VAL-X (hex "0x13"))
(define NEXT-VAL-Y (hex "0x14"))
(define NEXT-VAL-Z (hex "0x15"))
(define NEXT-VAL-I (hex "0x16"))
(define NEXT-VAL-J (hex "0x17"))
(define POP (hex "0x18"))
(define PEEK (hex "0x19"))
(define PUSH (hex "0x1a"))
(define SP (hex "0x1b"))
(define PC (hex "0x1c"))
(define O (hex "0x1d"))
(define NEXT-WORD (hex "0x1e"))
(define NEXT-WORD-VAL (hex "0x1f"))

;; initial heap

(define HEAP '())
(define (add-to-heap obj)
  (if (not (tagged-object? obj))
      (throw (str "[add-to-heap] object not tagged: " obj)))
  (set! HEAP (cons obj HEAP)))

;; objects

;; (define the-empty-list (hex "0x"))

;; (define (transcode obj)
;;   (cond
;;    ((null? obj) the-empty-list)))

(define (tag-object obj type)
  ['tagged type obj #f])

(define (tagged-object-type obj) obj.1)
(define (tagged-object-obj obj) obj.2)
(define (tagged-object-address obj) obj.3)
(define (set-tagged-object-address! obj addr) (set! obj.3 addr))
(define (tagged-object? obj) (== obj.0 'tagged))

;; compiler

;; (define (compile-literal exp)
;;   (let ((obj (tag-object exp (type exp))))
;;     (add-to-heap obj)
;;     `((SET ,A ,obj))))

(define (compile exp env . acc)
  (let ((acc (if (null? acc) '() (car acc))))
    (list-append
     acc
     (if (atom? exp)
         exp
         (case (car exp)
           ((quote) (cadr exp))
           (throw (str "unrecognized expression: " exp)))))))

;; 3 -> 3
;; "three" -> "three"
;; #f -> #f
;; '() -> '()
;; 'foo -> 'foo
;; (quote 'foo) -> 'foo
;; (foo x y z) -> 

(define-macro (assert v1 v2)
  `(let ((res1 ,v1)
         (res2 ,v2))
     (if (not (= res1 res2))
         (throw (str "assert failed: "
                     ',v1 " got " res1
                     " but expected " res2)))))

(assert (compile 3) 3)
(assert (compile "three") "three")
(assert (compile #f) #f)
(assert (compile '()) '())
(assert (compile 'foo) 'foo)

;; assembler

;; (define RAM (vector 65536))
;; (define RAMPTR 0)

;; (define (add-to-RAM word)
;;   (vector-put! RAM RAMPTR word)
;;   (set! RAMPTR (+ RAMPTR 1)))

;; (define (op code a b)
;;   ;; hack because Outlet doesn't have bitwise stuff yet
;;   (%raw "(code & 0xf) |
;;          ((a & 0x3f) << 4) |
;;          ((b & 0x3f) << 10)"))

;; (define (adv-op code a)
;;   (%raw "((code & 0x3f) << 4) |
;;          ((a & 0x3f) << 10)"))

;; (define (emit-SET inst)
;;   (let ((target (cadr inst))
;;         (obj (caddr inst)))
;;     (set-tagged-object-address! obj RAMPTR)
;;     (add-to-RAM (op SET target 0))))

;; (define (assemble exps)
;;   (for-each
;;    (lambda (inst)
;;      (case (car inst)
;;        ((SET) (emit-SET inst))))
;;    exps)

;;   (for-each
;;    (lambda (obj)
;;      (let ((addr (tagged-object-address obj)))
;;        (set-op-b! addr 3)))
;;    HEAP))

;; (assemble (compile 245))

;; (let loop ((i 0))
;;   (if (< i RAMPTR)
;;       (begin
;;         (pp (number->hex (vector-ref RAM i)))
;;         (loop (+ i 1)))))
