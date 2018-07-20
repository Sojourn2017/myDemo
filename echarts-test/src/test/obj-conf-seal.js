/**
 * 使用Object.seal()可以将对象密封
 * 密封对象不可扩展
 * 已有的属性成员[[configurable]]特性将被设置成false（意味着不能删除属性和方法，但是可修改已有属性值）
 */

let obj = {
  a: 'a',
  b: ['b']
};

Object.seal(obj);

// 非严格模式下静默失败
delete obj.a;
obj.c = 'c';
console.log(obj);   // { a: 'a', b: [ 'b' ] }

// 严格模式下抛出异常
try {
  try {
    (function add_d() {
      "use strict"
      obj.d = 'd';
    })();
  } catch (ex) {
    console.error("add_d:" + ex.message);   // add_d:Cannot add property d, object is not extensible
  } finally {
    (function delete_b() {
      "use strict"
      delete obj.b;
    })();
  }
} catch (ex) {
  console.error('delete_b: ' + ex.message);   // delete_b: Cannot delete property 'b' of #<Object>
}

// 通过Object.isSealed()方法可以判断对象是否被密封
let obj2 = {
  name: 'obj2'
};
console.log(Object.isSealed(obj));    // true
console.log(Object.isSealed(obj2));   // false

// 被封闭的对象同时不可扩展
console.log(Object.isExtensible(obj));    // false
console.log(Object.isExtensible(obj2));   // true