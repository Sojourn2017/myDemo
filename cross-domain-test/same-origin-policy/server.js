const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname;
  let p = './' + (pathName[1] ? pathName : 'A.html');
  fs.readFile(p, (err, data) => {
    if (err) {
      res.writeHead(404, {
        'content-type': 'text/html;charset=utf-8'
      })

      res.end('404 Not Found');
    } else {
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })

      res.end(data);
    }
  }) 
})

server.listen(50003, '0.0.0.0', () => {
  console.log('server running at port 50003');
})

const server2 = http.createServer((req, res) => {
  fs.readFile('./B.html', (err, data) => {
    if (err) {
      res.writeHead(404, {
        'content-type': 'text/html;charset=utf-8'
      })

      res.end('404 Not Found');
    } else {
      res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })

      res.end(data);
    }
  }) 
})

server2.listen(50004, '0.0.0.0', () => {
  console.log('server running at port 50004');
})