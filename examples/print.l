
(define (print color bg-color x y text)
  (MUL y 32)
  (ADD y x)
  (ADD y 0x8000)
  (SHL color 12)
  (SHL bg-color 8)
  (BOR text color)
  (BOR text bg-color)
  (SET [y] text))

(do (x 0 32)
    (do (y 0 12)
        (print 0xE 1 x y 0x35)))
