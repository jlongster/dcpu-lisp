
(define (print color bg-color x y text)
  (MUL y 32)
  (ADD y x)
  (ADD y 0x8000)
  (SHL color 12)
  (SHL bg-color 8)
  (BOR text color)
  (BOR text bg-color)
  (SET [y] text))

(define (%print-number n i)
  (define (p n)
    (print 0xf 0 (- 31 i) 0 (+ 0x30 n)))
  
  (if (< n 10)
      (p n)
      (begin
        (p (% n 10))
        (%print-number (/ n 10) (+ i 1)))))

(define (print-number n)
  (%print-number n 0))

(define (fib a)
  (if (<= a 1)
      1
      (+ (fib (- a 1))
         (fib (- a 2)))))

(print-number (fib 8))
