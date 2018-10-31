/**
 * ES6 class 继承
 */
class SuperClass {
  constructor() {
    this.origin = "super";
    this.nums = [1, 2, 3];
  }
  sayOrigin() {
    console.log(this.origin);
  }
}

class SubClass extends SuperClass {
  constructor() {
    super();
    this.age = 12;
  }
  sayAge() {
    console.log(this.age);
  }
}

let instance1 = new SubClass();
let instance2 = new SubClass();

console.log(instance1); // SubClass { origin: 'super', nums: [ 1, 2, 3 ], age: 12 }
console.log(instance2); // SubClass { origin: 'super', nums: [ 1, 2, 3 ], age: 34 }

instance1.nums.push(4);

console.log(instance1); // SubClass { origin: 'super', nums: [ 1, 2, 3, 4 ], age: 12 }
console.log(instance2); // SubClass { origin: 'super', nums: [ 1, 2, 3 ], age: 34 }
