var promisesAplusTests = require("promises-aplus-tests");

// var Promise = require('./rewrite-promise');

// var Promise = require('./promise1');

var Promise = require("./promise-polyfill");

// var Promise = require('./promise-polyfill2');

// var p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(1)
//   }, 1000)
// })
// p.then(undefined, undefined).then(null, console.log)

Promise.race([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  }).then(res => {
    console.log(res);
    // return res;
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 3000);
  }).then(res => {
    console.log(res);
    return res;
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  }).then(res => {
    console.log(res);
    return res;
  })
])
  .then(res => {
    console.log("finish: ", res);
  })
  .catch(e => {
    console.log("Error: ", e);
  }).then(res => {console.log(res)}).finally(res => {console.log('finally: ', res)});

// // test Promises/A+ specification
// promisesAplusTests(Promise);
