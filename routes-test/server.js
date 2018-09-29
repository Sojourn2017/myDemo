let http = require('http');
let url = require('url');
let fs = require('fs');
let mime={
  '.js':'application/javascript',
  '.css':'text/css',
  '.html': 'text/html'
}


let server = http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname;
  fs.readFile(__dirname + pathName, (err, data) => {
    if (err) {
      fs.readFile('./history/history.html', (err, data) => {
        if (err) {
          res.writeHead(404, {
            'content-type': mime[req.url.match(/\.\w+$/) ? req.url.match(/\.\w+$/)[0] : 'html'] +';charset=utf-8'
          })

          res.end('404 Not Found');
        } else {
          res.writeHead(200,{
            'content-type': mime[req.url.match(/\.\w+$/) ? req.url.match(/\.\w+$/)[0] : 'html'] +';charset=utf-8'
          })
    
          res.end(data);
        }
      })
    } else {
      res.writeHead(200,{
        'content-type': mime[req.url.match(/\.\w+$/) ? req.url.match(/\.\w+$/)[0] : 'html'] +';charset=utf-8'
      })

      res.end(data);
    }
  })
});

server.listen(50002, '0.0.0.0', () => {
  console.log('server running at port 50002');
})