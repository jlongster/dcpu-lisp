
(define function-body cadr)
(define (function-def? exp)
  (and (list? exp)
       (== (car exp) 'FUNCTION)))

(define (%hoist exp)
  (define (reconstruct func e*)
    `(FUNCTION ,e*))
  
  (cond
   ((or (literal? exp)
        (symbol? exp)
        (vector? exp)
        (dict? exp)) (list exp '()))
   ((function-def? exp)
    (let ((r (%hoist (function-body exp))))
      (list '() (cons (reconstruct exp (car r))
                      (cadr r)))))
   (else
    (fold (lambda (el acc)
            (let ((r (%hoist el)))
              (list (if (null? (car r))
                        (car acc)
                        (list-append (car acc) (list (car r))))
                    (list-append (cadr acc) (cadr r)))))
          (list '() '())
          exp))))

(define h (%hoist '(d define
                          (FUNCTION (1
                                     2
                                     (FUNCTION (19 23))))
                          (FUNCTION (4 5)))))
(pp (cons (car h) (cadr h)))
