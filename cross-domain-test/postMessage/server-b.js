const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
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

server.listen(50008, '0.0.0.0', () => {
  console.log('server running at port 50008');
})