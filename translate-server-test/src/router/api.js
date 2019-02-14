import ts from "../util/translate";
import fs from "fs";
import writeLog from "../util/writeLog";
import getClientIP from '../util/getClientIP';

const API = {};

/**
 * 首页
 */ 
API["/"] = API["/index"] = function(req, res, pathName = '/index.html', contextType = 'text/html') {
  fs.readFile('./src/static' + pathName, (err, data) => {
    if (err) {
      writeLog('indexPage error: ' + err, 1);

      res.writeHead(404, {
        "content-type": `text/plain`
      });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "content-type": contextType
      });
      res.end(data);
    }
  });
};

/**
 * 翻译接口
 */ 
API["/translate"] = function(req, res) {
  var chunks = [];
  var size = 0;
  req.on("data", function(chunk) {
    chunks.push(chunk);
    size += chunk.length;
  });

  req.on("end", async function() {
    var buf = Buffer.concat(chunks, size);
    var str = buf.toString("utf8");

    writeLog(`${getClientIP(req)} translate params: ${str} `);

    var queryResult;
    try {
      await ts
        .translate(JSON.parse(str).text, 'baidu')
        .then(result => {
          queryResult = result;
        })
        .catch(console.log);
    } catch (e) {
      writeLog('translate error: ' + err, 1);
    }

    res.writeHead(200, {
      "content-type": `application/json; charset="utf-8`
    });
    res.end(JSON.stringify(queryResult));
  });
};

export default API;
