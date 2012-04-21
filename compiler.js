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
} else {return ((function() {return ("<unknown " + obj + ">");
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
var gensym = (function() {return string_dash__gt_symbol(("o" + Math["floor"]((Math["random"]() * 10000000))));
});


var __compiler = require('./outlet/compiler');
var __generator = require('./outlet/backends/js');
var read = __compiler.read;
var fs = require("fs");true;
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
return 0;
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
install_dash_macro("\uFDD1define-inline",(function(form,e){
return ((function() {var o33 = (function(name_slash_args,body){
install_dash_inline(car(name_slash_args),cdr(name_slash_args),body);
return 0;
});
var o34 = cadr(form);
var o35 = cddr(form);
return o33(o34,o35);
}))();
}));
install_dash_macro("\uFDD1define-prim",(function(form,e){
return ((function() {var o36 = (function(name_slash_args,body){
install_dash_global_dash_func(car(name_slash_args),cdr(name_slash_args),_emptylst,false);
return 0;
});
var o37 = cadr(form);
var o38 = cddr(form);
return o36(o37,o38);
}))();
}));
var make_dash_macro = (function(pattern,body){
return ((function() {var o39 = (function(x,e){
return eval(__compiler["compile"](list("\uFDD1lambda",list(x),list_dash_append(list("\uFDD1let",destructure(pattern,list("\uFDD1cdr",x),_emptylst)),((function() {var o43 = (function(o42){
return (function() {if(vector_p_(o42)) {return vector_dash__gt_list(o42);
} else {return o42;
}})()
;
});
var o44 = body;
return o43(o44);
}))())),__generator()));
});
var o40 = gensym();
var o41 = gensym();
return o39(o40,o41);
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
var environment_p_ = (function(obj){
return (list_p_(obj) && (vector_p_(car(obj)) && _eq__eq_(vector_dash_length(car(obj)),3) && symbol_p_(vector_dash_ref(car(obj),2))));
});
var extend_dash_environment = (function(env,vars,enclosing_dash_func){
return cons(make_dash_frame(vars,enclosing_dash_func),env);
});
var empty_dash_dict = (function(vals,def){
return zip(vals,map((function(v){
return def;
}),vals));
});
var make_dash_frame = (function(vars,enclosing_dash_func){
return vector(empty_dash_dict(vars,"\uFDD1not-allocated"),empty_dash_dict(_emptylst,"\uFDD1not-created"),enclosing_dash_func);
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
var frame_dash_enclosing_dash_function = (function(frame){
return vector_dash_ref(frame,2);
});
var set_dash_frame_dash_enclosing_dash_function = (function(frame,name){
return vector_dash_set_excl_(frame,2,name);
});
var top_dash_frame = car;
var next_dash_frames = cdr;
var add_dash_to_dash_frame = (function(frame,vars){
return ((function() {var o45 = (function(v_star_,vf_star_){
for_dash_each((function(_var_){
return (function() {if((dict_dash_ref(v_star_,_var_) || dict_dash_ref(vf_star_,_var_))) {throw(str("can't redefine variable: ",_var_));
} else {return false;
}})()
;
}),vars);
return set_dash_frame_dash_vars_excl_(frame,dict_dash_merge(v_star_,empty_dash_dict(vars,"\uFDD1not-allocated")));
});
var o46 = frame_dash_vars(frame);
var o47 = frame_dash_funcs(frame);
return o45(o46,o47);
}))();
});
var add_dash_func_dash_to_dash_frame = (function(frame,name){
return ((function() {var o48 = (function(v_star_,vf_star_){
(function() {if((dict_dash_ref(v_star_,name) || dict_dash_ref(vf_star_,name))) {throw(str("can't redefine variable: ",name));
} else {return false;
}})()
;
return dict_dash_put_excl_(vf_star_,name,"\uFDD1not-created");
});
var o49 = frame_dash_vars(frame);
var o50 = frame_dash_funcs(frame);
return o48(o49,o50);
}))();
});
var lookup_dash_variable = (function(env,_var_){
return (function() {if(global_dash_variable_p_(_var_)) {return _var_;
} else {return _per_lookup_dash_variable(env,_var_);
}})()
;
});
var _per_lookup_dash_variable = (function(env,_var_){
return (function() {if(list_p_(env)) {return ((function() {var o51 = (function(frame,v){
return (function() {if(v) {return _var_;
} else {return lookup_dash_variable(cdr(env),_var_);
}})()
;
});
var o52 = car(env);
var o53 = dict_dash_ref(frame_dash_vars(o52),_var_);
return o51(o52,o53);
}))();
} else {return false;
}})()
;
});
var lookup_dash_variable_dash_reg = (function(env,_var_){
return (function() {if(global_dash_variable_p_(_var_)) {return _var_;
} else {return _per_lookup_dash_variable_dash_reg(env,_var_);
}})()
;
});
var _per_lookup_dash_variable_dash_reg = (function(env,_var_){
return (function() {if(list_p_(env)) {return ((function() {var o54 = (function(frame,v){
return (function() {if(v) {return v;
} else {return lookup_dash_variable_dash_reg(cdr(env),_var_);
}})()
;
});
var o55 = car(env);
var o56 = dict_dash_ref(frame_dash_vars(o55),_var_);
return o54(o55,o56);
}))();
} else {return false;
}})()
;
});
var _per_allocate_dash_registers = (function(env,vars,free_dash_regs){
return (function() {if((list_p_(env) && not(null_p_(vars)))) {return ((function() {var o57 = (function(frame,v_star_){
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
var o58 = car(env);
var o59 = frame_dash_vars(o58);
return o57(o58,o59);
}))();
} else {return false;
}})()
;
});
var allocate_dash_registers = (function(env,vars){
return ((function() {var loop = (function(vars,unallocated,free_dash_regs){
return (function() {if(null_p_(vars)) {return _per_allocate_dash_registers(env,unallocated,free_dash_regs);
} else {return ((function() {var o63 = (function(reg){
(function() {if(not(reg)) {throw(str("can't allocate reg for non-existant variable: ",car(vars),"\nwhat the heck man? why'd you give me that?"));
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
var o64 = lookup_dash_variable_dash_reg(env,car(vars));
return o63(o64);
}))();
}})()
;
});
var o60 = vars;
var o61 = _emptylst;
var o62 = all_dash_regs;
return trampoline(loop(o60,o61,o62));
}))();
});
var lookup_dash_function = (function(env,name){
return (function() {if(inline_dash_function_p_(name)) {return name;
} else {return _per_lookup_dash_function(env,name);
}})()
;
});
var _per_lookup_dash_function = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o65 = (function(frame,def){
return (function() {if(def) {return name;
} else {return _per_lookup_dash_function(cdr(env),name);
}})()
;
});
var o66 = car(env);
var o67 = dict_dash_ref(frame_dash_funcs(o66),name);
return o65(o66,o67);
}))();
} else {return false;
}})()
;
});
var lookup_dash_function_dash_def = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o68 = (function(frame,def){
return (function() {if(def) {return def;
} else {return lookup_dash_function_dash_def(cdr(env),name);
}})()
;
});
var o69 = car(env);
var o70 = dict_dash_ref(frame_dash_funcs(o69),name);
return o68(o69,o70);
}))();
} else {return false;
}})()
;
});
var namespaced_dash_function_dash_name = (function(env,name){
return (function() {if(inline_dash_function_p_(name)) {return name;
} else {return _per_namespaced_dash_function_dash_name(env,name);
}})()
;
});
var _per_namespaced_dash_function_dash_name = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o71 = (function(frame,def){
return (function() {if(def) {return string_dash__gt_symbol(generate_dash_global_dash_name(env,name));
} else {return _per_namespaced_dash_function_dash_name(cdr(env),name);
}})()
;
});
var o72 = car(env);
var o73 = dict_dash_ref(frame_dash_funcs(o72),name);
return o71(o72,o73);
}))();
} else {return false;
}})()
;
});
var generate_dash_global_dash_name = (function(env,name){
var names = list_dash__gt_vector(list_dash_append((function() {if(null_p_(env)) {return _emptylst;
} else {return map(str,map(frame_dash_enclosing_dash_function,cdr(reverse(env))));
}})()
,list(str(name))));
return names["join"]("-");
});
var save_dash_function_dash_def_excl_ = (function(env,name,def){
return ((function() {var o74 = (function(frame,vf_star_,vf_dash_def){
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
var o75 = car(env);
var o76 = frame_dash_funcs(o75);
var o77 = dict_dash_ref(o76,name);
return o74(o75,o76,o77);
}))();
});
var strip_dash_deref = (function(_var_){
return (function() {if(vector_p_(_var_)) {return vector_dash_ref(_var_,0);
} else {return _var_;
}})()
;
});
var dereference_p_ = vector_p_;
var _per_globals = _emptylst;
var add_dash_to_dash_globals = (function(_var_){
_per_globals = cons(_var_,_per_globals);
});
var global_dash_variable_p_ = (function(_var_){
return list_dash_find(_per_globals,_var_);
});
var _per_inlines = _emptylst;
var add_dash_inline = (function(inl){
_per_inlines = cons(inl,_per_inlines);
});
var make_dash_inline = (function(name,args,body){
return list("\uFDD1INLINE",name,args,body);
});
var inline_dash_name = cadr;
var inline_dash_args = caddr;
var inline_dash_body = (function(e){
return car(cdddr(e));
});
var inline_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),"\uFDD1INLINE"));
});
var inline_dash_function_p_ = (function(name){
return fold((function(el,acc){
return (_eq__eq_(inline_dash_name(el),name) || acc);
}),false,_per_inlines);
});
var get_dash_inline_dash_def = (function(name){
return ((function() {var loop = (function(lst){
return (function() {if(_eq__eq_(inline_dash_name(car(lst)),name)) {return car(lst);
} else {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}})()
;
});
var o78 = _per_inlines;
return trampoline(loop(o78));
}))();
});
var linearized_dash_inline_dash_functions = (function() {return apply(list_dash_append,map((function(i){
return linearize(lookup_dash_function_dash_def(r_dash_init_dash_template,inline_dash_name(i)));
}),_per_inlines));
});
var install_dash_inline = (function(name,args,body){
return ((function() {var o79 = (function(compiled,target){
add_dash_inline(make_dash_inline(name,args,replace_dash_variable_dash_refs(function_dash_body(car(compiled)),false,false)));
var walked = walk(body,(function(e){
return (function() {if(symbol_p_(e)) {return (function() {if(_eq__eq_(e,target)) {return ((function() {return "\uFDD1J";
}))();
} else {return ((function() {return false;
}))();
}})()
;
} else {return false;
}})()
;
}));
return install_dash_global_dash_func(name,cdr(args),walked,false);
});
var o80 = compile(list_dash_append(list("\uFDD1define",list_dash_append(list(name),((function() {var o83 = (function(o82){
return (function() {if(vector_p_(o82)) {return vector_dash__gt_list(o82);
} else {return o82;
}})()
;
});
var o84 = args;
return o83(o84);
}))())),((function() {var o86 = (function(o85){
return (function() {if(vector_p_(o85)) {return vector_dash__gt_list(o85);
} else {return o85;
}})()
;
});
var o87 = body;
return o86(o87);
}))()));
var o81 = car(args);
return o79(o80,o81);
}))();
});
true;
var all_dash_regs = list("\uFDD1A","\uFDD1B","\uFDD1C","\uFDD1X","\uFDD1Y","\uFDD1Z","\uFDD1I");
var r_dash_init_dash_template = list(make_dash_frame(_emptylst,"\uFDD1global"));
var install_dash_global_dash_func = (function(name,args,body,native_p_){
return ((function() {var o97 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),name);
allocate_dash_registers(env,args);
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,name,make_dash_function_dash_def(name,args,env,compile_dash_sequence(body,env),native_p_));
});
var o98 = extend_dash_environment(r_dash_init_dash_template,args,name);
return o97(o98);
}))();
});
true;
true;
true;
var r_dash_init_dash_make = (function() {return ((function() {var o116 = (function(frame_dash_template,frame){
set_dash_frame_dash_funcs_excl_(frame,dict_dash_map((function(x){
return x;
}),frame_dash_funcs(frame_dash_template)));
return list(frame);
});
var o117 = top_dash_frame(r_dash_init_dash_template);
var o118 = make_dash_frame(keys(frame_dash_vars(o117)),frame_dash_enclosing_dash_function(o117));
return o116(o117,o118);
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
return ((function() {var o119 = (function(native_p_){
return list("\uFDD1FUNCTION",name,args,env,body,native_p_);
});
var o120 = (function() {if(null_p_(native_p_)) {return false;
} else {return car(native_p_);
}})()
;
return o119(o120);
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
var function_dash_prefix = (function(f){
return car(cdddr(cdddr(f)));
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
var application_dash_full_dash_name = (function(env,e){
return namespaced_dash_function_dash_name(env,application_dash_name(e));
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
var make_dash_if = (function(cnd,tru,alt){
return list("\uFDD1IF",cnd,tru,alt);
});
var if_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),"\uFDD1IF"));
});
var if_dash_cnd = cadr;
var if_dash_tru = caddr;
var if_dash_alt = (function(exp){
return car(cdddr(exp));
});
var make_dash_deref = (function(v){
return list("\uFDD1DEREF",v);
});
var deref_p_ = (function(v){
return (list_p_(v) && _eq__eq_(car(v),"\uFDD1DEREF"));
});
var deref_dash_value = cadr;
var compile_dash_variable = (function(v,env){
return ((function() {var o121 = (function(_var_){
return (function() {if(_var_) {return list("\uFDD1VARIABLE-REF",v);
} else {return ((function() {var o123 = (function(f){
return (function() {if(f) {return list("\uFDD1FUNCTION-REF",f);
} else {throw(str("compile-variable: undefined variable: ",v));
}})()
;
});
var o124 = lookup_dash_function(env,v);
return o123(o124);
}))();
}})()
;
});
var o122 = lookup_dash_variable(env,v);
return o121(o122);
}))();
});
var compile_dash_deref = (function(exp,env){
return ((function() {var o125 = (function(v){
(function() {if(not((number_p_(v) || symbol_p_(v)))) {throw(str("can't deref expression: ",v));
} else {return false;
}})()
;
return make_dash_deref(compile_star_(v,env));
});
var o126 = vector_dash_ref(exp,0);
return o125(o126);
}))();
});
var compile_dash_quoted = (function(exp){
return make_dash_const(exp);
});
var compile_dash_definition = (function(e,e_star_,env){
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o127 = (function(name){
add_dash_func_dash_to_dash_frame(top_dash_frame(env),name);
return ((function() {var o129 = (function(fenv){
return ((function() {var o131 = (function(def){
return save_dash_function_dash_def_excl_(env,name,def);
});
var o132 = make_dash_function_dash_def(name,cdr(e),fenv,compile_dash_sequence(e_star_,fenv));
return o131(o132);
}))();
});
var o130 = extend_dash_environment(env,cdr(e),name);
return o129(o130);
}))();
});
var o128 = car(e);
return o127(o128);
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
return ((function() {var o133 = (function(res,v){
(function() {if(not(v)) {throw(str("compile-assignment: undefined variable: ",_var_));
} else {return false;
}})()
;
return make_dash_set(v,env,res);
});
var o134 = compile_star_(exp,env);
var o135 = lookup_dash_variable(env,_var_);
return o133(o134,o135);
}))();
});
var compile_dash_conditional = (function(cnd,exp,alt,env){
return make_dash_if(compile_star_(cnd,env),compile_star_(exp,env),(alt && compile_star_(alt,env)));
});
var compile_dash_sequence = (function(e_star_,env){
var begin_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1begin"));
});
return (function() {if(list_p_(e_star_)) {return ((function() {var o136 = (function(exp){
return (function() {if(list_p_(cdr(e_star_))) {return ((function() {return (function() {if(begin_p_(exp)) {return list_dash_append;
} else {return cons;
}})()
(compile_star_(exp,env),compile_dash_sequence(cdr(e_star_),env));
}))();
} else {return ((function() {var o138 = (function(e){
return (function() {if(begin_p_(exp)) {return ((function() {return e;
}))();
} else {return (function() {if(function_dash_def_p_(e)) {return ((function() {return list(e);
}))();
} else {return ((function() {return list(list("\uFDD1RETURN",e));
}))();
}})()
;
}})()
;
});
var o139 = compile_star_(exp,env);
return o138(o139);
}))();
}})()
;
});
var o137 = car(e_star_);
return o136(o137);
}))();
} else {return _emptylst;
}})()
;
});
var compile_dash_application = (function(v,a_star_,env){
return ((function() {var o140 = (function(frame,vars){
(function() {if(not((register_p_(v) || label_p_(v)))) {throw(str("cannot apply to non-function type: ",v));
} else {return false;
}})()
;
return ((function() {var o143 = (function(f,args){
(function() {if(not(f)) {throw(str("compile-application: undefined variable: ",v));
} else {return false;
}})()
;
return make_dash_application(env,f,args);
});
var o144 = (lookup_dash_variable(env,v) || lookup_dash_function(env,v));
var o145 = map((function(a){
(function() {if((list_p_(a) && _eq__eq_(car(a),"\uFDD1set!"))) {throw(str("bad function value: ",a));
} else {return false;
}})()
;
return compile_star_(a,env);
}),a_star_);
return o143(o144,o145);
}))();
});
var o141 = top_dash_frame(env);
var o142 = frame_dash_vars(o141);
return o140(o141,o142);
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
} else {return (function() {if(list_dash_find(list("\uFDD1if"),car(exp))) {return ((function() {return compile_dash_conditional(cadr(exp),caddr(exp),(function() {if(null_p_(cdddr(exp))) {return false;
} else {return car(cdddr(exp));
}})()
,cenv);
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
var hoist = (function(exp){
return ((function() {var o146 = (function(hoisted){
return (function() {if(null_p_(cadr(hoisted))) {return caddr(hoisted);
} else {return (function() {if(null_p_(caddr(hoisted))) {return cadr(hoisted);
} else {return list_dash_append(cadr(hoisted),caddr(hoisted));
}})()
;
}})()
;
});
var o147 = _per_hoist(exp);
return o146(o147);
}))();
});
var _per_hoist = (function(exp){
var reconstruct = (function(func,e_star_){
return make_dash_function_dash_def(function_dash_name(func),function_dash_args(func),function_dash_env(func),reverse(e_star_));
});
return (function() {if((literal_p_(exp) || symbol_p_(exp) || vector_p_(exp) || dict_p_(exp))) {return ((function() {return list("\uFDD1VALUE",exp,_emptylst);
}))();
} else {return (function() {if(function_dash_def_p_(exp)) {return ((function() {return ((function() {var o148 = (function(r){
return list("\uFDD1FUNCTIONS",_emptylst,cons(reconstruct(exp,reverse(cadr(r))),caddr(r)));
});
var o149 = _per_hoist(function_dash_body(exp));
return o148(o149);
}))();
}))();
} else {return ((function() {return fold((function(el,acc){
return ((function() {var o150 = (function(r){
return list("\uFDD1VALUE",(function() {if(_eq__eq_(car(r),"\uFDD1VALUE")) {return list_dash_append(cadr(acc),list(cadr(r)));
} else {return cadr(acc);
}})()
,list_dash_append(caddr(acc),caddr(r)));
});
var o151 = _per_hoist(el);
return o150(o151);
}))();
}),list(false,_emptylst,_emptylst),exp);
}))();
}})()
;
}})()
;
});
var allocate = (function(e_star_){
for_dash_each((function(e){
return (function() {if(function_dash_def_p_(e)) {return (function() {if(null_p_(function_dash_body(e))) {throw(str("error: empty function body: ",function_dash_name(e)," (WAT?)"));
} else {return _per_allocate(e);
}})()
;
} else {return e;
}})()
;
}),e_star_);
return e_star_;
});
var _per_allocate = (function(f){
return allocate_dash_registers(function_dash_env(f),map((function(v){
return (function() {if(variable_dash_ref_p_(v)) {return cadr(v);
} else {return set_dash_name(v);
}})()
;
}),scan(function_dash_body(f),(function(e){
return (_eq__eq_(car(e),"\uFDD1SET") || (_eq__eq_(car(e),"\uFDD1VARIABLE-REF") && not(global_dash_variable_p_(cadr(e)))));
}))));
});
var linearize_dash_deref = (function(exp,target){
return ((function() {var o152 = (function(x,v){
return (function() {if(target) {return list(list("\uFDD1SET",target,list_dash__gt_vector(list(v))));
} else {return vector(v);
}})()
;
});
var o153 = deref_dash_value(exp);
var o154 = (function() {if(const_p_(o153)) {return const_dash_value(o153);
} else {return o153;
}})()
;
return o152(o153,o154);
}))();
});
var linearize_dash_reference = (function(exp,target){
return (function() {if((target && not(_eq__eq_(exp,target)))) {return list(list("\uFDD1SET",target,exp));
} else {return _emptylst;
}})()
;
});
var linearize_dash_return = (function(exp){
return linearize(cadr(exp),"\uFDD1J");
});
var replace_dash_variable_dash_refs = (function(exp,env){
var strict_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o155 = (function(strict_p_){
return walk(exp,(function(e){
return (function() {if(_eq__eq_(car(e),"\uFDD1VARIABLE-REF")) {return ((function() {return (function() {if(strict_p_) {return ((function() {var o157 = (function(v,r){
(function() {if(not(r)) {throw(str("error, register not assigned: ",e));
} else {return false;
}})()
;
return r;
});
var o158 = cadr(e);
var o159 = lookup_dash_variable_dash_reg(env,o158);
return o157(o158,o159);
}))();
} else {return cadr(e);
}})()
;
}))();
} else {return (function() {if(_eq__eq_(car(e),"\uFDD1FUNCTION-REF")) {return ((function() {return (function() {if(strict_p_) {return namespaced_dash_function_dash_name(env,cadr(e));
} else {return cadr(e);
}})()
;
}))();
} else {return ((function() {return false;
}))();
}})()
;
}})()
;
}));
});
var o156 = (function() {if(null_p_(strict_p_)) {return true;
} else {return car(strict_p_);
}})()
;
return o155(o156);
}))();
});
var linearize_dash_function = (function(exp){
return ((function() {var o160 = (function(env,replaced,vars){
return list_dash_append(list(namespaced_dash_function_dash_name(env,function_dash_name(exp))),((function() {var o165 = (function(o164){
return (function() {if(vector_p_(o164)) {return vector_dash__gt_list(o164);
} else {return o164;
}})()
;
});
var o166 = fold((function(el,acc){
return (function() {if(not(_eq__eq_(dict_dash_ref(vars,el),"\uFDD1not-allocated"))) {return cons(list("\uFDD1SET",dict_dash_ref(vars,el),"\uFDD1POP"),acc);
} else {return acc;
}})()
;
}),_emptylst,function_dash_args(exp));
return o165(o166);
}))(),((function() {var o168 = (function(o167){
return (function() {if(vector_p_(o167)) {return vector_dash__gt_list(o167);
} else {return o167;
}})()
;
});
var o169 = linearize(function_dash_body(replaced));
return o168(o169);
}))(),list(list("\uFDD1SET","\uFDD1PC","\uFDD1POP")));
});
var o161 = function_dash_env(exp);
var o162 = replace_dash_variable_dash_refs(exp,o161);
var o163 = frame_dash_vars(top_dash_frame(o161));
return o160(o161,o162,o163);
}))();
});
var linearize_dash_assignment = (function(exp){
return ((function() {var o170 = (function(_var_,reg,v){
return linearize(v,reg);
});
var o171 = set_dash_name(exp);
var o172 = lookup_dash_variable_dash_reg(set_dash_env(exp),o171);
var o173 = set_dash_value(exp);
return o170(o171,o172,o173);
}))();
});
var linearize_dash_constant = (function(exp,target){
return (function() {if(target) {return list(list("\uFDD1SET",target,const_dash_value(exp)));
} else {return _emptylst;
}})()
;
});
var linearize_dash_if = (function(exp,target){
return ((function() {var o174 = (function(exit_dash_label,alt_dash_label){
return list_dash_append(linearize(if_dash_cnd(exp),"\uFDD1J"),list_dash_append(list(list("\uFDD1IFE","\uFDD1J",0),list("\uFDD1SET","\uFDD1PC",alt_dash_label)),((function() {var o178 = (function(o177){
return (function() {if(vector_p_(o177)) {return vector_dash__gt_list(o177);
} else {return o177;
}})()
;
});
var o179 = linearize(if_dash_tru(exp),target);
return o178(o179);
}))(),list(list("\uFDD1SET","\uFDD1PC",exit_dash_label),alt_dash_label),((function() {var o181 = (function(o180){
return (function() {if(vector_p_(o180)) {return vector_dash__gt_list(o180);
} else {return o180;
}})()
;
});
var o182 = (function() {if(if_dash_alt(exp)) {return linearize(if_dash_alt(exp),target);
} else {return _emptylst;
}})()
;
return o181(o182);
}))(),list(exit_dash_label)));
});
var o175 = string_dash__gt_symbol(str("exit-",gensym()));
var o176 = string_dash__gt_symbol(str("alt-",gensym()));
return o174(o175,o176);
}))();
});
var linearize_dash_arg = (function(exp){
return (function() {if((application_p_(exp) || if_p_(exp))) {return list_dash_append(linearize(exp,"\uFDD1J"),list(list("\uFDD1SET","\uFDD1PUSH","\uFDD1J")));
} else {return linearize(exp,"\uFDD1PUSH");
}})()
;
});
var linearize_dash_arguments = (function(args,arg_dash_values,arg_dash_regs){
return ((function() {var loop = (function(a_star_,acc){
return (function() {if(null_p_(a_star_)) {return acc;
} else {return ((function() {var o185 = (function(_var_,reg,exp){
(function() {if(not(reg)) {throw(str("linearize-arguments: undefined variable",_var_));
} else {return false;
}})()
;
return vector("__tco_call",(function() {return loop(cdr(a_star_),(function() {if(_eq__eq_(reg,"\uFDD1not-allocated")) {return acc;
} else {return list_dash_append(acc,linearize_dash_arg(exp));
}})()
);
}));
});
var o186 = car(a_star_);
var o187 = dict_dash_ref(arg_dash_regs,o186);
var o188 = dict_dash_ref(arg_dash_values,o186);
return o185(o186,o187,o188);
}))();
}})()
;
});
var o183 = args;
var o184 = _emptylst;
return trampoline(loop(o183,o184));
}))();
});
var native_dash_application_p_ = (function(exp){
return ((function() {var o189 = (function(env,def){
(function() {if(not(def)) {throw(str("undefined function: ",application_dash_name(exp)));
} else {return false;
}})()
;
return function_dash_native_p_(def);
});
var o190 = application_dash_env(exp);
var o191 = lookup_dash_function_dash_def(o190,application_dash_name(exp));
return o189(o190,o191);
}))();
});
var inline_dash_application_p_ = (function(exp){
return inline_dash_function_p_(application_dash_name(exp));
});
var simple_dash_exp_p_ = (function(e){
return (const_p_(e) || symbol_p_(e) || deref_p_(e));
});
var linearize_dash_inline_dash_application = (function(exp,target){
return ((function() {var o192 = (function(env,def,all_dash_args,target_dash_name,args){
return (function() {if(fold((function(el,acc){
return (acc && simple_dash_exp_p_(el));
}),true,application_dash_args(exp))) {return ((function() {var walked = walk(inline_dash_body(def),(function(e){
return (function() {if(symbol_p_(e)) {return (function() {if(dict_dash_ref(args,e)) {return ((function() {return dict_dash_ref(args,e);
}))();
} else {return (function() {if(_eq__eq_(e,target_dash_name)) {return ((function() {return target;
}))();
} else {return ((function() {return false;
}))();
}})()
;
}})()
;
} else {return false;
}})()
;
}));
return linearize(walked);
}))();
} else {return linearize_dash_application(make_dash_application(env,application_dash_name(exp),application_dash_args(exp)),target);
}})()
;
});
var o193 = application_dash_env(exp);
var o194 = get_dash_inline_dash_def(application_dash_name(exp));
var o195 = inline_dash_args(o194);
var o196 = car(o195);
var o197 = zip(cdr(o195),application_dash_args(exp));
return o192(o193,o194,o195,o196,o197);
}))();
});
var linearize_dash_native_dash_application = (function(exp){
var simplify = (function(a){
return (function() {if(const_p_(a)) {return ((function() {return const_dash_value(a);
}))();
} else {return (function() {if(symbol_p_(a)) {return ((function() {return a;
}))();
} else {return (function() {if(deref_p_(a)) {return ((function() {return linearize_dash_deref(a);
}))();
} else {return ((function() {throw("error: found compound expression as native arg");
}))();
}})()
;
}})()
;
}})()
;
});
return ((function() {var o198 = (function(env,def,fenv,arg_dash_regs,args){
return (function() {if(_eq__eq_(application_dash_name(exp),"\uFDD1DAT")) {return list(list_dash_append(list("\uFDD1DAT"),((function() {var o205 = (function(o204){
return (function() {if(vector_p_(o204)) {return vector_dash__gt_list(o204);
} else {return o204;
}})()
;
});
var o206 = map(simplify,application_dash_args(exp));
return o205(o206);
}))()));
} else {return ((function() {(function() {if((not(null_p_(args)) && not(simple_dash_exp_p_(car(args))))) {throw("error: first arg to native application must be simple");
} else {return false;
}})()
;
return list_dash_append((function() {if((not(null_p_(args)) && not(null_p_(cdr(args))) && not(simple_dash_exp_p_(cadr(args))))) {return ((function() {var o207 = (function(arg1){
args = list(car(args),"\uFDD1J");
return arg1;
});
var o208 = linearize(cadr(args),"\uFDD1J");
return o207(o208);
}))();
} else {return _emptylst;
}})()
,list(list_dash_append(list(application_dash_name(exp)),((function() {var o210 = (function(o209){
return (function() {if(vector_p_(o209)) {return vector_dash__gt_list(o209);
} else {return o209;
}})()
;
});
var o211 = map(simplify,args);
return o210(o211);
}))())));
}))();
}})()
;
});
var o199 = application_dash_env(exp);
var o200 = lookup_dash_function_dash_def(o199,application_dash_name(exp));
var o201 = function_dash_env(o200);
var o202 = frame_dash_vars(top_dash_frame(o201));
var o203 = application_dash_args(exp);
return o198(o199,o200,o201,o202,o203);
}))();
});
var linearize_dash_application = (function(exp,target){
var allocated_dash_regs = (function(frame){
return ((function() {var o212 = (function(vars){
return fold((function(v,acc){
return (function() {if(_eq__eq_(dict_dash_ref(vars,v),"\uFDD1not-allocated")) {return acc;
} else {return cons(dict_dash_ref(vars,v),acc);
}})()
;
}),_emptylst,keys(vars));
});
var o213 = frame_dash_vars(frame);
return o212(o213);
}))();
});
var all_dash_allocated_dash_regs = (function(env){
return apply(list_dash_append,map(allocated_dash_regs,env));
});
return ((function() {var o214 = (function(env,def,fenv,all_dash_regs,arg_dash_regs,arg_dash_vals,ret){
(function() {if(not(_eq__eq_(length(function_dash_args(def)),length(application_dash_args(exp))))) {throw(str("wrong number of arguments for ",cons(function_dash_name(def),function_dash_args(def)),", got ",length(application_dash_args(exp))));
} else {return false;
}})()
;
return list_dash_append(fold((function(reg,acc){
return (function() {if(_eq__eq_(reg,target)) {return acc;
} else {return cons(list("\uFDD1SET","\uFDD1PUSH",reg),acc);
}})()
;
}),_emptylst,all_dash_regs),list(list("\uFDD1SET","\uFDD1PUSH",ret)),linearize_dash_arguments(function_dash_args(def),arg_dash_vals,arg_dash_regs),list(list("\uFDD1SET","\uFDD1PC",application_dash_full_dash_name(env,exp)),ret),(function() {if((target && not(_eq__eq_(target,"\uFDD1J")))) {return list(list("\uFDD1SET",target,"\uFDD1J"));
} else {return _emptylst;
}})()
,fold((function(reg,acc){
return (function() {if(_eq__eq_(reg,target)) {return acc;
} else {return cons(list("\uFDD1SET",reg,"\uFDD1POP"),acc);
}})()
;
}),_emptylst,reverse(all_dash_regs)));
});
var o215 = application_dash_env(exp);
var o216 = lookup_dash_function_dash_def(o215,application_dash_name(exp));
var o217 = function_dash_env(o216);
var o218 = all_dash_allocated_dash_regs(o215);
var o219 = frame_dash_vars(top_dash_frame(o217));
var o220 = zip(function_dash_args(o216),application_dash_args(exp));
var o221 = string_dash__gt_symbol(str("return-",gensym()));
return o214(o215,o216,o217,o218,o219,o220,o221);
}))();
});
var linearize = (function(exp){
var target = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o222 = (function(target){
return (function() {if(list_p_(exp)) {return (function() {if(list_dash_find(list("\uFDD1FUNCTION"),car(exp))) {return ((function() {return linearize_dash_function(exp);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1RETURN"),car(exp))) {return ((function() {return linearize_dash_return(exp);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1CALL"),car(exp))) {return ((function() {return (function() {if(inline_dash_application_p_(exp)) {return ((function() {return linearize_dash_inline_dash_application(exp,target);
}))();
} else {return (function() {if(native_dash_application_p_(exp)) {return ((function() {return linearize_dash_native_dash_application(exp);
}))();
} else {return ((function() {return linearize_dash_application(exp,target);
}))();
}})()
;
}})()
;
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1SET"),car(exp))) {return ((function() {return linearize_dash_assignment(exp);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1CONST"),car(exp))) {return ((function() {return linearize_dash_constant(exp,target);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1DEREF"),car(exp))) {return ((function() {return linearize_dash_deref(exp,target);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1IF"),car(exp))) {return ((function() {return linearize_dash_if(exp,target);
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
var o224 = exp;
var o225 = _emptylst;
return trampoline(loop(o224,o225));
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
}})()
;
} else {return (function() {if(target) {return linearize_dash_reference(exp,target);
} else {throw(str("cannot linearize expression: ",exp));
}})()
;
}})()
;
});
var o223 = (function() {if(null_p_(target)) {return false;
} else {return car(target);
}})()
;
return o222(o223);
}))();
});
var compile = (function(exp){
r_dash_init_dash_initialize_excl_();
return allocate(hoist(compile_star_(exp,r_dash_init)));
});
var output = (function(){
var e_star_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var to_dash_str = (function(v){
return (function() {if(number_p_(v)) {return ((function() {return str("0x",v["toString"](16));
}))();
} else {return (function() {if(vector_p_(v)) {return ((function() {return apply(str,list_dash_append(list("["),((function() {var o227 = (function(o226){
return (function() {if(vector_p_(o226)) {return vector_dash__gt_list(o226);
} else {return o226;
}})()
;
});
var o228 = map(to_dash_str,vector_dash__gt_list(v));
return o227(o228);
}))(),list("]")));
}))();
} else {return (function() {if(symbol_p_(v)) {return ((function() {return ((function() {var o229 = (function(s){
s = s["replace"](RegExp("-","g"),"_dash_");
s = s["replace"](RegExp("\\?","g"),"_p_");
s = s["replace"](RegExp("\\!","g"),"_excl_");
s = s["replace"](RegExp(">","g"),"_gt_");
s = s["replace"](RegExp("<","g"),"_lt_");
s = s["replace"](RegExp("%","g"),"_per_");
s = s["replace"](RegExp("=","g"),"_eq_");
s = s["replace"](RegExp("\\/","g"),"_slash_");
s = s["replace"](RegExp("\\+","g"),"_plus_");
s = s["replace"](RegExp("\\*","g"),"_star_");
return s;
});
var o230 = str(v);
return o229(o230);
}))();
}))();
} else {return ((function() {return str(v);
}))();
}})()
;
}})()
;
}})()
;
});
return for_dash_each((function(e){
return (function() {if(list_p_(e)) {return ((function() {return (function() {if(_eq__eq_(car(e),"\uFDD1%")) {return ((function() {print("; ");
return ((function() {var o231 = (function(v_star_){
return println(v_star_["join"](" "));
});
var o232 = list_dash__gt_vector(map(str,cdr(e)));
return o231(o232);
}))();
}))();
} else {return ((function() {print(str(car(e)," "));
return ((function() {var o233 = (function(v){
return println(v["join"](", "));
});
var o234 = list_dash__gt_vector(map(to_dash_str,cdr(e)));
return o233(o234);
}))();
}))();
}})()
;
}))();
} else {return (function() {if(symbol_p_(e)) {return ((function() {return println(str(":",to_dash_str(e)));
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
return (function() {if(list_p_(exp)) {return reverse(fold((function(el,acc){
return (function() {if(environment_p_(el)) {return acc;
} else {return cons(strip_dash_envs(el),acc);
}})()
;
}),_emptylst,exp));
} else {return exp;
}})()
;
});
var pp_dash_w_slash_o_dash_envs = (function(exp){
return ((function() {var o235 = (function(stripped){
return pp(stripped);
});
var o236 = strip_dash_envs(exp);
return o235(o236);
}))();
});
install_dash_global_dash_func("\uFDD1SET",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1ADD",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1SUB",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1MUL",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1DIV",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1MOD",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1SHL",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1SHR",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1AND",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1BOR",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1XOR",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1IFE",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1IFN",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1IFG",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1IFB",list("\uFDD1x","\uFDD1y"),_emptylst,true);
install_dash_global_dash_func("\uFDD1BRK",_emptylst,_emptylst,true);
install_dash_global_dash_func("\uFDD1DAT",_emptylst,_emptylst,true);
add_dash_to_dash_globals("\uFDD1PC");
add_dash_to_dash_globals("\uFDD1SP");
add_dash_to_dash_globals("\uFDD1POP");
add_dash_to_dash_globals("\uFDD1PUSH");
add_dash_to_dash_globals("\uFDD1A");
add_dash_to_dash_globals("\uFDD1B");
add_dash_to_dash_globals("\uFDD1C");
add_dash_to_dash_globals("\uFDD1X");
add_dash_to_dash_globals("\uFDD1Y");
add_dash_to_dash_globals("\uFDD1Z");
add_dash_to_dash_globals("\uFDD1I");
add_dash_to_dash_globals("\uFDD1J");
add_dash_to_dash_globals("\uFDD1__exit");
var compile_dash_program = (function(src){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o237 = (function(target,runtime_p_,exp,lib,exp){
var code = list_dash_append(list("\uFDD1begin"),((function() {var o244 = (function(o243){
return (function() {if(vector_p_(o243)) {return vector_dash__gt_list(o243);
} else {return o243;
}})()
;
});
var o245 = (function() {if(runtime_p_) {return cdr(lib);
} else {return _emptylst;
}})()
;
return o244(o245);
}))(),list(list_dash_append(list("\uFDD1define",list("\uFDD1entry")),((function() {var o247 = (function(o246){
return (function() {if(vector_p_(o246)) {return vector_dash__gt_list(o246);
} else {return o246;
}})()
;
});
var o248 = cdr(exp);
return o247(o248);
}))())));
return (function() {if(list_dash_find(list("\uFDD1expand"),target)) {return ((function() {return expand(code);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1compile-phase1"),target)) {return ((function() {r_dash_init_dash_initialize_excl_();
return compile_star_(expand(code),r_dash_init);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1compile-phase2"),target)) {return ((function() {r_dash_init_dash_initialize_excl_();
return hoist(compile_star_(expand(code),r_dash_init));
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1compile-phase3"),target)) {return ((function() {return compile(expand(code));
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1linearize"),target)) {return ((function() {return linearize(compile(expand(code)));
}))();
} else {return ((function() {return ((function() {var o249 = (function(expanded){
return output(list(list("\uFDD1%","\uFDD1Generated","\uFDD1by","\uFDD1LCPU"),list("\uFDD1%","\uFDD1http://jlongster.github.com/dcpu-lisp/"),list("\uFDD1%"),list("\uFDD1JSR","\uFDD1entry"),list("\uFDD1SET","\uFDD1PC","\uFDD1__exit")),(function() {if(runtime_p_) {return linearized_dash_inline_dash_functions();
} else {return _emptylst;
}})()
,linearize(compile(expanded)),list("\uFDD1__exit",list("\uFDD1SET","\uFDD1PC","\uFDD1__exit"),"\uFDD1__end"));
});
var o250 = expand(code);
return o249(o250);
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
});
var o238 = (function() {if(null_p_(rest)) {return false;
} else {return car(rest);
}})()
;
var o239 = (function() {if((not(list_p_(rest)) || null_p_(cdr(rest)))) {return true;
} else {return cadr(rest);
}})()
;
var o240 = (function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
;
var o241 = read(fs["readFileSync"](str(__dirname,"/lib.ol"),"utf-8"));
var o242 = (function() {if((list_p_(o240) && _eq__eq_(car(o240),"\uFDD1begin"))) {return o240;
} else {return list("\uFDD1begin",o240);
}})()
;
return o237(o238,o239,o240,o241,o242);
}))();
});
var print_dash_expand = (function(src){
return pp(compile_dash_program(src,"\uFDD1expand"));
});
var print_dash_compiled_dash_phase1 = (function(src){
return pp_dash_w_slash_o_dash_envs(compile_dash_program(src,"\uFDD1compile-phase1"));
});
var print_dash_compiled_dash_phase2 = (function(src){
return pp_dash_w_slash_o_dash_envs(compile_dash_program(src,"\uFDD1compile-phase2"));
});
var print_dash_compiled_dash_phase3 = (function(src){
return pp_dash_w_slash_o_dash_envs(compile_dash_program(src,"\uFDD1compile-phase3"));
});
var print_dash_linearized = (function(src){
return pp(compile_dash_program(src,"\uFDD1linearize"));
});
module["exports"] = dict("\uFDD1compile",compile_dash_program,"\uFDD1print-expand",print_dash_expand,"\uFDD1print-compiled-phase1",print_dash_compiled_dash_phase1,"\uFDD1print-compiled-phase2",print_dash_compiled_dash_phase2,"\uFDD1print-compiled-phase3",print_dash_compiled_dash_phase3,"\uFDD1print-linearized",print_dash_linearized,"\uFDD1pp-w/o-envs",pp_dash_w_slash_o_dash_envs,"\uFDD1walk",walk,"\uFDD1scan",scan);

