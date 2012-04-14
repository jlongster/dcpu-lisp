var __args = process.argv.slice(2);var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return "\uFDD1number";
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return "\uFDD1boolean";
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return "\uFDD1string";
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "\uFDD1null";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return "\uFDD1list";
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return "\uFDD1vector";
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return "\uFDD1dict";
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return _eq__eq_(typeof obj,"number");
});
var string_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && not(_eq__eq_(obj[0],"\uFDD1")));
});
var symbol_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD1"));
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj["length"],undefined)) && eq_p_(obj["length"],1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj["length"],undefined)) && not(eq_p_(obj["list"],undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj["length"],undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj["length"],undefined));
});
var function_p_ = (function(obj){
return eq_p_(typeof obj,"function");
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + (function() {if(string_p_(el)) {return el;
} else {return inspect(el);
}})()
);
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
return ("\uFDD1" + s);
});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
return s;
});
var o4 = sym["substring"](1);
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(){
var lsts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var l_star_ = (function() {if(null_p_(lsts)) {return _emptylst;
} else {return lsts;
}})()
;
return (function() {if(null_p_(l_star_)) {return _emptylst;
} else {return (function() {if(null_p_(cdr(l_star_))) {return car(l_star_);
} else {return _list_dash_append(car(l_star_),apply(list_dash_append,cdr(l_star_)));
}})()
;
}})()
;
});
var _list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o10 = (function(access){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(_eq__eq_(access(car(lst)),val)) {return lst;
} else {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}})()
;
}})()
;
});
var o12 = lst;
return trampoline(loop(o12));
}))();
});
var o11 = (function() {if(null_p_(rst)) {return (function(x){
return x;
});
} else {return car(rst);
}})()
;
return o10(o11);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return ((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}))();
} else {return false;
}})()
;
});
var o13 = lst;
return trampoline(loop(o13));
}))();
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o15 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return v;
}})()
;
});
var o17 = 0;
return trampoline(loop(o17));
}))();
});
var o16 = new Array(count);
return o15(o16);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return vector("__tco_call",(function() {return loop((i + 1));
}));
}})()
;
} else {return false;
}})()
;
});
var o18 = 0;
return trampoline(loop(o18));
}))();
});
var vector_dash_length = (function(vec){
return vec["length"];
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res["push"](el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {res["push"](func(vector_dash_ref(vec,i)));
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return false;
}})()
;
});
var o19 = 0;
return trampoline(loop(o19));
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {func(vector_dash_ref(vec,i));
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return false;
}})()
;
});
var o20 = 0;
return trampoline(loop(o20));
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return vector("__tco_call",(function() {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
}));
} else {return acc;
}})()
;
});
var o21 = 0;
var o22 = acc;
return trampoline(loop(o21,o22));
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o24 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return vector("__tco_call",(function() {return loop(cddr(lst));
}));
});
var o25 = car(lst);
var o26 = cadr(lst);
return o24(o25,o26);
}))();
} else {return false;
}})()
;
});
var o23 = args;
return trampoline(loop(o23));
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.substring(1)] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.substring(1)]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o28 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
});
var o29 = car(lst);
return o28(o29);
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return trampoline(loop(o27));
}))();
return res;
});
var dict_dash_merge = (function(dct1,dct2){
return ((function() {var o30 = (function(res){
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct1,k));
}),keys(dct1));
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct2,k));
}),keys(dct2));
return res;
});
var o31 = dict();
return o30(o31);
}))();
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}))();
} else {return false;
}})()
;
});
var o32 = keys(dct);
return trampoline(loop(o32));
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o33 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o34 = _emptylst;
return o33(o34);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return vector("__tco_call",(function() {return loop(cdr(ks),cdr(vs));
}));
}))();
} else {return false;
}})()
;
});
var o35 = keys;
var o36 = vals;
return trampoline(loop(o35,o36));
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return obj1 === obj2});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o37 = obj1;
var o38 = obj2;
return loop(o37,o38);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false;
} else {return ((function() {var loop = (function(i){
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return vector("__tco_call",(function() {return loop((i + 1));
}));
} else {return false;
}})()
;
} else {return true;
}})()
;
});
var o39 = 0;
return trampoline(loop(o39));
}))();
}})()
;
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o40 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
} else {return false;
}})()
;
}})()
;
});
var o43 = keys1;
return trampoline(loop(o43));
}))());
});
var o41 = keys(obj1);
var o42 = keys(obj2);
return o40(o41,o42);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var print = (function(msg){
return util["print"](msg);
});
var println = (function(msg){
return util["puts"](msg);
});
var pp = (function(obj){
return println(inspect(obj));
});
var _per_inspect_dash_non_dash_sequence = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {obj = obj["replace"](RegExp("\\\\","g"),"\\\\");
obj = obj["replace"](RegExp("\n","g"),"\\n");
obj = obj["replace"](RegExp("\r","g"),"\\r");
obj = obj["replace"](RegExp("\t","g"),"\\t");
obj = obj["replace"](RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\"");
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(function_p_(obj)) {return ((function() {return "<function>";
}))();
} else {return ((function() {throw("%inspect-non-sequence: unexpected type");
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var _per_recur_dash_protect = (function(obj,arg,func,halt){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o44 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt;
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents));
}));
}})()
;
});
var o45 = (function() {if(null_p_(rest)) {return _emptylst;
} else {return car(rest);
}})()
;
return o44(o45);
}))();
});
var _per_space = (function(obj){
return _per_recur_dash_protect(obj,false,(function(obj,arg,recur){
return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + recur(el,false));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return recur(dict_dash__gt_list(obj),false);
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return recur(vector_dash__gt_list(obj),false);
}))();
} else {return ((function() {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj));
}))();
}})()
;
}})()
;
}})()
;
}),vector_dash_length("<circular>"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o46 = (function(no_dash_newlines){
return _per_recur_dash_protect(obj,1,(function(obj,i,recur){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(s){
buffer = (buffer + s);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o48 = (function(sp,first){
disp("(");
for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(recur(el,(i + 1)));
first = false;
}),obj);
disp(")");
return get_dash_buffer();
});
var o49 = (_per_space(obj) > 30);
var o50 = true;
return o48(o49,o50);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o51 = (function(sp,first){
disp("[");
vector_dash_for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(recur(el,(i + 1)));
first = false;
}),obj);
disp("]");
return get_dash_buffer();
});
var o52 = (_per_space(obj) > 30);
var o53 = true;
return o51(o52,o53);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o54 = (function(sp,first){
disp("{");
for_dash_each((function(k){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(recur(k,i));
disp(" ");
disp(recur(dict_dash_ref(obj,k),(i + 3 + vector_dash_length(symbol_dash__gt_string(k)))));
first = false;
}),keys(obj));
disp("}");
return get_dash_buffer();
});
var o55 = (_per_space(obj) > 30);
var o56 = true;
return o54(o55,o56);
}))();
}))();
} else {return ((function() {return _per_inspect_dash_non_dash_sequence(obj);
}))();
}})()
;
}})()
;
}})()
;
}),"<circular>");
});
var o47 = (function() {if(null_p_(rest)) {return false;
} else {return car(rest);
}})()
;
return o46(o47);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var trampoline_dash_result_p_ = (function(value){
return (vector_p_(value) && _eq_(vector_dash_ref(value,0),"__tco_call"));
});
var trampoline = (function(value){
while(trampoline_dash_result_p_(value)) { value = value[1](); }return value;
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var __compiler = require('/Users/james/projects/outlet/backends/../compiler');
var __generator = require('/Users/james/projects/outlet/backends/../backends/js');
var read = __compiler.read;
true;
var list_dash_slice = (function(lst,start){
var end = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o12 = (function(end){
return ((function() {var loop = (function(lst,i,acc){
return (function() {if(null_p_(lst)) {return reverse(acc);
} else {return vector("__tco_call",(function() {return loop(cdr(lst),(i + 1),(function() {if(((i >= start) && (i < end))) {return cons(car(lst),acc);
} else {return acc;
}})()
);
}));
}})()
;
});
var o14 = lst;
var o15 = 0;
var o16 = _emptylst;
return trampoline(loop(o14,o15,o16));
}))();
});
var o13 = (function() {if(null_p_(end)) {return length(lst);
} else {return car(end);
}})()
;
return o12(o13);
}))();
});
var list_dash_pop = (function(lst,v){
return reverse(fold((function(el,acc){
return (function() {if(_eq__eq_(v,el)) {return acc;
} else {return cons(el,acc);
}})()
;
}),_emptylst,lst));
});
var atom_p_ = (function(exp){
return (symbol_p_(exp) || literal_p_(exp));
});
var scan = (function(exp,eq){
return (list_p_(exp) && fold((function(el,acc){
return (function() {if(eq(el)) {return cons(el,acc);
} else {return ((function() {var o17 = (function(res){
return (function() {if(res) {return list_dash_append(res,acc);
} else {return acc;
}})()
;
});
var o18 = scan(el,eq);
return o17(o18);
}))();
}})()
;
}),_emptylst,exp));
});
var walk = (function(exp,f){
return (function() {if(symbol_p_(exp)) {return ((function() {return (f(exp) || exp);
}))();
} else {return (function() {if(list_p_(exp)) {return ((function() {return map((function(e){
return ((function() {var o19 = (function(ne){
return (function() {if(ne) {return ne;
} else {return walk(e,f);
}})()
;
});
var o20 = f(e);
return o19(o20);
}))();
}),exp);
}))();
} else {return ((function() {return exp;
}))();
}})()
;
}})()
;
});
var extend_dash_environment = (function(env,vars){
return cons(make_dash_frame(vars),env);
});
var empty_dash_dict = (function(vals,def){
return zip(vals,map((function(v){
return def;
}),vals));
});
var make_dash_frame = (function(vars){
return vector(empty_dash_dict(vars,"\uFDD1not-allocated"),empty_dash_dict(_emptylst,"\uFDD1not-created"));
});
var frame_dash_vars = (function(frame){
return vector_dash_ref(frame,0);
});
var set_dash_frame_dash_vars_excl_ = (function(frame,vars){
return vector_dash_put_excl_(frame,0,vars);
});
var frame_dash_funcs = (function(frame){
return vector_dash_ref(frame,1);
});
var set_dash_frame_dash_funcs_excl_ = (function(frame,funcs){
return vector_dash_put_excl_(frame,1,funcs);
});
var top_dash_frame = car;
var add_dash_to_dash_frame = (function(frame,vars){
return ((function() {var o21 = (function(v_star_,vf_star_){
for_dash_each((function(_var_){
return (function() {if((dict_dash_ref(v_star_,_var_) || dict_dash_ref(vf_star_,_var_))) {throw(str("can't redefine variable: ",_var_));
} else {return false;
}})()
;
}),vars);
return set_dash_frame_dash_vars_excl_(frame,dict_dash_merge(v_star_,empty_dash_dict(vars,"\uFDD1not-allocated")));
});
var o22 = frame_dash_vars(frame);
var o23 = frame_dash_funcs(frame);
return o21(o22,o23);
}))();
});
var add_dash_func_dash_to_dash_frame = (function(frame,name){
return ((function() {var o24 = (function(v_star_,vf_star_){
(function() {if((dict_dash_ref(v_star_,name) || dict_dash_ref(vf_star_,name))) {throw(str("can't redefine variable: ",name));
} else {return false;
}})()
;
return dict_dash_put_excl_(vf_star_,name,"\uFDD1not-created");
});
var o25 = frame_dash_vars(frame);
var o26 = frame_dash_funcs(frame);
return o24(o25,o26);
}))();
});
var lookup_dash_variable = (function(env,_var_){
return _per_lookup_dash_variable(env,strip_dash_deref(_var_));
});
var _per_lookup_dash_variable = (function(env,_var_){
return (function() {if(list_p_(env)) {return ((function() {var o27 = (function(frame,v){
return (function() {if(v) {return _var_;
} else {return lookup_dash_variable(cdr(env),_var_);
}})()
;
});
var o28 = car(env);
var o29 = dict_dash_ref(frame_dash_vars(o28),_var_);
return o27(o28,o29);
}))();
} else {return false;
}})()
;
});
var lookup_dash_variable_dash_reg = (function(env,_var_){
return _per_lookup_dash_variable_dash_reg(env,strip_dash_deref(_var_));
});
var _per_lookup_dash_variable_dash_reg = (function(env,_var_){
return (function() {if(list_p_(env)) {return ((function() {var o30 = (function(frame,v){
return (function() {if(v) {return v;
} else {return lookup_dash_variable_dash_reg(cdr(env),_var_);
}})()
;
});
var o31 = car(env);
var o32 = dict_dash_ref(frame_dash_vars(o31),_var_);
return o30(o31,o32);
}))();
} else {return false;
}})()
;
});
var _per_allocate_dash_registers = (function(env,vars,free_dash_regs){
return (function() {if((list_p_(env) && not(null_p_(vars)))) {return ((function() {var o33 = (function(frame,v_star_){
return _per_allocate_dash_registers(cdr(env),fold((function(v,acc){
return (function() {if(_eq__eq_(dict_dash_ref(v_star_,v),"\uFDD1not-allocated")) {return ((function() {(function() {if(null_p_(free_dash_regs)) {throw("ran out of registers, too many variables");
} else {return false;
}})()
;
dict_dash_put_excl_(v_star_,v,car(free_dash_regs));
free_dash_regs = cdr(free_dash_regs);
return acc;
}))();
} else {return cons(v,acc);
}})()
;
}),_emptylst,vars),free_dash_regs);
});
var o34 = car(env);
var o35 = frame_dash_vars(o34);
return o33(o34,o35);
}))();
} else {return false;
}})()
;
});
var allocate_dash_registers = (function(env,vars){
return ((function() {var loop = (function(vars,unallocated,free_dash_regs){
return (function() {if(null_p_(vars)) {return _per_allocate_dash_registers(env,unallocated,free_dash_regs);
} else {return ((function() {var o39 = (function(reg){
(function() {if(not(reg)) {throw("can't allocate reg for non-existant variable: ",v,"\nwhat the heck man? why'd you give me that?");
} else {return false;
}})()
;
return (function() {if(_eq__eq_(reg,"\uFDD1not-allocated")) {return vector("__tco_call",(function() {return loop(cdr(vars),cons(car(vars),unallocated),free_dash_regs);
}));
} else {return vector("__tco_call",(function() {return loop(cdr(vars),unallocated,list_dash_pop(free_dash_regs,reg));
}));
}})()
;
});
var o40 = lookup_dash_variable_dash_reg(env,car(vars));
return o39(o40);
}))();
}})()
;
});
var o36 = vars;
var o37 = _emptylst;
var o38 = all_dash_regs;
return trampoline(loop(o36,o37,o38));
}))();
});
var lookup_dash_function = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o41 = (function(frame,def){
return (function() {if(def) {return name;
} else {return lookup_dash_function(cdr(env),name);
}})()
;
});
var o42 = car(env);
var o43 = dict_dash_ref(frame_dash_funcs(o42),name);
return o41(o42,o43);
}))();
} else {return false;
}})()
;
});
var lookup_dash_function_dash_def = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o44 = (function(frame,def){
return (function() {if(def) {return def;
} else {return lookup_dash_function_dash_def(cdr(env),name);
}})()
;
});
var o45 = car(env);
var o46 = dict_dash_ref(frame_dash_funcs(o45),name);
return o44(o45,o46);
}))();
} else {return false;
}})()
;
});
var save_dash_function_dash_def_excl_ = (function(env,name,def){
return ((function() {var o47 = (function(frame,vf_star_,vf_dash_def){
return (function() {if(vf_dash_def) {return ((function() {(function() {if(not(_eq__eq_(vf_dash_def,"\uFDD1not-created"))) {throw(str("can't set function environment, already set: ",name));
} else {return false;
}})()
;
return dict_dash_put_excl_(vf_star_,name,def);
}))();
} else {throw("can't set function environment of non-local functio");
}})()
;
});
var o48 = car(env);
var o49 = frame_dash_funcs(o48);
var o50 = dict_dash_ref(o49,name);
return o47(o48,o49,o50);
}))();
});
var strip_dash_deref = (function(_var_){
return ((function() {var o51 = (function(s){
return (function() {if(_eq__eq_(vector_dash_ref(s,0),"*")) {return string_dash__gt_symbol(s["slice"](1));
} else {return _var_;
}})()
;
});
var o52 = symbol_dash__gt_string(_var_);
return o51(o52);
}))();
});
var dereference_p_ = (function(_var_){
return _eq__eq_(vector_dash_ref(symbol_dash__gt_string(_var_),0),"*");
});
var all_dash_regs = list("\uFDD1A","\uFDD1B","\uFDD1C","\uFDD1X","\uFDD1Y","\uFDD1Z","\uFDD1I");
var r_dash_init_dash_template = list(make_dash_frame(_emptylst));
true;
true;
var r_dash_init_dash_make = (function() {return ((function() {var o66 = (function(frame_dash_template,frame){
set_dash_frame_dash_funcs_excl_(frame,dict_dash_map((function(x){
return x;
}),frame_dash_funcs(frame_dash_template)));
return list(frame);
});
var o67 = top_dash_frame(r_dash_init_dash_template);
var o68 = make_dash_frame(keys(frame_dash_vars(o67)));
return o66(o67,o68);
}))();
});
var r_dash_init = false;
var r_dash_init_dash_initialize_excl_ = (function() {r_dash_init = r_dash_init_dash_make();
});
var register_p_ = symbol_p_;
var label_p_ = symbol_p_;
var value_p_ = (function(e){
return (number_p_(e) || register_p_(e) || label_p_(e));
});
var call_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1CALL"));
});
var make_dash_function_dash_def = (function(name,args,env,body){
var native_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o69 = (function(native_p_){
return list("\uFDD1FUNCTION",name,args,env,body,native_p_);
});
var o70 = (function() {if(null_p_(native_p_)) {return false;
} else {return car(native_p_);
}})()
;
return o69(o70);
}))();
});
var function_dash_def_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1FUNCTION"));
});
var function_dash_name = cadr;
var function_dash_args = caddr;
var function_dash_env = (function(f){
return car(cdddr(f));
});
var function_dash_body = (function(f){
return cadr(cdddr(f));
});
var function_dash_native_p_ = (function(f){
return caddr(cdddr(f));
});
var make_dash_application = (function(env,name,args){
return list("\uFDD1CALL",env,name,args);
});
var application_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1CALL"));
});
var application_dash_env = cadr;
var application_dash_name = caddr;
var application_dash_args = (function(e){
return car(cdddr(e));
});
var make_dash_set = (function(name,env,v){
return list("\uFDD1SET",env,name,v);
});
var set_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1SET"));
});
var set_dash_name = caddr;
var set_dash_env = cadr;
var set_dash_value = (function(s){
return car(cdddr(s));
});
var variable_dash_ref_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1VARIABLE-REF"));
});
var make_dash_const = (function(v){
return list("\uFDD1CONST",v);
});
var const_p_ = (function(v){
return (list_p_(v) && _eq__eq_(car(v),"\uFDD1CONST"));
});
var const_dash_value = cadr;
var compile_dash_variable = (function(v,env){
return ((function() {var o71 = (function(_var_){
return (function() {if(_var_) {return list("\uFDD1VARIABLE-REF",v);
} else {return ((function() {var o73 = (function(f){
return (function() {if(f) {return list("\uFDD1FUNCTION-REF",f);
} else {throw(str("undefined variable: ",v));
}})()
;
});
var o74 = lookup_dash_function(env,v);
return o73(o74);
}))();
}})()
;
});
var o72 = lookup_dash_variable(env,v);
return o71(o72);
}))();
});
var compile_dash_quoted = (function(exp){
return list("\uFDD1CONST",exp);
});
var compile_dash_definition = (function(e,e_star_,env){
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o75 = (function(name){
add_dash_func_dash_to_dash_frame(top_dash_frame(env),name);
return ((function() {var o77 = (function(fenv){
return ((function() {var o79 = (function(def){
return save_dash_function_dash_def_excl_(env,name,def);
});
var o80 = make_dash_function_dash_def(name,cdr(e),fenv,compile_dash_sequence(e_star_,fenv));
return o79(o80);
}))();
});
var o78 = extend_dash_environment(env,cdr(e));
return o77(o78);
}))();
});
var o76 = car(e);
return o75(o76);
}))();
}))();
} else {return (function() {if(symbol_p_(e)) {return ((function() {add_dash_to_dash_frame(top_dash_frame(env),list(e));
return compile_dash_assignment(e,car(e_star_),env);
}))();
} else {return ((function() {throw(str("invalid define: ",e));
}))();
}})()
;
}})()
;
});
var compile_dash_assignment = (function(_var_,exp,env){
return ((function() {var o81 = (function(res,v){
(function() {if(not(v)) {throw(str("undefined variable: ",_var_));
} else {return false;
}})()
;
return make_dash_set(v,env,res);
});
var o82 = compile_star_(exp,env);
var o83 = lookup_dash_variable(env,_var_);
return o81(o82,o83);
}))();
});
var compile_dash_sequence = (function(e_star_,env){
return (function() {if(list_p_(e_star_)) {return (function() {if(list_p_(cdr(e_star_))) {return cons(compile_star_(car(e_star_),env),compile_dash_sequence(cdr(e_star_),env));
} else {return ((function() {var o84 = (function(e){
return (function() {if(function_dash_def_p_(e)) {return list(e);
} else {return list(list("\uFDD1RETURN",e));
}})()
;
});
var o85 = compile_star_(car(e_star_),env);
return o84(o85);
}))();
}})()
;
} else {return _emptylst;
}})()
;
});
var compile_dash_application = (function(v,a_star_,env){
return ((function() {var o86 = (function(frame,vars){
(function() {if(not((register_p_(v) || label_p_(v)))) {throw(str("cannot apply to non-function type: ",v));
} else {return false;
}})()
;
return ((function() {var o89 = (function(f,args){
(function() {if(not(f)) {throw(str("undefined variable: ",v));
} else {return false;
}})()
;
return make_dash_application(env,f,args);
});
var o90 = (lookup_dash_variable(env,v) || lookup_dash_function(env,v));
var o91 = map((function(a){
return (function() {if(symbol_p_(a)) {return ((function() {return compile_dash_variable(a,env);
}))();
} else {return (function() {if(atom_p_(a)) {return ((function() {return compile_dash_quoted(a);
}))();
} else {return (function() {if(list_p_(a)) {return ((function() {return compile_dash_application(car(a),cdr(a),env);
}))();
} else {return ((function() {throw(str("bad function value: ",a));
}))();
}})()
;
}})()
;
}})()
;
}),a_star_);
return o89(o90,o91);
}))();
});
var o87 = top_dash_frame(env);
var o88 = frame_dash_vars(o87);
return o86(o87,o88);
}))();
});
var compile_star_ = (function(exp,cenv){
return (function() {if(atom_p_(exp)) {return (function() {if(symbol_p_(exp)) {return compile_dash_variable(exp,cenv);
} else {return compile_dash_quoted(exp);
}})()
;
} else {return (function() {if(list_dash_find(list("\uFDD1define"),car(exp))) {return ((function() {return compile_dash_definition(cadr(exp),cddr(exp),cenv);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1set!"),car(exp))) {return ((function() {return compile_dash_assignment(cadr(exp),caddr(exp),cenv);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1if"),car(exp))) {return ((function() {return compile_dash_conditional(exp,cenv);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1begin"),car(exp))) {return ((function() {return compile_dash_sequence(cdr(exp),cenv);
}))();
} else {return ((function() {return compile_dash_application(car(exp),cdr(exp),cenv);
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var hoist = (function(f){
var reconstruct = (function(func,e_star_){
return make_dash_function_dash_def(function_dash_name(func),function_dash_args(func),function_dash_env(func),reverse(e_star_));
});
var sliced = fold((function(el,acc){
return (function() {if(function_dash_def_p_(el)) {return ((function() {var o92 = (function(hoisted){
return list(car(acc),list_dash_append(hoisted,cadr(acc)));
});
var o93 = hoist(el);
return o92(o93);
}))();
} else {return list(cons(el,car(acc)),cadr(acc));
}})()
;
}),list(_emptylst,_emptylst),function_dash_body(f));
return list_dash_append(cadr(sliced),list(reconstruct(f,car(sliced))));
});
var allocate = (function(funcs){
map((function(f){
return ((function() {var o94 = (function(refs){
return allocate_dash_registers(function_dash_env(f),refs);
});
var o95 = map((function(v){
return (function() {if(variable_dash_ref_p_(v)) {return cadr(v);
} else {return set_dash_name(v);
}})()
;
}),scan(function_dash_body(f),(function(e){
return (_eq__eq_(car(e),"\uFDD1VARIABLE-REF") || _eq__eq_(car(e),"\uFDD1SET"));
})));
return o94(o95);
}))();
}),funcs);
return funcs;
});
var linearize_dash_return = (function(exp){
return linearize(cadr(exp),"\uFDD1J");
});
var replace_dash_variable_dash_refs = (function(exp,env){
return walk(exp,(function(e){
return (function() {if(_eq__eq_(car(e),"\uFDD1VARIABLE-REF")) {return ((function() {var o96 = (function(v,r){
(function() {if(not(r)) {throw("error, register not assigned");
} else {return false;
}})()
;
return (function() {if(dereference_p_(v)) {return string_dash__gt_symbol(str("[",r,"]"));
} else {return r;
}})()
;
});
var o97 = cadr(e);
var o98 = lookup_dash_variable_dash_reg(env,o97);
return o96(o97,o98);
}))();
} else {return false;
}})()
;
}));
});
var linearize_dash_function = (function(exp){
return ((function() {var o99 = (function(env){
return list_dash_append(list(function_dash_name(exp)),((function() {var o102 = (function(o101){
return (function() {if(vector_p_(o101)) {return vector_dash__gt_list(o101);
} else {return o101;
}})()
;
});
var o103 = linearize(function_dash_body(replace_dash_variable_dash_refs(exp,env)));
return o102(o103);
}))(),list(list("\uFDD1SET","\uFDD1PC","\uFDD1POP")));
});
var o100 = function_dash_env(exp);
return o99(o100);
}))();
});
var linearize_dash_assignment = (function(exp){
return ((function() {var o104 = (function(_var_,reg,v){
return linearize(v,reg);
});
var o105 = set_dash_name(exp);
var o106 = lookup_dash_variable_dash_reg(set_dash_env(exp),o105);
var o107 = set_dash_value(exp);
return o104(o105,o106,o107);
}))();
});
var linearize_dash_constant = (function(exp,target){
return (function() {if(target) {return list(list("\uFDD1SET",target,const_dash_value(exp)));
} else {return _emptylst;
}})()
;
});
var linearize_dash_arg = (function(exp,reg,used_dash_regs){
return (function() {if(application_p_(exp)) {return list_dash_append(map((function(r){
return list("\uFDD1SET","\uFDD1PUSH",r);
}),used_dash_regs),linearize(exp,reg),map((function(r){
return list("\uFDD1SET",r,"\uFDD1POP");
}),reverse(used_dash_regs)));
} else {return linearize(exp,reg);
}})()
;
});
var linearize_dash_arguments = (function(arg_dash_values,arg_dash_regs){
return ((function() {var loop = (function(a_star_,used_dash_regs,acc){
return (function() {if(null_p_(a_star_)) {return acc;
} else {return ((function() {var o111 = (function(_var_,reg,exp){
(function() {if(not(reg)) {throw(str("while linearizing application, ","undefined variable: ",_var_));
} else {return false;
}})()
;
return vector("__tco_call",(function() {return loop(cdr(a_star_),cons(reg,used_dash_regs),(function() {if(_eq__eq_(reg,"\uFDD1not-allocated")) {return acc;
} else {return list_dash_append(acc,linearize_dash_arg(exp,reg,used_dash_regs));
}})()
);
}));
});
var o112 = car(a_star_);
var o113 = dict_dash_ref(arg_dash_regs,o112);
var o114 = dict_dash_ref(arg_dash_values,o112);
return o111(o112,o113,o114);
}))();
}})()
;
});
var o108 = keys(arg_dash_values);
var o109 = _emptylst;
var o110 = _emptylst;
return trampoline(loop(o108,o109,o110));
}))();
});
var optimized_dash_native_dash_application_p_ = (function(exp){
return ((function() {var o115 = (function(env,def){
return (function_dash_native_p_(def) && fold((function(arg,acc){
return (acc && (const_p_(arg) || symbol_p_(arg)));
}),true,application_dash_args(exp)));
});
var o116 = application_dash_env(exp);
var o117 = lookup_dash_function_dash_def(o116,application_dash_name(exp));
return o115(o116,o117);
}))();
});
var linearize_dash_native_dash_application = (function(exp){
return ((function() {var o118 = (function(env,def,fenv,arg_dash_regs,args){
(function() {if(not(symbol_p_(car(args)))) {throw(str("error: native function requires register ","as first argument: ",application_dash_name(exp)));
} else {return false;
}})()
;
return list(list_dash_append(list(application_dash_name(exp)),((function() {var o125 = (function(o124){
return (function() {if(vector_p_(o124)) {return vector_dash__gt_list(o124);
} else {return o124;
}})()
;
});
var o126 = map((function(a){
return (function() {if(const_p_(a)) {return ((function() {return const_dash_value(a);
}))();
} else {return (function() {if(symbol_p_(a)) {return ((function() {return a;
}))();
} else {return ((function() {throw(str("error: can't apply to native function: ",a));
}))();
}})()
;
}})()
;
}),application_dash_args(exp));
return o125(o126);
}))()));
});
var o119 = application_dash_env(exp);
var o120 = lookup_dash_function_dash_def(o119,application_dash_name(exp));
var o121 = function_dash_env(o120);
var o122 = frame_dash_vars(top_dash_frame(o121));
var o123 = application_dash_args(exp);
return o118(o119,o120,o121,o122,o123);
}))();
});
var linearize_dash_application = (function(exp,target){
return ((function() {var o127 = (function(env,def,fenv,regs,arg_dash_regs,args){
(function() {if(not(_eq__eq_(length(keys(args)),length(keys(arg_dash_regs))))) {return ((function() {var o134 = (function(argv){
throw(str("wrong number of arguments: (",application_dash_name(exp)," ",argv["join"](" "),")"));
});
var o135 = list_dash__gt_vector(map(str,args));
return o134(o135);
}))();
} else {return false;
}})()
;
return list_dash_append(fold((function(r,acc){
return (function() {if(not(_eq__eq_(r,target))) {return cons(list("\uFDD1SET","\uFDD1PUSH",r),acc);
} else {return acc;
}})()
;
}),_emptylst,regs),linearize_dash_arguments(args,arg_dash_regs),(function() {if(function_dash_native_p_(def)) {return list(list_dash_append(list(application_dash_name(exp)),((function() {var o137 = (function(o136){
return (function() {if(vector_p_(o136)) {return vector_dash__gt_list(o136);
} else {return o136;
}})()
;
});
var o138 = map((function(a){
return dict_dash_ref(arg_dash_regs,a);
}),function_dash_args(def));
return o137(o138);
}))()));
} else {return cons(list("\uFDD1JSR",application_dash_name(exp)),(function() {if((target && not(_eq__eq_(target,"\uFDD1J")))) {return list(list("\uFDD1SET",target,"\uFDD1J"));
} else {return _emptylst;
}})()
);
}})()
,fold((function(r,acc){
return (function() {if(not(_eq__eq_(r,target))) {return cons(list("\uFDD1SET",r,"\uFDD1POP"),acc);
} else {return acc;
}})()
;
}),_emptylst,reverse(regs)));
});
var o128 = application_dash_env(exp);
var o129 = lookup_dash_function_dash_def(o128,application_dash_name(exp));
var o130 = function_dash_env(o129);
var o131 = fold((function(el,acc){
return (function() {if(not(_eq__eq_(el,"\uFDD1not-allocated"))) {return cons(el,acc);
} else {return acc;
}})()
;
}),_emptylst,vals(frame_dash_vars(top_dash_frame(o128))));
var o132 = frame_dash_vars(top_dash_frame(o130));
var o133 = zip(function_dash_args(o129),application_dash_args(exp));
return o127(o128,o129,o130,o131,o132,o133);
}))();
});
var linearize = (function(exp){
var target = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o139 = (function(target){
return (function() {if(list_p_(exp)) {return (function() {if(list_dash_find(list("\uFDD1FUNCTION"),car(exp))) {return ((function() {return linearize_dash_function(exp);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1RETURN"),car(exp))) {return ((function() {return linearize_dash_return(exp);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1CALL"),car(exp))) {return ((function() {return (function() {if(optimized_dash_native_dash_application_p_(exp)) {return linearize_dash_native_dash_application(exp);
} else {return linearize_dash_application(exp,target);
}})()
;
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1SET"),car(exp))) {return ((function() {return linearize_dash_assignment(exp);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1CONST"),car(exp))) {return ((function() {return linearize_dash_constant(exp,target);
}))();
} else {return ((function() {return ((function() {var loop = (function(lst,acc){
return (function() {if(null_p_(lst)) {return acc;
} else {return (function() {if(null_p_(cdr(lst))) {return list_dash_append(acc,linearize(car(lst),target));
} else {return vector("__tco_call",(function() {return loop(cdr(lst),list_dash_append(acc,linearize(car(lst))));
}));
}})()
;
}})()
;
});
var o141 = exp;
var o142 = _emptylst;
return trampoline(loop(o141,o142));
}))();
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
} else {return (function() {if(target) {return linearize_dash_constant(list("\uFDD1CONST",exp),target);
} else {return list(exp);
}})()
;
}})()
;
});
var o140 = (function() {if(null_p_(target)) {return false;
} else {return car(target);
}})()
;
return o139(o140);
}))();
});
var compile = (function(exp){
r_dash_init_dash_initialize_excl_();
return ((function() {var o143 = (function(exp){
return (function() {if(atom_p_(exp)) {return ((function() {return linearize(exp);
}))();
} else {return (function() {if(function_dash_def_p_(exp)) {return ((function() {return allocate(hoist(exp));
}))();
} else {return ((function() {return reverse(fold((function(el,acc){
return (function() {if(function_dash_def_p_(el)) {return list_dash_append(allocate(hoist(el)),acc);
} else {return cons(el,acc);
}})()
;
}),_emptylst,exp));
}))();
}})()
;
}})()
;
});
var o144 = compile_star_(exp,r_dash_init);
return o143(o144);
}))();
});
var output = (function(){
var e_star_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var str_star_ = (function(){
var vals = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return apply(str,map((function(v){
return (function() {if(number_p_(v)) {return ((function() {return str("0x",v["toString"](16));
}))();
} else {return (function() {if(vector_p_(v)) {return ((function() {return str("[",apply(str_star_,vector_dash__gt_list(v)),"]");
}))();
} else {return (function() {if(symbol_p_(v)) {return ((function() {return ((function() {var o145 = (function(s){
return (function() {if(_eq__eq_(vector_dash_ref(s,0),"*")) {return str("[",s["slice"](1),"]");
} else {return s;
}})()
;
});
var o146 = symbol_dash__gt_string(v);
return o145(o146);
}))();
}))();
} else {return ((function() {return v;
}))();
}})()
;
}})()
;
}})()
;
}),vals));
});
return for_dash_each((function(e){
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o147 = (function(ln){
return (function() {if(_eq__eq_(ln,2)) {return ((function() {return println(str_star_(car(e)," ",cadr(e)));
}))();
} else {return (function() {if(_eq__eq_(ln,3)) {return ((function() {return println(str_star_(car(e)," ",cadr(e),", ",caddr(e)));
}))();
} else {return ((function() {throw(str("invalid expression: ",e));
}))();
}})()
;
}})()
;
});
var o148 = length(e);
return o147(o148);
}))();
}))();
} else {return (function() {if(symbol_p_(e)) {return ((function() {return println(str(":",e));
}))();
} else {return ((function() {throw(str("invalid expression: ",e));
}))();
}})()
;
}})()
;
}),apply(list_dash_append,e_star_));
});
var strip_dash_envs = (function(exp){
return (function() {if(list_p_(exp)) {return (function() {if(list_dash_find(list("\uFDD1FUNCTION"),car(exp))) {return ((function() {return list("\uFDD1FUNCTION",function_dash_name(exp),function_dash_args(exp),strip_dash_envs(function_dash_body(exp)));
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1CALL"),car(exp))) {return ((function() {return list("\uFDD1CALL",application_dash_name(exp),application_dash_args(exp));
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1SET"),car(exp))) {return ((function() {return list("\uFDD1SET",set_dash_name(exp),strip_dash_envs(set_dash_value(exp)));
}))();
} else {return ((function() {return map(strip_dash_envs,exp);
}))();
}})()
;
}})()
;
}})()
;
} else {return exp;
}})()
;
});
var pp_dash_w_slash_o_dash_envs = (function(exp){
return pp(strip_dash_envs(exp));
});
((function() {var o149 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1+");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1+",make_dash_function_dash_def("\uFDD1+",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o150 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o149(o150);
}))();
((function() {var o151 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1-");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1-",make_dash_function_dash_def("\uFDD1-",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o152 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o151(o152);
}))();
((function() {var o153 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1/");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1/",make_dash_function_dash_def("\uFDD1/",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o154 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o153(o154);
}))();
((function() {var o155 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1*");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1*",make_dash_function_dash_def("\uFDD1*",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o156 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o155(o156);
}))();
((function() {var o157 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1print");
allocate_dash_registers(env,list("\uFDD1pos","\uFDD1text"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1print",make_dash_function_dash_def("\uFDD1print",list("\uFDD1pos","\uFDD1text"),env,_emptylst,false));
});
var o158 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1pos","\uFDD1text"));
return o157(o158);
}))();
((function() {var o159 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1deref");
allocate_dash_registers(env,list("\uFDD1x"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1deref",make_dash_function_dash_def("\uFDD1deref",list("\uFDD1x"),env,_emptylst,false));
});
var o160 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x"));
return o159(o160);
}))();
((function() {var o161 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1ADD");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1ADD",make_dash_function_dash_def("\uFDD1ADD",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o162 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o161(o162);
}))();
((function() {var o163 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1SET");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1SET",make_dash_function_dash_def("\uFDD1SET",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o164 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o163(o164);
}))();
((function() {var o165 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1BOR");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1BOR",make_dash_function_dash_def("\uFDD1BOR",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o166 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o165(o166);
}))();
var std_dash_lib = _emptylst;
output(list(list("\uFDD1JSR","\uFDD1__main")),std_dash_lib,linearize(compile(list("\uFDD1begin",list("\uFDD1define",list("\uFDD1__main"),list("\uFDD1define","\uFDD1color",0),list("\uFDD1define","\uFDD1bg-color",3840),list("\uFDD1define",list("\uFDD1print","\uFDD1pos","\uFDD1text"),list("\uFDD1ADD","\uFDD1pos",32768),list("\uFDD1BOR","\uFDD1text","\uFDD1color"),list("\uFDD1BOR","\uFDD1text","\uFDD1bg-color"),list("\uFDD1SET","\uFDD1*pos","\uFDD1text")),list("\uFDD1print",0,53),list("\uFDD1print",1,32),list("\uFDD1print",2,54),list("\uFDD1print",3,32),list("\uFDD1print",4,55))))));

