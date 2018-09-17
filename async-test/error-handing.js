// async 错误处理
function createPromise(needCatch) {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error happen in createPrimise');
    }, 500)
  });
  return needCatch ? p.catch(err => {
    console.log('Catch in createPrimise: ', err); // Catch in createPrimise:  Error happen in createPrimise
    return err;
  }) : p;
}

// try catch捕获
async function errHandingInAsync() {
  let n;
  try {
    n = await createPromise(false);
  } catch (e) {
    n = e;
  }
  console.log('Catch in errHandingInAsync [try catch]: ', n); // Catch in errHandingInAsync [try catch]:  Error happen in createPrimise
  return n;
}


// Promise 内部捕获
async function errHandingInAsync2() {
  let n;
  n = await createPromise(true);
  console.log('Console in errHandingInAsync2: ', n); // Console in errHandingInAsync2:  Error happen in createPrimise
  return n;
}

// errHandingInAsync().then(res => console.log('Console in errHandingInAsync [then]: ', res));  // Console in errHandingInAsync [then]:  Error happen in createPrimise
// errHandingInAsync2().then(res => console.log('Console in errHandingInAsync2 [then]: ', res));   // Console in errHandingInAsync2 [then]:  Error happen in createPrimise

// Generator
function* errHandingInGenerator() {
  let n;
  yield createPromise(false);
  n = yield createPromise(true);
  yield createPromise(false);
  return n;
}

function g() {
  let g = errHandingInGenerator();
  while (true) {
    let step = g.next();
    if (!step.done) {
      step.value.catch(e => console.log('Catch in Generator [catch]: ', e)); // Catch in Generator [catch]:  Error happen in createPrimise
      step = g.next();
    } else {
      break;
    }
  }
}
// g();

function* Gen() {
  try {
    yield;
  } catch (e) {
    console.log('Catch in Gen: ', e);   // Catch in Gen:  throw with Genetor
  }
}

let gen = Gen();
gen.next();
gen.throw('throw with Genetor');