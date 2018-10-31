/**
 * 原型式继承
 * 借助一个空对象连接原型
 */
function linkTo(obj) {
  // 可用Object.create()代替
  function F() {}
  F.prototype = obj;
  return new F();
}

var superObj = {
  origin: "super",
  nums: [1, 2, 3]
};

var subObj = linkTo(superObj);
subObj.age = 12;

var instance1 = linkTo(subObj);
var instance2 = linkTo(subObj);


/**
 * 缺点：
 * 实例修改继承的引用类型属性时会互相影响(指向同一个引用类型)
 * 无法传递参数
 */
console.log(instance1.__proto__); // { age: 12 }
console.log(instance1.__proto__.__proto__); // { origin: 'super', nums: [ 1, 2, 3 ] }

instance1.nums.push(4);

console.log(instance1.__proto__.__proto__); // { origin: 'super', nums: [ 1, 2, 3, 4 ] }
console.log(instance2.__proto__.__proto__); // { origin: 'super', nums: [ 1, 2, 3, 4 ] }
