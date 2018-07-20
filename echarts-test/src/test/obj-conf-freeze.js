/**
 * 使用Object.freeze()方法可以冻结对象
 * 冻结对象（frozen object）既不可扩展，又是密封的，而且对象的[[writable]]特性会被设置为false
 * 如果定义[[Set]]函数，访问器属性仍然是可写的
 */

let obj = {
  a: 'a',
  b: ['b']
}

let obj2 = {
  name: 'obj2',
  val: 'hello'
}

// 使用set函数定义一个存取描述符
Object.defineProperty(obj, 'set_obj2', {
  configurable: true,
  enumerable: true,
  get: () => {
    return obj2.val;
  },
  set: (val) => {
    obj2.val = val;
  }
})
// 冻结对象
Object.freeze(obj);

// 非严格模式下静默失败
obj.c = 'c';
console.log(obj.c);   // undefined

delete obj.a;
console.log(obj.a);   // 'a'

obj.a = 'a2';
console.log(obj.a);   // 'a'

// [[set]]函数 访问器属性仍然可写
obj.set_obj2 = 'haha'
console.log(obj.set_obj2);    // 'haha'

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

// 仍然修改obj.b
try {
  (function change_b() {
    "use strict"
    obj.b.push('b2');
    console.log(obj.b);   // [ 'b', 'b2' ]
  })();
} catch (ex) {
  console.error('change_b: ' + ex.message);
}

// 使用Object.isFrozen()方法检测冻结对象
console.log(Object.isFrozen(obj));   // true
console.log(Object.isSealed(obj));   // true
console.log(Object.isExtensible(obj));   // false

console.log(Object.isFrozen(obj2));    // false
console.log(Object.isSealed(obj2));    // false
console.log(Object.isExtensible(obj2));    // true