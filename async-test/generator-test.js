// Generator
function* foo() {
  let a = yield 1;
  console.log(a); // 6
  let b = yield(i) => {
    console.log(i);
  };
  console.log(b); // 7
  let c = yield 3;
  return b;
}
// let f = foo()
// console.log(f.next(5));   // { value: 1, done: false }
// console.log(f.next(6));   // { value: [Function], done: false }
// console.log(f.next(7));   // { value: 3, done: false }
// console.log(f.next(8));   // { value: 7, done: false }
// console.log(f.next(9));   // { value: undefined, done: true }


// for of 遍历Generator
let gen = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  return 5;
}
let arr = [];
for (let i of gen()) {
  arr.push(i);
}
// console.log(arr)    // [ 1, 2, 3, 4 ]    

// Generator 自执行函数
function spawn(genF) {
  let p = new Promise((resolve, reject) => {
    let step = (nextF) => {
      let next;
      try {
        next = nextF();
      } catch (e) {
        reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value)
        .then(v => step(() => {
          console.log(v);
          return gen.next(v)
        }))
        .catch(e => step(() => gen.throw(e)));
    }
    const gen = genF();
    step(() => gen.next());
  })
  return p.then(console.log).catch(console.log);
}

// spawn(gen);

let gg = function* () {
  setTimeout(function* () {
    yield  1
  }, 500);
  setTimeout(function* () {
    yield  2
  }, 500);
  yield setTimeout(() => {
    return 3
  }, 500);
  return 4
}
// spawn(gg)

// let g = gen();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());

// let p = new Promise((resolve, reject) => {
//   let step = (nextF) => {
//     let next;
//     try {
//       next = nextF();
//     } catch (e) {
//       reject(e)
//     }
//     if (next.done) {
//       resolve(next.value)
//     } else {
//       console.log(next.value);
//       // Promise.resolve(next.value).then(v => step(() => g.next(v))).catch(e => step(() => g.throw(e)))
//       Promise.resolve(next.value)
//         .then(v => step(() => {
//           console.log(v);
//           return g.next(v)
//         }))
//         .catch(e => step(() => {
//           return g.throw(e)
//         }));
//     }
//   }
//   let g = gen();
//   step(() => g.next(undefined));
// })

// p.then(console.log).catch(console.log);

function* GGGG() {
  let a,b,c;
  a = yield 1;
  console.log(a);
  b = yield 2;
  console.log(b);
  c = yield 3;
  console.log(c);
  return 4;
}

let gggg = GGGG();
console.log(gggg.next(5))
console.log(gggg.next(6))
console.log(gggg.next(7))
console.log(gggg.next(8))
console.log(gggg.next(9))