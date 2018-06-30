let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

let server = http.createServer((req,res) => {
  let pathName = url.parse(req.url).pathname;
  let rePathName = `./../file/${pathName}`;
  fs.readFile(rePathName,(err,data) => {
    console.log(rePathName);
    if (err) {
      res.writeHead(404,{
        'Context-Type': `text/html`
      })

      res.end('404 Not Found');
    } else {
      res.writeHead(200,{
        'Context-Tpye': `text/html`
      })

      res.end(data);
    }
  })
});

server.listen(10086,'0.0.0.0',() => {
  console.log('server running at port 10086');
})