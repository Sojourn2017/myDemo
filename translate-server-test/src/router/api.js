import ts from "../util/translate";
import fs from "fs";
import writeLog from "../util/writeLog";
import getClientIP from "../util/getClientIP";

const API = {};

/**
 * 首页
 */

API["/"] = API["/index"] = function(
  req,
  res,
  pathName = "/index.html",
  contextType = "text/html"
) {
  fs.readFile("./src/static" + pathName, (err, data) => {
    if (err) {
      writeLog("indexPage error: " + err, 1);

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
  let chunks = [];
  let size = 0;
  req.on("data", function(chunk) {
    chunks.push(chunk);
    size += chunk.length;
  });

  req.on("end", async function() {
    let buf = Buffer.concat(chunks, size);
    let str = buf.toString("utf8");
    writeLog(`${getClientIP(req)} translate params: ${str} `);

    let params = JSON.parse(str);
    
    let queryResult = {};
    try {
      await ts
        .translate(params, params.engine)
        .then(result => {
          queryResult = Object.assign(queryResult, result);
        })
        .catch(err => {
          writeLog("translate error: " + err, 1);
        });
    } catch (e) {
      writeLog("translate error: " + err, 1);
    }

    res.writeHead(200, {
      "content-type": `application/json; charset="utf-8`
    });
    res.end(JSON.stringify(queryResult));
  });
};

API["/audio"] = function(req, res) {
  let chunks = [];
  let size = 0;
  req.on("data", function(chunk) {
    chunks.push(chunk);
    size += chunk.length;
  });

  req.on("end", async function() {
    let buf = Buffer.concat(chunks, size);
    let str = buf.toString("utf8");
    writeLog(`${getClientIP(req)} translate params: ${str} `);

    let params = JSON.parse(str);
    let queryResult = {};
    try {
      await ts
        .audio(params.text, params.engine)
        .then(uri => {
          queryResult = Object.assign(queryResult, {
            audioUri: uri
          });
        })
        .catch(err => {
          writeLog("audio error: " + err, 1);
        });
    } catch (e) {
      writeLog("audio error: " + err, 1);
    }

    res.writeHead(200, {
      "content-type": `application/json; charset="utf-8`
    });
    res.end(JSON.stringify(queryResult));
  });
};

export default API;
