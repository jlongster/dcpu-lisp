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
SET PUSH, return_dash_o212828
SET PUSH, 0x0
SET PC, global_dash_entry_dash_o854015
:return_dash_o212828
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
:global_dash_entry_dash_o854015
SET A, POP
SET PUSH, A
SET PUSH, return_dash_o1996862
SET PUSH, A
SET PUSH, 0x20
SET PC, global_dash__lt_
:return_dash_o1996862
SET A, POP
IFE J, 0x0
SET PC, alt_dash_o1640371
SET PUSH, A
SET PUSH, return_dash_o8043832
SET PUSH, 0x0
SET PC, global_dash_entry_dash_o854015_dash_o6300500
:return_dash_o8043832
SET A, POP
SET PUSH, A
SET PUSH, return_dash_o5747985
SET J, A
ADD J, 0x1
SET PUSH, J
SET PC, global_dash_entry_dash_o854015
:return_dash_o5747985
SET A, POP
SET PC, exit_dash_o4379101
:alt_dash_o1640371
:exit_dash_o4379101
SET PC, POP
:global_dash_entry_dash_o854015_dash_o6300500
SET B, POP
SET PUSH, A
SET PUSH, B
SET PUSH, return_dash_o5360794
SET PUSH, B
SET PUSH, 0xc
SET PC, global_dash__lt_
:return_dash_o5360794
SET B, POP
SET A, POP
IFE J, 0x0
SET PC, alt_dash_o2438805
SET PUSH, A
SET PUSH, B
SET PUSH, return_dash_o3014008
SET PUSH, 0xe
SET PUSH, 0x1
SET PUSH, A
SET PUSH, B
SET PUSH, 0x35
SET PC, global_dash_entry_dash_print
:return_dash_o3014008
SET B, POP
SET A, POP
SET PUSH, A
SET PUSH, B
SET PUSH, return_dash_o1585355
SET J, B
ADD J, 0x1
SET PUSH, J
SET PC, global_dash_entry_dash_o854015_dash_o6300500
:return_dash_o1585355
SET B, POP
SET A, POP
SET PC, exit_dash_o2520804
:alt_dash_o2438805
:exit_dash_o2520804
SET PC, POP
:__exit
SET PC, __exit
