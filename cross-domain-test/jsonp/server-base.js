const http = require('http');
const url = require('url');
const fs = require('fs');
const mime={
  '.js':'application/javascript',
  '.css':'text/css',
  '.html': 'text/html',
  '.json': 'application/json'
}


let server = http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname;
  fs.readFile(__dirname + pathName, (err, data) => {
    if (err) {
      fs.readFile('./index.html', (err, data) => {
        if (err) {
          res.writeHead(404, {
            'content-type': mime[req.url.match(/(\.\w+)$/) ? RegExp.$1 : 'html'] +';charset=utf-8'
          })

          res.end('404 Not Found');
        } else {
          res.writeHead(200,{
            'content-type': mime[req.url.match(/(\.\w+)$/) ? RegExp.$1 : 'html'] +';charset=utf-8'
          })
    
          res.end(data);
        }
      })
    } else {
      res.writeHead(200,{
        'content-type': mime[req.url.match(/(\.\w+)$/) ? RegExp.$1 : 'html'] +';charset=utf-8'
      })

      res.end(data);
    }
  })
});

server.listen(50006, '0.0.0.0', () => {
  console.log('server running at port 50006');
})