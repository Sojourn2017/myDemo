function bar() {
  return function () {
    // setTimeout(() => {
      console.log('bar');
    // }, 1000)
  }
}
function immediateResolve () {
  let p = new Promise((resolve, reject) => {
    resolve(bar())
  })
  return p;
}

// async 函数中 await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
async function foo() {
  let n = await bar();
  n();   // bar
  return 'foo';
}

foo().then(r => console.log('r: ', r)).catch(e => console.log('e: ', e));   // r: foo  

// foo中的await执行结果等价于immediateResolve
immediateResolve().then(response => response());   // bar