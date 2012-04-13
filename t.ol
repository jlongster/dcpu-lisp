(define (list-pop lst v)
  (reverse
   (fold (lambda (el acc)
           (if (== v el)
               acc
               (cons el acc)))
         '()
         lst)))

(pp (list-pop '(1 2 3 4) 'sdfd))
