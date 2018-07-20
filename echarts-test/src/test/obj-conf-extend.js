/**
 * 使用Object.preventExtensions()方法来阻止对象扩展
 * 不可扩展对象不能继续添加新属性与新方法
 * 可以修改原属性与原方法
 */

var obj = {
  a: 'a',
  b: ['b']
};

// 通过Object.preventExtensions()来阻止扩展
Object.preventExtensions(obj);

// 严格模式下报错，非严格模式下静默失败
obj.c = 'c';
console.log(obj);   // { a: 'a', b: [ 'b' ] }

function changeObj() {
  "use strict"
  obj.d = 'd';
  console.log(obj);
} 

try {
  changeObj();
} catch (ex) {
  console.error("error: " + ex.message);    // error: Cannot add property d, object is not extensible
}

// 仍可以修改已有的属性值
obj.a = 'c';
obj.b.push('b2');
console.log(obj);

// 使用Object.isExtensible()可以检测对象是否可扩展
var obj2 = {
  name: "obj2"
}
console.log(Object.isExtensible(obj));    // false
console.log(Object.isExtensible(obj2));    // true 


