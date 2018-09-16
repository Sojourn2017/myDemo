// 使用async 函数使异步操作更加简洁优雅
/** 
 * async 与 Generator函数的区别
 *  更好的语义
 *  内置执行器
 *  返回值是promise
*/

// 定义两个不同的异步操作
function getPage(page) {
  return createPromise(page).catch(err => 'err: ' + err)
}

function getList(params) {
  return createPromise(
    [1, 2, 3, 4, 5, 6],
    params,
    false,
    100
  ).then(res => res, err => err)
}
// 建立Promise
function createPromise(
  data,
  params = null,
  isSuccess = true,
  timeout = 1000
) {
  return new Promise((resolve, reject) => {
    let response = {
      data: data,
      params: params
    }
    setTimeout(() => {
      isSuccess ? resolve(response) : reject(response);
    }, timeout)
  })
}

// 发起异步请求
// 使用Promise
function dealWithPromise() {
  return new Promise((resolve, reject) => {
    getPage(100).then(res => {
      totalNum = res.data;
      console.log('Get page with Promise: ', totalNum);
      return getList(totalNum)
        .then(response => console.log('Get data with Promise: ', response))
        .catch(err => console.log('Get error with Promise: ', err));
    }).then(resolve).catch(reject);
  });
}
// 使用async
async function dealWithAsync() {
  let page = await getPage(100).catch(err => console.log('Get page error with async: ', err));
  console.log('Get page with async: ', page); // Get page with async:  { data: 100, params: null }
  let data = await getList(page.data);
  console.log('Get data with async: ', data); // Get data with async:  { data: [ 1, 2, 3, 4, 5, 6 ], params: 100 }
}    

// dealWithPromise();
// dealWithAsync();

// 处理并发
// Promise
function serialRequestWithPromise () {
  for (let i = 0; i < 3; i++) {
    createPromise(i).then(console.log).catch(console.log);
  }
}
// async
async function serialRequestWithAsync () {
  let req = [];
  let res = []
  for (let i = 0; i < 3; i++) {
    req.push(createPromise(i));
  }
  for (let i = 0; i < 3; i++) {
    res.push(await req[i]);
  }

  console.log(res);
}

// serialRequestWithPromise();
// serialRequestWithAsync();