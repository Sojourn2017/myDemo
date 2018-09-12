// Generator
function* foo() {
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  let c = yield 3;
  // return b;
}

// for (let i of foo()) {
//   console.log(i);
// }

let f = foo()
console.log(f.next(5));
console.log(f.next(6));
console.log(f.next(7));
console.log(f.next(8));
console.log(f.next(9));