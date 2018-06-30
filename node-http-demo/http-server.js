let http = require('http');

let server = http.createServer((req,res)=>{
  res.writeHead(200,{
    'Content-Type': 'text/plain',
    'author': 'sojourn'
   });

  res.end("hello world");
});

server.listen(3000,'0.0.0.0',()=>{
  console.log('server running at 3000 port.');
})