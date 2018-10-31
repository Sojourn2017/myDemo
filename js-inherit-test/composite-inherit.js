/**
 * 组合继承
 * 使用原型链继承原型的属性和方法
 * 使用构造函数继承实例的属性
 */
function SuperClass() {
  this.origin = "super";
  this.nums = [4, 5, 6];
}

SuperClass.prototype.sayOrigin = function () {
  console.log(this.origin)
}

function SubClass(age) {
  // 继承实例属性
  SuperClass.call(this);
  this.age = age;
}

// 继承原型链上的方法与素性
SubClass.prototype = new SuperClass()

// 使constructor指向SubClass
SubClass.prototype.constructor = SubClass;

SubClass.prototype.sayAge = function () {
  console.log(this.age);
}

var instance1 = new SubClass(12); // SubClass { origin: 'super', nums: [ 4, 5, 6, 7 ], age: 12 }
var instance2 = new SubClass(34); // SubClass { origin: 'super', nums: [ 4, 5, 6 ], age: 34 }

instance1.nums.push(7);

console.log(instance1);

console.log(instance2);

// SubClass的实例可以使用SubClass与SuperClass中的方法
instance1.sayOrigin() // super
instance1.sayAge() // 12

/**
 * 缺点：
 * 使用子类创建实例对象时，其原型中会存在两份相同的属性/方法
 */
console.log(instance1.__proto__)  // SubClass { origin: 'super', nums: [ 4, 5, 6 ], constructor: [Function: SubClass], sayAge: [Function] }
