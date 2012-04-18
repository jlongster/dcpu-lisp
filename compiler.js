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
var gensym = (function() {return string_dash__gt_symbol(("o" + Math["floor"]((Math["random"]() * 10000000))));
});


var __compiler = require('/Users/james/projects/outlet/backends/../compiler');
var __generator = require('/Users/james/projects/outlet/backends/../backends/js');
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
return (function() {if(global_dash_variable_p_(_var_)) {return _var_;
} else {return _per_lookup_dash_variable(env,_var_);
}})()
;
});
var _per_lookup_dash_variable = (function(env,_var_){
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
return (function() {if(global_dash_variable_p_(_var_)) {return _var_;
} else {return _per_lookup_dash_variable_dash_reg(env,_var_);
}})()
;
});
var _per_lookup_dash_variable_dash_reg = (function(env,_var_){
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
var namespaced_dash_function_dash_name = (function(env,name){
return (function() {if(list_p_(env)) {return ((function() {var o65 = (function(frame,def){
return (function() {if(def) {return string_dash__gt_symbol(str(generate_dash_global_dash_name(env),"-",name));
} else {return namespaced_dash_function_dash_name(cdr(env),name);
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
var generate_dash_global_dash_name = (function(env){
return (function() {if(null_p_(env)) {return false;
} else {return (function() {if(null_p_(cdr(env))) {return frame_dash_enclosing_dash_function(car(env));
} else {return str(generate_dash_global_dash_name(cdr(env)),"-",frame_dash_enclosing_dash_function(car(env)));
}})()
;
}})()
;
});
var save_dash_function_dash_def_excl_ = (function(env,name,def){
return ((function() {var o68 = (function(frame,vf_star_,vf_dash_def){
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
var o69 = car(env);
var o70 = frame_dash_funcs(o69);
var o71 = dict_dash_ref(o70,name);
return o68(o69,o70,o71);
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
var all_dash_regs = list("\uFDD1A","\uFDD1B","\uFDD1C","\uFDD1X","\uFDD1Y","\uFDD1Z","\uFDD1I");
var r_dash_init_dash_template = list(make_dash_frame(_emptylst,"\uFDD1global"));
true;
true;
true;
var r_dash_init_dash_make = (function() {return ((function() {var o89 = (function(frame_dash_template,frame){
set_dash_frame_dash_funcs_excl_(frame,dict_dash_map((function(x){
return x;
}),frame_dash_funcs(frame_dash_template)));
return list(frame);
});
var o90 = top_dash_frame(r_dash_init_dash_template);
var o91 = make_dash_frame(keys(frame_dash_vars(o90)),frame_dash_enclosing_dash_function(o90));
return o89(o90,o91);
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
return ((function() {var o92 = (function(native_p_){
return list("\uFDD1FUNCTION",name,args,env,body,native_p_);
});
var o93 = (function() {if(null_p_(native_p_)) {return false;
} else {return car(native_p_);
}})()
;
return o92(o93);
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
return ((function() {var o94 = (function(_var_){
return (function() {if(_var_) {return list("\uFDD1VARIABLE-REF",v);
} else {return ((function() {var o96 = (function(f){
return (function() {if(f) {return list("\uFDD1FUNCTION-REF",f);
} else {throw(str("undefined variable: ",v));
}})()
;
});
var o97 = lookup_dash_function(env,v);
return o96(o97);
}))();
}})()
;
});
var o95 = lookup_dash_variable(env,v);
return o94(o95);
}))();
});
var compile_dash_deref = (function(exp,env){
return ((function() {var o98 = (function(v){
(function() {if(not((number_p_(v) || symbol_p_(v)))) {throw(str("can't deref expression: ",v));
} else {return false;
}})()
;
return make_dash_deref(compile_star_(v,env));
});
var o99 = vector_dash_ref(exp,0);
return o98(o99);
}))();
});
var compile_dash_quoted = (function(exp){
return make_dash_const(exp);
});
var compile_dash_definition = (function(e,e_star_,env){
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o100 = (function(name){
add_dash_func_dash_to_dash_frame(top_dash_frame(env),name);
return ((function() {var o102 = (function(fenv){
return ((function() {var o104 = (function(def){
return save_dash_function_dash_def_excl_(env,name,def);
});
var o105 = make_dash_function_dash_def(name,cdr(e),fenv,compile_dash_sequence(e_star_,fenv));
return o104(o105);
}))();
});
var o103 = extend_dash_environment(env,cdr(e),name);
return o102(o103);
}))();
});
var o101 = car(e);
return o100(o101);
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
return ((function() {var o106 = (function(res,v){
(function() {if(not(v)) {throw(str("undefined variable: ",_var_));
} else {return false;
}})()
;
return make_dash_set(v,env,res);
});
var o107 = compile_star_(exp,env);
var o108 = lookup_dash_variable(env,_var_);
return o106(o107,o108);
}))();
});
var compile_dash_conditional = (function(cnd,exp,alt,env){
return make_dash_if(compile_star_(cnd,env),compile_star_(exp,env),(alt && compile_star_(alt,env)));
});
var compile_dash_sequence = (function(e_star_,env){
var begin_p_ = (function(e){
return (list_p_(e) && _eq__eq_(car(e),"\uFDD1begin"));
});
return (function() {if(list_p_(e_star_)) {return ((function() {var o109 = (function(exp){
return (function() {if(list_p_(cdr(e_star_))) {return ((function() {return (function() {if(begin_p_(exp)) {return list_dash_append;
} else {return cons;
}})()
(compile_star_(exp,env),compile_dash_sequence(cdr(e_star_),env));
}))();
} else {return ((function() {var o111 = (function(e){
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
var o112 = compile_star_(exp,env);
return o111(o112);
}))();
}})()
;
});
var o110 = car(e_star_);
return o109(o110);
}))();
} else {return _emptylst;
}})()
;
});
var compile_dash_application = (function(v,a_star_,env){
return ((function() {var o113 = (function(frame,vars){
(function() {if(not((register_p_(v) || label_p_(v)))) {throw(str("cannot apply to non-function type: ",v));
} else {return false;
}})()
;
return ((function() {var o116 = (function(f,args){
(function() {if(not(f)) {throw(str("undefined variable: ",v));
} else {return false;
}})()
;
return make_dash_application(env,f,args);
});
var o117 = (lookup_dash_variable(env,v) || lookup_dash_function(env,v));
var o118 = map((function(a){
(function() {if((list_p_(a) && _eq__eq_(car(a),"\uFDD1set!"))) {throw(str("bad function value: ",a));
} else {return false;
}})()
;
return compile_star_(a,env);
}),a_star_);
return o116(o117,o118);
}))();
});
var o114 = top_dash_frame(env);
var o115 = frame_dash_vars(o114);
return o113(o114,o115);
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
return ((function() {var o119 = (function(hoisted){
return (function() {if(null_p_(car(hoisted))) {return cadr(hoisted);
} else {return (function() {if(null_p_(cadr(hoisted))) {return car(hoisted);
} else {return cons(car(hoisted),cadr(hoisted));
}})()
;
}})()
;
});
var o120 = _per_hoist(exp);
return o119(o120);
}))();
});
var _per_hoist = (function(exp){
var reconstruct = (function(func,e_star_){
return make_dash_function_dash_def(function_dash_name(func),function_dash_args(func),function_dash_env(func),reverse(e_star_));
});
return (function() {if((literal_p_(exp) || symbol_p_(exp) || vector_p_(exp) || dict_p_(exp))) {return ((function() {return list(exp,_emptylst);
}))();
} else {return (function() {if(function_dash_def_p_(exp)) {return ((function() {return ((function() {var o121 = (function(r){
return list(_emptylst,cons(reconstruct(exp,reverse(car(r))),cadr(r)));
});
var o122 = _per_hoist(function_dash_body(exp));
return o121(o122);
}))();
}))();
} else {return ((function() {return fold((function(el,acc){
return ((function() {var o123 = (function(r){
return list((function() {if(null_p_(car(r))) {return car(acc);
} else {return list_dash_append(car(acc),list(car(r)));
}})()
,list_dash_append(cadr(acc),cadr(r)));
});
var o124 = _per_hoist(el);
return o123(o124);
}))();
}),list(_emptylst,_emptylst),exp);
}))();
}})()
;
}})()
;
});
var allocate = (function(e_star_){
for_dash_each((function(e){
return (function() {if(function_dash_def_p_(e)) {return _per_allocate(e);
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
return ((function() {var o125 = (function(x,v){
return (function() {if(target) {return list(list("\uFDD1SET",target,list_dash__gt_vector(list(v))));
} else {return vector(v);
}})()
;
});
var o126 = deref_dash_value(exp);
var o127 = (function() {if(const_p_(o126)) {return const_dash_value(o126);
} else {return o126;
}})()
;
return o125(o126,o127);
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
return (function() {if(_eq__eq_(car(e),"\uFDD1VARIABLE-REF")) {return ((function() {return ((function() {var o128 = (function(v,r){
(function() {if(not(r)) {throw("error, register not assigned");
} else {return false;
}})()
;
return r;
});
var o129 = cadr(e);
var o130 = lookup_dash_variable_dash_reg(env,o129);
return o128(o129,o130);
}))();
}))();
} else {return (function() {if(_eq__eq_(car(e),"\uFDD1FUNCTION-REF")) {return ((function() {return namespaced_dash_function_dash_name(env,cadr(e));
}))();
} else {return ((function() {return false;
}))();
}})()
;
}})()
;
}));
});
var linearize_dash_function = (function(exp){
return ((function() {var o131 = (function(env,replaced){
return list_dash_append(list(namespaced_dash_function_dash_name(env,function_dash_name(exp))),((function() {var o135 = (function(o134){
return (function() {if(vector_p_(o134)) {return vector_dash__gt_list(o134);
} else {return o134;
}})()
;
});
var o136 = linearize(function_dash_body(replaced));
return o135(o136);
}))(),list(list("\uFDD1SET","\uFDD1PC","\uFDD1POP")));
});
var o132 = function_dash_env(exp);
var o133 = replace_dash_variable_dash_refs(exp,o132);
return o131(o132,o133);
}))();
});
var linearize_dash_assignment = (function(exp){
return ((function() {var o137 = (function(_var_,reg,v){
return linearize(v,reg);
});
var o138 = set_dash_name(exp);
var o139 = lookup_dash_variable_dash_reg(set_dash_env(exp),o138);
var o140 = set_dash_value(exp);
return o137(o138,o139,o140);
}))();
});
var linearize_dash_constant = (function(exp,target){
return (function() {if(target) {return list(list("\uFDD1SET",target,const_dash_value(exp)));
} else {return _emptylst;
}})()
;
});
var linearize_dash_if = (function(exp,target){
return ((function() {var o141 = (function(exit_dash_label,alt_dash_label){
return list_dash_append(linearize(if_dash_cnd(exp),"\uFDD1J"),list_dash_append(list(list("\uFDD1IFE","\uFDD1J",0),list("\uFDD1SET","\uFDD1PC",alt_dash_label)),((function() {var o145 = (function(o144){
return (function() {if(vector_p_(o144)) {return vector_dash__gt_list(o144);
} else {return o144;
}})()
;
});
var o146 = linearize(if_dash_tru(exp),target);
return o145(o146);
}))(),list(list("\uFDD1SET","\uFDD1PC",exit_dash_label),alt_dash_label),((function() {var o148 = (function(o147){
return (function() {if(vector_p_(o147)) {return vector_dash__gt_list(o147);
} else {return o147;
}})()
;
});
var o149 = (function() {if(if_dash_alt(exp)) {return linearize(if_dash_alt(exp),target);
} else {return _emptylst;
}})()
;
return o148(o149);
}))(),list(exit_dash_label)));
});
var o142 = string_dash__gt_symbol(str("exit-",gensym()));
var o143 = string_dash__gt_symbol(str("alt-",gensym()));
return o141(o142,o143);
}))();
});
var linearize_dash_arg = (function(exp,reg,used_dash_regs){
return (function() {if((application_p_(exp) || if_p_(exp))) {return list_dash_append(map((function(r){
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
} else {return ((function() {var o153 = (function(_var_,reg,exp){
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
var o154 = car(a_star_);
var o155 = dict_dash_ref(arg_dash_regs,o154);
var o156 = dict_dash_ref(arg_dash_values,o154);
return o153(o154,o155,o156);
}))();
}})()
;
});
var o150 = keys(arg_dash_values);
var o151 = _emptylst;
var o152 = _emptylst;
return trampoline(loop(o150,o151,o152));
}))();
});
var optimized_dash_native_dash_application_p_ = (function(exp){
return ((function() {var o157 = (function(env,def){
return (function_dash_native_p_(def) && fold((function(arg,acc){
return (acc && (const_p_(arg) || symbol_p_(arg) || deref_p_(arg)));
}),true,application_dash_args(exp)));
});
var o158 = application_dash_env(exp);
var o159 = lookup_dash_function_dash_def(o158,application_dash_name(exp));
return o157(o158,o159);
}))();
});
var linearize_dash_native_dash_application = (function(exp){
return ((function() {var o160 = (function(env,def,fenv,arg_dash_regs,args){
return list(list_dash_append(list(application_dash_name(exp)),((function() {var o167 = (function(o166){
return (function() {if(vector_p_(o166)) {return vector_dash__gt_list(o166);
} else {return o166;
}})()
;
});
var o168 = map((function(a){
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
return o167(o168);
}))()));
});
var o161 = application_dash_env(exp);
var o162 = lookup_dash_function_dash_def(o161,application_dash_name(exp));
var o163 = function_dash_env(o162);
var o164 = frame_dash_vars(top_dash_frame(o163));
var o165 = application_dash_args(exp);
return o160(o161,o162,o163,o164,o165);
}))();
});
var linearize_dash_application = (function(exp,target){
return ((function() {var o169 = (function(env,def,fenv,regs,arg_dash_regs,args){
(function() {if(not(_eq__eq_(length(keys(args)),length(keys(arg_dash_regs))))) {return ((function() {var o176 = (function(argv){
throw(str("wrong number of arguments: (",application_dash_name(exp)," ",argv["join"](" "),")"));
});
var o177 = list_dash__gt_vector(map(str,args));
return o176(o177);
}))();
} else {return false;
}})()
;
return list_dash_append(fold((function(r,acc){
return (function() {if(not(_eq__eq_(r,target))) {return cons(list("\uFDD1SET","\uFDD1PUSH",r),acc);
} else {return acc;
}})()
;
}),_emptylst,regs),linearize_dash_arguments(args,arg_dash_regs),(function() {if(function_dash_native_p_(def)) {return list(list_dash_append(list(application_dash_name(exp)),((function() {var o179 = (function(o178){
return (function() {if(vector_p_(o178)) {return vector_dash__gt_list(o178);
} else {return o178;
}})()
;
});
var o180 = map((function(a){
return dict_dash_ref(arg_dash_regs,a);
}),function_dash_args(def));
return o179(o180);
}))()));
} else {return cons(list("\uFDD1JSR",application_dash_full_dash_name(env,exp)),(function() {if((target && not(_eq__eq_(target,"\uFDD1J")))) {return list(list("\uFDD1SET",target,"\uFDD1J"));
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
var o170 = application_dash_env(exp);
var o171 = lookup_dash_function_dash_def(o170,application_dash_name(exp));
var o172 = function_dash_env(o171);
var o173 = fold((function(el,acc){
return (function() {if(not(_eq__eq_(el,"\uFDD1not-allocated"))) {return cons(el,acc);
} else {return acc;
}})()
;
}),_emptylst,vals(frame_dash_vars(top_dash_frame(o170))));
var o174 = frame_dash_vars(top_dash_frame(o172));
var o175 = zip(function_dash_args(o171),application_dash_args(exp));
return o169(o170,o171,o172,o173,o174,o175);
}))();
});
var linearize = (function(exp){
var target = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o181 = (function(target){
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
var o183 = exp;
var o184 = _emptylst;
return trampoline(loop(o183,o184));
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
var o182 = (function() {if(null_p_(target)) {return false;
} else {return car(target);
}})()
;
return o181(o182);
}))();
});
var compile = (function(exp){
r_dash_init_dash_initialize_excl_();
return allocate(hoist(compile_star_(exp,r_dash_init)));
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
} else {return (function() {if(symbol_p_(v)) {return ((function() {v = v["replace"](RegExp("-","g"),"_dash_");
v = v["replace"](RegExp("\\?","g"),"_p_");
v = v["replace"](RegExp("\\!","g"),"_excl_");
v = v["replace"](RegExp(">","g"),"_gt_");
v = v["replace"](RegExp("<","g"),"_lt_");
v = v["replace"](RegExp("%","g"),"_per_");
v = v["replace"](RegExp("=","g"),"_eq_");
v = v["replace"](RegExp("\\/","g"),"_slash_");
v = v["replace"](RegExp("\\+","g"),"_plus_");
v = v["replace"](RegExp("\\*","g"),"_star_");
return v;
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
return (function() {if(list_p_(e)) {return ((function() {return ((function() {var o185 = (function(ln){
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
var o186 = length(e);
return o185(o186);
}))();
}))();
} else {return (function() {if(symbol_p_(e)) {return ((function() {return println(str_star_(":",e));
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
return ((function() {var o187 = (function(stripped){
return pp(stripped);
});
var o188 = strip_dash_envs(exp);
return o187(o188);
}))();
});
((function() {var o189 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1SET");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1SET",make_dash_function_dash_def("\uFDD1SET",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o190 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1SET");
return o189(o190);
}))();
((function() {var o191 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1ADD");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1ADD",make_dash_function_dash_def("\uFDD1ADD",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o192 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1ADD");
return o191(o192);
}))();
((function() {var o193 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1SUB");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1SUB",make_dash_function_dash_def("\uFDD1SUB",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o194 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1SUB");
return o193(o194);
}))();
((function() {var o195 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1MUL");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1MUL",make_dash_function_dash_def("\uFDD1MUL",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o196 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1MUL");
return o195(o196);
}))();
((function() {var o197 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1DIV");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1DIV",make_dash_function_dash_def("\uFDD1DIV",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o198 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1DIV");
return o197(o198);
}))();
((function() {var o199 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1MOD");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1MOD",make_dash_function_dash_def("\uFDD1MOD",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o200 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1MOD");
return o199(o200);
}))();
((function() {var o201 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1SHL");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1SHL",make_dash_function_dash_def("\uFDD1SHL",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o202 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1SHL");
return o201(o202);
}))();
((function() {var o203 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1SHR");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1SHR",make_dash_function_dash_def("\uFDD1SHR",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o204 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1SHR");
return o203(o204);
}))();
((function() {var o205 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1AND");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1AND",make_dash_function_dash_def("\uFDD1AND",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o206 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1AND");
return o205(o206);
}))();
((function() {var o207 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1BOR");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1BOR",make_dash_function_dash_def("\uFDD1BOR",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o208 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1BOR");
return o207(o208);
}))();
((function() {var o209 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1XOR");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1XOR",make_dash_function_dash_def("\uFDD1XOR",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o210 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1XOR");
return o209(o210);
}))();
((function() {var o211 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1IFE");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1IFE",make_dash_function_dash_def("\uFDD1IFE",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o212 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1IFE");
return o211(o212);
}))();
((function() {var o213 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1IFN");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1IFN",make_dash_function_dash_def("\uFDD1IFN",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o214 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1IFN");
return o213(o214);
}))();
((function() {var o215 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1IFG");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1IFG",make_dash_function_dash_def("\uFDD1IFG",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o216 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1IFG");
return o215(o216);
}))();
((function() {var o217 = (function(env){
add_dash_func_dash_to_dash_frame(top_dash_frame(r_dash_init_dash_template),"\uFDD1IFB");
allocate_dash_registers(env,list("\uFDD1x","\uFDD1y"));
return save_dash_function_dash_def_excl_(r_dash_init_dash_template,"\uFDD1IFB",make_dash_function_dash_def("\uFDD1IFB",list("\uFDD1x","\uFDD1y"),env,_emptylst,true));
});
var o218 = extend_dash_environment(r_dash_init_dash_template,list("\uFDD1x","\uFDD1y"),"\uFDD1IFB");
return o217(o218);
}))();
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
var target = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o219 = (function(target,exp,lib,exp){
var code = list_dash_append(list("\uFDD1begin"),((function() {var o225 = (function(o224){
return (function() {if(vector_p_(o224)) {return vector_dash__gt_list(o224);
} else {return o224;
}})()
;
});
var o226 = cdr(lib);
return o225(o226);
}))(),list(list_dash_append(list("\uFDD1define",list("\uFDD1entry")),((function() {var o228 = (function(o227){
return (function() {if(vector_p_(o227)) {return vector_dash__gt_list(o227);
} else {return o227;
}})()
;
});
var o229 = cdr(exp);
return o228(o229);
}))())));
return (function() {if(list_dash_find(list("\uFDD1expand"),target)) {return ((function() {return expand(code);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1compile-phase1"),target)) {return ((function() {r_dash_init_dash_initialize_excl_();
return compile_star_(expand(code),r_dash_init);
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1compile-phase2"),target)) {return ((function() {return compile(expand(code));
}))();
} else {return (function() {if(list_dash_find(list("\uFDD1linearize"),target)) {return ((function() {return linearize(compile(expand(code)));
}))();
} else {return ((function() {return output(list(list("\uFDD1JSR","\uFDD1global-entry"),list("\uFDD1SET","\uFDD1PC","\uFDD1__exit")),linearize(compile(expand(code))),list("\uFDD1__exit",list("\uFDD1SET","\uFDD1PC","\uFDD1__exit")));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
});
var o220 = (function() {if(null_p_(target)) {return false;
} else {return car(target);
}})()
;
var o221 = read(src);
var o222 = read(fs["readFileSync"]("lib.ol","utf-8"));
var o223 = (function() {if((list_p_(o221) && _eq__eq_(car(o221),"\uFDD1begin"))) {return o221;
} else {return list("\uFDD1begin",o221);
}})()
;
return o219(o220,o221,o222,o223);
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
var print_dash_linearized = (function(src){
return pp(compile_dash_program(src,"\uFDD1linearize"));
});
module["exports"] = dict("\uFDD1compile",compile_dash_program,"\uFDD1print-expand",print_dash_expand,"\uFDD1print-compiled-phase1",print_dash_compiled_dash_phase1,"\uFDD1print-compiled-phase2",print_dash_compiled_dash_phase2,"\uFDD1print-linearized",print_dash_linearized);

