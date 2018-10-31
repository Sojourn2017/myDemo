/**
 * 寄生式继承
 * 在原型式继承的基础上，增强对象
 */
function increaseObj(obj) {
  var clone = Object.create(obj);
  // 增强对象
  clone.sayOrigin = function () {
    console.log(this.origin);
  }
  return clone;
}

var superObj = {
  origin: "super",
  nums: [1, 2, 3]
};

var subObj = increaseObj(superObj);
var subObj2 = increaseObj(superObj);

/**
 * 缺点：
 * 实例修改继承的引用类型属性时会互相影响(指向同一个引用类型)
 * 无法传递参数
 */
console.log(subObj.__proto__); // { origin: 'super', nums: [ 1, 2, 3 ] }
console.log(subObj2.__proto__); // { origin: 'super', nums: [ 1, 2, 3 ] }

subObj.nums.push(4);

console.log(subObj.__proto__); // { origin: 'super', nums: [ 1, 2, 3, 4 ] }
console.log(subObj2.__proto__); // { origin: 'super', nums: [ 1, 2, 3, 4 ] }

subObj.sayOrigin(); // super
