const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  let query = url.parse(req.url).query;
  let arr = query ? query.split('&') : [];
  let params = {};
  let len = arr.length;
  let callback;
  arr.forEach((v, index) => {
    v.replace(/(.*?)=(.*)/g, (m, p1, p2) => {
      if (p1) {
        if (index == len - 1) {
          callback = p2;
          return;
        }
        params[p1] = p2;
      }
    })
  })
  console.log(params)
  res.writeHead(200, {
    'content-type': 'application/x-javascript'
  })
  res.end(`${callback}(${JSON.stringify({
    status: '200',
    msg: 'This is your params',
    data: params
  })})`);
});

server.listen(50005, '0.0.0.0', () => console.log('server running at port 50005'))