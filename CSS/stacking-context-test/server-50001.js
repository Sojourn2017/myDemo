/* 
* 提供静态页面访问服务
*/

let http = require('http');
let url = require('url');
let fs = require('fs');

let server = http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname;

  let rePathName = `./${pathName}`;

  fs.readFile(rePathName,(err,data) => {

    if (err) {

      fs.readFile('./index.html',(err1,data1) => {
        if (err1) {
          res.writeHead(404,{
            'Context-Type': `text/html`
          })
          res.end('404 Not Found');
        } else {
          res.writeHead(200,{
            'Context-Tpye': `text/html`
          })
          res.end(data1);
        }
      })
    } else {
      res.writeHead(200,{
        'Context-Tpye': `text/html`
      })

      res.end(data);
    }
  })
});

server.listen(50001,'0.0.0.0',() => {
  console.log('server running at port 50001');
})