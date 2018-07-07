// 添加依赖
var request = require('request'); 
var urls = ['','']; // URL地址
var count = 0; // 访问次数
var len = urls.length; // URL地址数量
var co = 0; // 循环刷新
setInterval(function() {
    count = count + 1;
    request(urls[co], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('成功 ' + count);
      }
        })
    co = co + 1;
    if (co == len) {
            co = 0;
    }
}, 15000); // 这里的15000 代表的 15*1000ms执行一次 