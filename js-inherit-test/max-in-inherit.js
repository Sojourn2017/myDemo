/**
 * 混入式继承
 * 继承多个对象的属性与方法
 */

function SuperClass1() {
  this.origin1 = "super1";
}

SuperClass1.prototype.sayOrigin1 = function() {
  console.log(this.origin1);
};

function SuperClass2() {
  this.origin2 = "super2";
}

SuperClass2.prototype.sayOrigin2 = function() {
  console.log(this.origin2);
};

function SubClass(age) {
  SuperClass1.call(this);
  SuperClass2.call(this);
  this.age = age;
}

// // 连接原型链
// SubClass.prototype = Object.create(SuperClass1.prototype);

// // 混合其他原型链
// Object.assign(SubClass.prototype, SuperClass2.prototype);

// SubClass.prototype.constructor = SubClass;

// SubClass.prototype.sayAge = function () {
//   console.log(this.age);
// }

Object.assign(
  SubClass.prototype,
  SuperClass1.prototype,
  SuperClass2.prototype,
  {
    constructor: {
      value: SubClass,
      enumerable: false,
      writable: true,
      configurable: true
    },
    sayAge: function() {
      console.log(this.age);
    }
  }
);

var instance = new SubClass(12);

console.log(instance); // SubClass { origin1: 'super1', origin2: 'super2', age: 12 }

console.log(instance.__proto__); // SubClass { sayOrigin1: [Function], sayOrigin2: [Function], sayAge: [Function: sayAge] }
