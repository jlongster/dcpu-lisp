
;; this programs reads a string as input and prints it as output, like
;; a console. it infinitely loops doing this.
;;
;; See it here: http://0x10co.de/ygw0k

(define-prim (putc c))
(define-prim (getline))
(define-prim (alloc_init))
(define-prim (memmove src des len))
(define-prim (malloc owner len))
(define-prim (free obj))

;; init

(alloc_init)

;; utility

(define (ptr-length ptr)
  (SUB ptr 1)
  [ptr])

(define (print-line str)
  (do (c 0 (+ c 1) (< c (ptr-length str)))
    (define s (+ str c))
    (putc [s]))
  
  ;; newline
  (putc 10))

;; console pump

(define (main)
  (define foo (getline))
  (print-line foo)
  (free foo)

  ;; we really need a `while` primitive, or proper tail calls, until
  ;; then just force main to be called without recursion
  (SET PC main))

(main)
(exit)

;; hack: these need to be at the bottom so they aren't executed unless
;; called
(include "stdlib/mem/malloc.dasm")
(include "stdlib/mem/memmove.dasm")
(include "stdlib/text-io/text-io.dasm")
