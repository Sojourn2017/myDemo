const http = require('http');
var fs = require('fs');
var path = require('path');

const hostname = '0.0.0.0';
const port = 3003;

let data = `create file test
success!`

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('123456\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

  fs.writeFile(path.join(path.resolve(__dirname, './'), "./output.txt"), data, function (err,doc) {
    if (err) {
      return console.log(err);
    } else {
      console.log(doc);
    }
  });
});


