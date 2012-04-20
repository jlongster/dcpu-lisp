
(define (fib a)
  (if (<= a 1)
      1
      (+ (fib (- a 1))
         (fib (- a 2)))))

;; result will be in register J
(fib 8)
