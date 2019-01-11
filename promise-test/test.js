var promisesAplusTests = require("promises-aplus-tests");

// var myPromise = require('./rewrite-promise');

// var myPromise = require('./promise1');

var myPromise = require('./promise-polyfill');

// var myPromise = require('./promise-polyfill2');

var p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 1000)
})

p.then(undefined, undefined).then(null, console.log)

promisesAplusTests(myPromise);