/**
 * 借用构造函数继承
 */
function SuperClass() {
  this.origin = "super";
  this.nums = [4, 5, 6];
}

SuperClass.prototype.sayOrigin = function() {
  console.log(this.origin);
};

function SubClass() {
  SuperClass.call(this);
}

var instance = new SubClass();

instance.nums.push(7);

console.log(instance); // SubClass { origin: 'super', nums: [ 4, 5, 6, 7 ] }

var instance2 = new SubClass();

console.log(instance2); // SubClass { origin: 'super', nums: [ 4, 5, 6 ] }

/**
 * 缺点：
 * 只能继承父类的实例属性和方法，不能继承原型属性/方法
 * 无法实现复用，每个子类都有父类实例函数的副本，影响性能
 */
// instance.sayOrigin(); // instance.sayOrigin is not a function
