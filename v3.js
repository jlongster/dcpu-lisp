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
var expand = (function(exp){
return (function() {if((atom_p_(exp) || vector_p_(exp) || dict_p_(exp))) {return ((function() {return exp;
}))();
} else {return (function() {if(macro_p_(car(exp))) {return ((function() {return expand(macro_dash_function(car(exp))(exp));
}))();
} else {return (function() {if(eq_p_(car(exp),"\uFDD1quote")) {return ((function() {return exp;
}))();
} else {return (function() {if(eq_p_(car(exp),"\uFDD1lambda")) {return ((function() {return list_dash_append(list("\uFDD1lambda",cadr(exp)),((function() {var o22 = (function(o21){
return (function() {if(vector_p_(o21)) {return vector_dash__gt_list(o21);
} else {return o21;
}})()
;
});
var o23 = map(expand,cddr(exp));
return o22(o23);
}))());
}))();
} else {return (function() {if(eq_p_(car(exp),"\uFDD1define")) {return ((function() {return list_dash_append(list("\uFDD1define",cadr(exp)),((function() {var o25 = (function(o24){
return (function() {if(vector_p_(o24)) {return vector_dash__gt_list(o24);
} else {return o24;
}})()
;
});
var o26 = map(expand,cddr(exp));
return o25(o26);
}))());
}))();
} else {return ((function() {return map(expand,exp);
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
var _per_macros = dict();
var macro_dash_function = (function(name){
return dict_dash_ref(_per_macros,name);
});
var install_dash_macro = (function(name,f){
return dict_dash_put_excl_(_per_macros,name,f);
});
var macro_p_ = (function(name){
return (dict_dash_ref(_per_macros,name) && true);
});
install_dash_macro("\uFDD1define-macro",(function(form,e){
return ((function() {var o27 = (function(sig){
return ((function() {var o29 = (function(name,pattern,body){
install_dash_macro(name,make_dash_macro(pattern,body));
return true;
});
var o30 = car(sig);
var o31 = cdr(sig);
var o32 = cddr(form);
return o29(o30,o31,o32);
}))();
});
var o28 = cadr(form);
return o27(o28);
}))();
}));
var make_dash_macro = (function(pattern,body){
return ((function() {var o33 = (function(x,e){
return eval(__compiler["compile"](list("\uFDD1lambda",list(x),list_dash_append(list("\uFDD1let",destructure(pattern,list("\uFDD1cdr",x),_emptylst)),((function() {var o37 = (function(o36){
return (function() {if(vector_p_(o36)) {return vector_dash__gt_list(o36);
} else {return o36;
}})()
;
});
var o38 = body;
return o37(o38);
}))())),__generator()));
});
var o34 = gensym();
var o35 = gensym();
return o33(o34,o35);
}))();
});
var destructure = (function(pattern,access,bindings){
return (function() {if(null_p_(pattern)) {return ((function() {return bindings;
}))();
} else {return (function() {if(eq_p_(car(pattern),"\uFDD1.")) {return ((function() {return cons(list(cadr(pattern),access),bindings);
}))();
} else {return ((function() {return cons(list(car(pattern),list("\uFDD1car",access)),destructure(cdr(pattern),list("\uFDD1cdr",access),bindings));
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
return ((function() {var o39 = (function(v_star_,vf_star_){
for_dash_each((function(_var_){
return (function() {if((dict_dash_ref(v_star_,_var_) || dict_dash_ref(vf_star_,_var_))) {throw(str("can't redefine variable: ",_var_));
} else {return false;
}})()
;
}),vars);
return set_dash_frame_dash_vars_excl_(frame,dict_dash_merge(v_star_,empty_dash_dict(vars,"\uFDD1not-allocated")));
});
var o40 = frame_dash_vars(frame);
var o41 = frame_dash_funcs(frame);
return o39(o40,o41);
}))();
});
var add_dash_func_dash_to_dash_frame = (function(frame,name){
return ((function() {var o42 = (function(v_star_,vf_star_){
(function() {if((dict_dash_ref(v_star_,name) || dict_dash_ref(vf_star_,name))) {throw(str("can't redefine variable: ",name));
} else {return false;
}})()
;
return dict_dash_put_excl_(vf_star_,name,"\uFDD1not-created");
});
var o43 = frame_dash_vars(frame);
var o44 = frame_dash_funcs(frame);
return o42(o43,o44);
}))();
});
var lookup_dash_variable = (function(env,_var_){
return (function() {if(list_p_(env)) {return ((function() {var o45 = (function(frame,v){
return (function() {if(v) {return _var_;
} else {return lookup_dash_variable(cdr(env),_var_);
}})()
;
});
var o46 = car(env);
var o47 = dict_dash_ref(frame_dash_vars(o46),_var_);
return o45(o46,o47);
}))();
} else {return false;
}})()
;
});
var lookup_dash_variable_dash_reg = (function(env,_var_){
return (function() {if(list_p_(env)) {return ((function() {var o48 = (function(frame,v){
return (function() {if(v) {return v;
} else {return lookup_dash_variable_dash_reg(cdr(env),_var_);
}})()
;
});
var o49 = car(env);
var o50 = dict_dash_ref(frame_dash_vars(o49),_var_);
return o48(o49,o50);
}))();
} else {return false;
}})()
;
});
var _per_allocate_dash_registers = (function(env,vars,free_dash_regs){
return (function() {if((list_p_(env) && not(null_p_(vars)))) {return ((function() {var o51 = (function(frame,v_star_){
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
var o52 = car(env);
var o53 = frame_dash_vars(o52);
return o51(o52,o53);
}))();
} else {return false;
}})()
;
});
var allocate_dash_registers = (function(env,vars){
return ((function() {var loop = (function(vars,unallocated,free_dash_regs){
return (function() {if(null_p_(vars)) {return _per_allocate_dash_registers(env,unallocated,free_dash_regs);
} else {return ((function() {var o57 = (function(reg){
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
var o58 = lookup_dash_variable_dash_reg(env,car(vars));
return o57(o58);
}))();
}})()
;
});
var o54 = vars;
var o55 = _emptylst;
var o56 = all_dash_regs;
return trampoline(loop(o54,o55,o56));
}))();
});
var lookup_dash_function = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o59 = (function(frame,def){
return (function() {if(def) {return name;
} else {return lookup_dash_function(cdr(env),name);
}})()
;
});
var o60 = car(env);
var o61 = dict_dash_ref(frame_dash_funcs(o60),name);
return o59(o60,o61);
}))();
} else {return false;
}})()
;
});
var lookup_dash_function_dash_def = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o62 = (function(frame,def){
return (function() {if(def) {return def;
} else {return lookup_dash_function_dash_def(cdr(env),name);
}})()
;
});
var o63 = car(env);
var o64 = dict_dash_ref(frame_dash_funcs(o63),name);
return o62(o63,o64);
}))();
} else {return false;
}})()
;
});
var save_dash_function_dash_def_excl_ = (function(env,name,def){
return ((function() {var o65 = (function(frame,vf_star_,vf_dash_def){
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
var o66 = car(env);
var o67 = frame_dash_funcs(o66);
var o68 = dict_dash_ref(o67,name);
return o65(o66,o67,o68);
}))();
});
var strip_dash_deref = (function(_var_){
return (function() {if(vector_p_(_var_)) {return vector_dash_ref(_var_,0);
} else {return _var_;
}})()
;
});
var dereference_p_ = vector_p_;
var all_dash_regs = list("\uFDD1A","\uFDD1B","\uFDD1C","\uFDD1X","\uFDD1Y","\uFDD1Z","\uFDD1I");
var r_dash_init_dash_template = list(make_dash_frame(_emptylst));
true;
true;
var r_dash_init_dash_make = (function() {return ((function() {var o82 = (function(frame_dash_template,frame){
set_dash_frame_dash_funcs_excl_(frame,dict_dash_map((function(x){
return x;
}),frame_dash_funcs(frame_dash_template)));
return list(frame);
});
var o83 = top_dash_frame(r_dash_init_dash_template);
var o84 = make_dash_frame(keys(frame_dash_vars(o83)));
return o82(o83,o84);
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
return ((function() {var o85 = (function(native_p_){
return list("\uFDD1FUNCTION",name,args,env,body,native_p_);
});
var o86 = (function() {if(null_p_(native_p_)) {return false;
} else {return car(native_p_);
}})()
;
return o85(o86);
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
var make_dash_deref = (function(v){
return list("\uFDD1DEREF",v);
});
var deref_p_ = (function(v){
return (list_p_(v) && _eq__eq_(car(v),"\uFDD1DEREF"));
});
var deref_dash_value = cadr;
var compile_dash_variable = (function(v,env){
return ((function() {var o87 = (function(_var_){
return (function() {if(_var_) {return list("\uFDD1VARIABLE-REF",v);
} else {return ((function() {var o89 = (function(f){
return (function() {if(f) {return list("\uFDD1FUNCTION-REF",f);
} else {throw(str("undefined variable: ",v));
}})()
;
});
var o90 = lookup_dash_function(env,v);
return o89(o90);
}))();
}})()
;
});
var o88 = lookup_dash_variable(env,v);
return o87(o88);
}))();
});
var compile_dash_deref = (function(exp,env){
return ((function() {var o91 = (function(v){
(function() {if(not((number_p_(v) || symbol_p_(v)))) {throw(str("can't deref expression: ",v));
} else {return false;
}})()
;
return make_dash_deref(compile_star_(v,env));
});
var o92 = vector_dash_ref(exp,0);
return o91(o92);
}))();
});
var compile_dash_quoted = (function(exp){
return make_dash_const(exp);
});
var compile_dash_definition = (function(e,e_star_,env){
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o93 = (function(name){
add_dash_func_dash_to_dash_frame(top_dash_frame(env),name);
return ((function() {var o95 = (function(fenv){
return ((function() {var o97 = (function(def){
return save_dash_function_dash_def_excl_(env,name,def);
});
var o98 = make_dash_function_dash_def(name,cdr(e),fenv,compile_dash_sequence(e_star_,fenv));
return o97(o98);
}))();
});
var o96 = extend_dash_environment(env,cdr(e));
return o95(o96);
}))();
});
var o94 = car(e);
return o93(o94);
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
return ((function() {var o99 = (function(res,v){
(function() {if(not(v)) {throw(str("undefined variable: ",_var_));
} else {return false;
}})()
;
return make_dash_set(v,env,res);
});
var o100 = compile_star_(exp,env);
var o101 = lookup_dash_variable(env,_var_);
return o99(o100,o101);
}))();
});
var compile_dash_sequence = (function(e_star_,env){
return (function() {if(list_p_(e_star_)) {return (function() {if(list_p_(cdr(e_star_))) {return cons(compile_star_(car(e_star_),env),compile_dash_sequence(cdr(e_star_),env));
} else {return ((function() {var o102 = (function(e){
return (function() {if(function_dash_def_p_(e)) {return list(e);
} else {return list(list("\uFDD1RETURN",e));
}})()
;
});
var o103 = compile_star_(car(e_star_),env);
return o102(o103);
}))();
}})()
;
} else {return _emptylst;
}})()
;
});
var compile_dash_application = (function(v,a_star_,env){
return ((function() {var o104 = (function(frame,vars){
(function() {if(not((register_p_(v) || label_p_(v)))) {throw(str("cannot apply to non-function type: ",v));
} else {return false;
}})()
;
return ((function() {var o107 = (function(f,args){
(function() {if(not(f)) {throw(str("undefined variable: ",v));
} else {return false;
}})()
;
return make_dash_application(env,f,args);
});
var o108 = (lookup_dash_variable(env,v) || lookup_dash_function(env,v));
var o109 = map((function(a){
(function() {if((list_p_(a) && _eq__eq_(car(a),"\uFDD1set!"))) {throw(str("bad function value: ",a));
} else {return false;
}})()
;
return compile_star_(a,env);
}),a_star_);
return o107(o108,o109);
}))();
});
var o105 = top_dash_frame(env);
var o106 = frame_dash_vars(o105);
return o104(o105,o106);
}))();
});
var compile_star_ = (function(exp,cenv){
return (function() {if(atom_p_(exp)) {return ((function() {return (function() {if(symbol_p_(exp)) {return compile_dash_variable(exp,cenv);
} else {return compile_dash_quoted(exp);
}})()
;
}))();
} else {return (function() {if(dereference_p_(exp)) {return ((function() {return compile_dash_deref(exp,cenv);
}))();
} else {return ((function() {return (function() {if(list_dash_find(list("\uFDD1define"),car(exp))) {return ((function() {return compile_dash_definition(cadr(exp),cddr(exp),cenv);
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
}))();
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
return (function() {if(function_dash_def_p_(el)) {return ((function() {var o110 = (function(hoisted){
return list(car(acc),list_dash_append(hoisted,cadr(acc)));
});
var o111 = hoist(el);
return o110(o111);
}))();
} else {return list(cons(el,car(acc)),cadr(acc));
}})()
;
}),list(_emptylst,_emptylst),function_dash_body(f));
return list_dash_append(cadr(sliced),list(reconstruct(f,car(sliced))));
});
var allocate = (function(funcs){
map((function(f){
return ((function() {var o112 = (function(refs){
return allocate_dash_registers(function_dash_env(f),refs);
});
var o113 = map((function(v){
return (function() {if(variable_dash_ref_p_(v)) {return cadr(v);
} else {return set_dash_name(v);
}})()
;
}),scan(function_dash_body(f),(function(e){
return (_eq__eq_(car(e),"\uFDD1VARIABLE-REF") || _eq__eq_(car(e),"\uFDD1SET"));
})));
return o112(o113);
}))();
}),funcs);
return funcs;
});
var linearize_dash_deref = (function(exp,target){
return ((function() {var o114 = (function(x,v){
return (function() {if(target) {return list(list("\uFDD1SET",target,list_dash__gt_vector(list(v))));
} else {return vector(v);
}})()
;
});
var o115 = deref_dash_value(exp);
var o116 = (function() {if(const_p_(o115)) {return const_dash_value(o115);
} else {return o115;
}})()
;
return o114(o115,o116);
}))();
});
var linearize_dash_reference = (function(exp,target){
return (function() {if(target) {return list(list("\uFDD1SET",target,exp));
} else {return _emptylst;
}})()
;
});
var linearize_dash_return = (function(exp){
return linearize(cadr(exp),"\uFDD1J");
});
var replace_dash_variable_dash_refs = (function(exp,env){
return walk(exp,(function(e){
return (function() {if(_eq__eq_(car(e),"\uFDD1VARIABLE-REF")) {return ((function() {var o117 = (function(v,r){
(function() {if(not(r)) {throw("error, register not assigned");
} else {return false;
}})()
;
return r;
});
var o118 = cadr(e);
var o119 = lookup_dash_variable_dash_reg(env,o118);
return o117(o118,o119);
}))();
} else {return false;
}})()
;
}));
});
var linearize_dash_function = (function(exp){
return ((function() {var o120 = (function(env){
return list_dash_append(list(function_dash_name(exp)),((function() {var o123 = (function(o122){
return (function() {if(vector_p_(o122)) {return vector_dash__gt_list(o122);
} else {return o122;
}})()
;
});
var o124 = linearize(function_dash_body(replace_dash_variable_dash_refs(exp,env)));
return o123(o124);
}))(),list(list("\uFDD1SET","\uFDD1PC","\uFDD1POP")));
});
var o121 = function_dash_env(exp);
return o120(o121);
}))();
});
var linearize_dash_assignment = (function(exp){
return ((function() {var o125 = (function(_var_,reg,v){
return linearize(v,reg);
});
var o126 = set_dash_name(exp);
var o127 = lookup_dash_variable_dash_reg(set_dash_env(exp),o126);
var o128 = set_dash_value(exp);
return o125(o126,o127,o128);
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
} else {return ((function() {var o132 = (function(_var_,reg,exp){
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
var o133 = car(a_star_);
var o134 = dict_dash_ref(arg_dash_regs,o133);
var o135 = dict_dash_ref(arg_dash_values,o133);
return o132(o133,o134,o135);
}))();
}})()
;
});
var o129 = keys(arg_dash_values);
var o130 = _emptylst;
var o131 = _emptylst;
return trampoline(loop(o129,o130,o131));
}))();
});
var optimized_dash_native_dash_application_p_ = (function(exp){
return ((function() {var o136 = (function(env,def){
return (function_dash_native_p_(def) && fold((function(arg,acc){
return (acc && (const_p_(arg) || symbol_p_(arg) || deref_p_(arg)));
}),true,application_dash_args(exp)));
});
var o137 = application_dash_env(exp);
var o138 = lookup_dash_function_dash_def(o137,application_dash_name(exp));
return o136(o137,o138);
}))();
});
var linearize_dash_native_dash_application = (function(exp){
return ((function() {var o139 = (function(env,def,fenv,arg_dash_regs,args){
return list(list_dash_append(list(application_dash_name(exp)),((function() {var o146 = (function(o145){
return (function() {if(vector_p_(o145)) {return vector_dash__gt_list(o145);
} else {return o145;
}})()
;
});
var o147 = map((function(a){
return (function() {if(const_p_(a)) {return ((function() {return const_dash_value(a);
}))();
} else {return (function() {if(symbol_p_(a)) {return ((function() {return a;
}))();
} else {return (function() {if(deref_p_(a)) {return ((function() {return linearize_dash_deref(a);
}))();
} else {return ((function() {throw(str("error: can't apply to native function: ",a));
}))();
}})()
;
}})()
;
}})()
;
}),application_dash_args(exp));
return o146(o147);
}))()));
});
var o140 = application_dash_env(exp);
var o141 = lookup_dash_function_dash_def(o140,application_dash_name(exp));
var o142 = function_dash_env(o141);
var o143 = frame_dash_vars(top_dash_frame(o142));
var o144 = application_dash_args(exp);
return o139(o140,o141,o142,o143,o144);
}))();
});
var linearize_dash_application = (function(exp,target){
return ((function() {var o148 = (function(env,def,fenv,regs,arg_dash_regs,args){
(function() {if(not(_eq__eq_(length(keys(args)),length(keys(arg_dash_regs))))) {return ((function() {var o155 = (function(argv){
throw(str("wrong number of arguments: (",application_dash_name(exp)," ",argv["join"](" "),")"));
});
var o156 = list_dash__gt_vector(map(str,args));
return o155(o156);
}))();
} else {return false;
}})()
;
return list_dash_append(fold((function(r,acc){
return (function() {if(not(_eq__eq_(r,target))) {return cons(list("\uFDD1SET","\uFDD1PUSH",r),acc);
} else {return acc;
}})()
;
}),_emptylst,regs),linearize_dash_arguments(args,arg_dash_regs),(function() {if(function_dash_native_p_(def)) {return list(list_dash_append(list(application_dash_name(exp)),((function() {var o158 = (function(o157){
return (function() {if(vector_p_(o157)) {return vector_dash__gt_list(o157);
} else {return o157;
}})()
;
});
var o159 = map((function(a){
return dict_dash_ref(arg_dash_regs,a);
}),function_dash_args(def));
return o158(o159);
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
var o149 = application_dash_env(exp);
var o150 = lookup_dash_function_dash_def(o149,application_dash_name(exp));
var o151 = function_dash_env(o150);
var o152 = fold((function(el,acc){
return (function() {if(not(_eq__eq_(el,"\uFDD1not-allocated"))) {return cons(el,acc);
} else {return acc;
}})()
;
}),_emptylst,vals(frame_dash_vars(top_dash_frame(o149))));
var o153 = frame_dash_vars(top_dash_frame(o151));
var o154 = zip(function_dash_args(o150),application_dash_args(exp));
return o148(o149,o150,o151,o152,o153,o154);
}))();
});
var linearize = (function(exp){
var target = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o160 = (function(target){
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
} else {return (function() {if(list_dash_find(list("\uFDD1DEREF"),car(exp))) {return ((function() {return linearize_dash_deref(exp,target);
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
var o162 = exp;
var o163 = _emptylst;
return trampoline(loop(o162,o163));
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
}})()
;
} else {return (function() {if(target) {return linearize_dash_reference(exp,target);
} else {throw(str("cannot linearize expression: ",exp));
}})()
;
}})()
;
});
var o161 = (function() {if(null_p_(target)) {return false;
} else {return car(target);
}})()
;
return o160(o161);
}))();
});
var compile = (function(exp){
r_dash_init_dash_initialize_excl_();
return ((function() {var o164 = (function(exp){
return (function() {if(atom_p_(exp)) {return ((function() {return exp;
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
var o165 = compile_star_(exp,r_dash_init);
return o164(o165);
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
} else {return ((function() {return v;
}))();
}})()
;
}})()
;
}),vals));
});
return for_dash_each((function(e){
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o166 = (function(ln){
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
var o167 = length(e);
return o166(o167);
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
((function() {var o168 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1+");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1+",make_dash_function_dash_def("\uFDD1+",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o169 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o168(o169);
}))();
((function() {var o170 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1-");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1-",make_dash_function_dash_def("\uFDD1-",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o171 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o170(o171);
}))();
((function() {var o172 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1/");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1/",make_dash_function_dash_def("\uFDD1/",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o173 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o172(o173);
}))();
((function() {var o174 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1*");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1*",make_dash_function_dash_def("\uFDD1*",list("\uFDD1x","\uFDD1y"),env,_emptylst,false));
});
var o175 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o174(o175);
}))();
((function() {var o176 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1print");
allocate_dash_registers(env,list("\uFDD1pos","\uFDD1text"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1print",make_dash_function_dash_def("\uFDD1print",list("\uFDD1pos","\uFDD1text"),env,_emptylst,false));
});
var o177 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1pos","\uFDD1text"));
return o176(o177);
}))();
((function() {var o178 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1deref");
allocate_dash_registers(env,list("\uFDD1x"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1deref",make_dash_function_dash_def("\uFDD1deref",list("\uFDD1x"),env,_emptylst,false));
});
var o179 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x"));
return o178(o179);
}))();
((function() {var o180 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1ADD");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1ADD",make_dash_function_dash_def("\uFDD1ADD",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o181 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o180(o181);
}))();
((function() {var o182 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1SET");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1SET",make_dash_function_dash_def("\uFDD1SET",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o183 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o182(o183);
}))();
((function() {var o184 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1BOR");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1BOR",make_dash_function_dash_def("\uFDD1BOR",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o185 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"));
return o184(o185);
}))();
var std_dash_lib = _emptylst;
output(list(list("\uFDD1JSR","\uFDD1__main")),std_dash_lib,linearize(compile(expand(list("\uFDD1begin",list("\uFDD1define",list("\uFDD1__main"),list("\uFDD1define","\uFDD1color",61440),list("\uFDD1define","\uFDD1bg-color",0),list("\uFDD1define-macro",list("\uFDD1print","\uFDD1pos","\uFDD1text"),list("\uFDD1let",list(list("\uFDD1pos",list("\uFDD1cadr","\uFDD1exp")),list("\uFDD1text",list("\uFDD1caddr","\uFDD1exp")),list("\uFDD1color",61440),list("\uFDD1bg-color",0)),list("\uFDD1if",list("\uFDD1and",list("\uFDD1number?","\uFDD1pos"),list("\uFDD1number?","\uFDD1text")),list("\uFDD1quasiquote",list("\uFDD1SET",vector(list("\uFDD1unquote",list("\uFDD1+",32768,"\uFDD1pos"))),list("\uFDD1unquote",list("\uFDD1bitwise-or","\uFDD1text",list("\uFDD1bitwise-or","\uFDD1color","\uFDD1bg-color"))))),list("\uFDD1quasiquote",list("\uFDD1printr",list("\uFDD1unquote","\uFDD1pos"),list("\uFDD1unquote","\uFDD1text")))))),list("\uFDD1define",list("\uFDD1printr","\uFDD1pos","\uFDD1text"),list("\uFDD1ADD","\uFDD1pos",32768),list("\uFDD1BOR","\uFDD1text","\uFDD1color"),list("\uFDD1BOR","\uFDD1text","\uFDD1bg-color"),list("\uFDD1SET",vector("\uFDD1pos"),"\uFDD1text")),list("\uFDD1print",0,53),list("\uFDD1print",1,32),list("\uFDD1print",2,54),list("\uFDD1print",3,32),list("\uFDD1print",4,55)))))));

