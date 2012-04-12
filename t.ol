(define (walk exp f)
  (cond
   ((symbol? exp) (or (f exp) exp))
   ((list? exp) (map (lambda (e)
                       (let ((ne (f e)))
                         (if ne ne (walk e f))))
                     exp))
   (else exp)))

(pp (walk '(foo
            #t
            (bar
             (bar waht yes)
             (though you would)
             (thinkg that
                     (it might)))
            (not work so
                 (though it might))) (lambda (e)
                                       (if (== (car e) 'thoughkk)
                                           3
                                           #f))))
