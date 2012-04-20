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
SET PUSH, return_dash_o1957346
SET PUSH, 0x8
SET PC, global_dash_entry_dash_fib
:return_dash_o1957346
SET PC, POP
:global_dash_entry_dash_fib
SET A, POP
SET PUSH, A
SET PUSH, return_dash_o3554470
SET PUSH, A
SET PUSH, 0x1
SET PC, global_dash__lt__eq_
:return_dash_o3554470
SET A, POP
IFE J, 0x0
SET PC, alt_dash_o5960250
SET J, 0x1
SET PC, exit_dash_o9848488
:alt_dash_o5960250
SET PUSH, A
SET PUSH, return_dash_o7693500
SET PUSH, A
SET PUSH, return_dash_o6022101
SET J, A
SUB J, 0x1
SET PUSH, J
SET PC, global_dash_entry_dash_fib
:return_dash_o6022101
SET A, POP
SET PUSH, J
SET PUSH, A
SET PUSH, return_dash_o8008109
SET J, A
SUB J, 0x2
SET PUSH, J
SET PC, global_dash_entry_dash_fib
:return_dash_o8008109
SET A, POP
SET PUSH, J
SET PC, _plus_
:return_dash_o7693500
SET A, POP
:exit_dash_o9848488
SET PC, POP
:__exit
SET PC, __exit
