JSR global_dash_entry
SET PC, __exit

;; runtime

:_gt__gt_
SET A, POP
SET B, POP
SET J, B
SHR J, A
SET PC, POP
:_lt__lt_
SET A, POP
SET B, POP
SET J, B
SHL J, A
SET PC, POP
:_per_
SET A, POP
SET B, POP
SET J, B
MOD J, A
SET PC, POP
:_slash_
SET A, POP
SET B, POP
SET J, B
DIV J, A
SET PC, POP
:_star_
SET A, POP
SET B, POP
SET J, B
MUL J, A
SET PC, POP
:_dash_
SET A, POP
SET B, POP
SET J, B
SUB J, A
SET PC, POP
:_plus_
SET A, POP
SET B, POP
SET J, B
ADD J, A
SET PC, POP
:global_dash__lt_
SET B, POP
SET A, POP
IFG A, B
SET PC, global_dash__lt__dash_ret
IFE A, B
SET PC, global_dash__lt__dash_ret
SET J, 0x1
SET PC, POP
:global_dash__lt__dash_ret
SET J, 0x0
SET PC, POP
:global_dash__lt__eq_
SET B, POP
SET A, POP
IFG A, B
SET PC, global_dash__lt__eq__dash_ret
SET J, 0x1
SET PC, POP
:global_dash__lt__eq__dash_ret
SET J, 0x0
SET PC, POP
:global_dash__gt_
SET B, POP
SET A, POP
IFG A, B
SET PC, global_dash__gt__dash_ret
SET J, 0x0
SET PC, POP
:global_dash__gt__dash_ret
SET J, 0x1
SET PC, POP
:global_dash__gt__eq_
SET B, POP
SET A, POP
IFG A, B
SET PC, global_dash__gt__eq__dash_ret
IFE A, B
SET PC, global_dash__gt__eq__dash_ret
SET J, 0x0
SET PC, POP
:global_dash__gt__eq__dash_ret
SET J, 0x1
SET PC, POP
:global_dash__eq_
SET B, POP
SET A, POP
IFE A, B
SET PC, global_dash__eq__dash_ret
SET J, 0x0
SET PC, POP
:global_dash__eq__dash_ret
SET J, 0x1
SET PC, POP

;; program

:global_dash_entry
SET PUSH, return_dash_o9747018
SET PUSH, return_dash_o3948926
SET PUSH, 0x8
SET PC, global_dash_entry_dash_fib
:return_dash_o3948926
SET PUSH, J
SET PC, global_dash_entry_dash_print_dash_number
:return_dash_o9747018
SET PC, POP
:global_dash_entry_dash_print
SET Y, POP
SET A, POP
SET B, POP
SET X, POP
SET C, POP
MUL A, 0x20
ADD A, B
ADD A, 0x8000
SHL C, 0xc
SHL X, 0x8
BOR Y, C
BOR Y, X
SET [A], Y
SET PC, POP
:global_dash_entry_dash__per_print_dash_number
SET B, POP
SET A, POP
SET PUSH, B
SET PUSH, A
SET PUSH, return_dash_o8503800
SET PUSH, A
SET PUSH, 0xa
SET PC, global_dash__lt_
:return_dash_o8503800
SET A, POP
SET B, POP
IFE J, 0x0
SET PC, alt_dash_o9640955
SET PUSH, B
SET PUSH, A
SET PUSH, return_dash_o3024121
SET PUSH, A
SET PC, global_dash_entry_dash__per_print_dash_number_dash_p
:return_dash_o3024121
SET A, POP
SET B, POP
SET PC, exit_dash_o769410
:alt_dash_o9640955
SET PUSH, B
SET PUSH, A
SET PUSH, return_dash_o5788319
SET J, A
MOD J, 0xa
SET PUSH, J
SET PC, global_dash_entry_dash__per_print_dash_number_dash_p
:return_dash_o5788319
SET A, POP
SET B, POP
SET PUSH, B
SET PUSH, A
SET PUSH, return_dash_o4269
SET J, A
DIV J, 0xa
SET PUSH, J
SET J, B
ADD J, 0x1
SET PUSH, J
SET PC, global_dash_entry_dash__per_print_dash_number
:return_dash_o4269
SET A, POP
SET B, POP
:exit_dash_o769410
SET PC, POP
:global_dash_entry_dash__per_print_dash_number_dash_p
SET A, POP
SET PUSH, B
SET PUSH, A
SET PUSH, A
SET PUSH, return_dash_o2714019
SET PUSH, 0xf
SET PUSH, 0x0
SET J, 0x1f
SUB J, B
SET PUSH, J
SET PUSH, 0x0
SET J, 0x30
ADD J, A
SET PUSH, J
SET PC, global_dash_entry_dash_print
:return_dash_o2714019
SET A, POP
SET A, POP
SET B, POP
SET PC, POP
:global_dash_entry_dash_print_dash_number
SET A, POP
SET PUSH, A
SET PUSH, return_dash_o9111851
SET PUSH, A
SET PUSH, 0x0
SET PC, global_dash_entry_dash__per_print_dash_number
:return_dash_o9111851
SET A, POP
SET PC, POP
:global_dash_entry_dash_fib
SET A, POP
SET PUSH, A
SET PUSH, return_dash_o5466176
SET PUSH, A
SET PUSH, 0x1
SET PC, global_dash__lt__eq_
:return_dash_o5466176
SET A, POP
IFE J, 0x0
SET PC, alt_dash_o7793606
SET J, 0x1
SET PC, exit_dash_o7343973
:alt_dash_o7793606
SET PUSH, A
SET PUSH, return_dash_o7694941
SET PUSH, A
SET PUSH, return_dash_o4437377
SET J, A
SUB J, 0x1
SET PUSH, J
SET PC, global_dash_entry_dash_fib
:return_dash_o4437377
SET A, POP
SET PUSH, J
SET PUSH, A
SET PUSH, return_dash_o2559959
SET J, A
SUB J, 0x2
SET PUSH, J
SET PC, global_dash_entry_dash_fib
:return_dash_o2559959
SET A, POP
SET PUSH, J
SET PC, _plus_
:return_dash_o7694941
SET A, POP
:exit_dash_o7343973
SET PC, POP
:__exit
SET PC, __exit
