/**
 * 寄生组合式继承
 * 结合借用构造函数传递参数和寄生模式实现继承
 */
function inheritPrototype (subClass, superClass) {
  var pro = Object.create(superClass.prototype);
  pro.constructor = subClass;
  subClass.prototype = pro;
}

function SuperClass() {
  this.origin = "super";
  this.nums = [1, 2, 3];
}

SuperClass.prototype.sayOrigin = function() {
  console.log(this.origin);
};

function SubClass(age) {
  SuperClass.call(this);
  this.age = age;
}

inheritPrototype(SubClass, SuperClass);

SubClass.prototype.sayAge = function () {
  console.log(this.age);
}

var instance1 = new SubClass(12);
var instance2 = new SubClass(34);

console.log(instance1); // SubClass { origin: 'super', nums: [ 1, 2, 3 ], age: 12 }
console.log(instance1.__proto__); // SubClass { constructor: [Function: SubClass], sayAge: [Function] }
console.log(instance1.__proto__.__proto__) // SuperClass { sayOrigin: [Function] }

console.log(instance2); // SubClass { origin: 'super', nums: [ 1, 2, 3 ], age: 34 }
console.log(instance2.__proto__); // SubClass { constructor: [Function: SubClass], sayAge: [Function] }
console.log(instance2.__proto__.__proto__); // SuperClass { sayOrigin: [Function] }
