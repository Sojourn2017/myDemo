import api from "./router/api";
import http from "http";
import url from "url";
import writeLog from "./util/writeLog";
import getClientIP from './util/getClientIP';
import handleStatic from './util/handleStatic';

export default function Server() {
  http
    .createServer((req, res) => {
      // 写日志
      writeLog(`${getClientIP(req)} ${req.url} `);

      let pathName = url.parse(req.url).pathname.toLocaleLowerCase();

      // 判断静态资源
      var fileType = handleStatic(pathName);
      
      if (fileType) {
        api['/'](req, res, pathName, fileType);
      } else if (api[pathName]) {
        api[pathName](req, res);
      } else {
        res.writeHead(404, {
          "Context-Type": `application/json`
        });

        res.end("404 Not Found");
      }
    })
    .listen(50010, "0.0.0.0", () => {
      console.log("server running at port 50010");
    });
}
