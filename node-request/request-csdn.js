// 添加依赖
var request = require('request'); 
var urls = ['https://blog.csdn.net/weixin_40870788/article/details/80758830','https://blog.csdn.net/weixin_40870788/article/details/80745064','https://blog.csdn.net/weixin_40870788/article/details/80754665','https://blog.csdn.net/weixin_40870788/article/details/80758830','https://blog.csdn.net/weixin_40870788/article/details/80754665','https://blog.csdn.net/weixin_40870788/article/details/80758830','https://blog.csdn.net/weixin_40870788/article/details/80754665']; // 填写你需要刷的文章地址
var count = 0; // 刷了多少次
var len = urls.length; // 需要刷的文章篇数
var co = 0; // 为了循环刷新
setInterval(function() {
    count = count + 1;
    request(urls[co], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('成功 ' + count);
        // 每篇文章刷的次数=count/len
      }
        })
    co = co + 1;
    if (co == len) {
            co = 0;
    }
}, 15000); // 这里的5000 代表的 5*1000ms执行一次 