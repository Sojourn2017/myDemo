/**
 * 原型链继承
 */
function SuperClass() {
  this.origin = "super";
  this.nums = [1, 2, 3];
}

SuperClass.prototype.sayOrigin = function() {
  console.log(this.origin);
};

function SubClass() {}

// 重写原型对象
SubClass.prototype = new SuperClass();

var instance = new SubClass();

instance.sayOrigin(); // super

/** 
 * 缺点：多个实例对引用类型的操作会被篡改
 */
SuperClass.prototype.sayArr = function() {
  console.log(this.nums);
};

var instance2 = new SubClass();

console.log(instance2.nums); // [1, 2, 3]

instance.nums.push(4);

console.log(instance2.nums); // [1, 2, 3, 4]
