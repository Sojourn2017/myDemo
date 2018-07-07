// 添加依赖
var request = require('request'); 
var urls = ['https://blog.csdn.net'];
var count = 0;
var len = urls.length;
var co = 0;
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
}, 15000);