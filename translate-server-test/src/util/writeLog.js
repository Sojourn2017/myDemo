/**
 * 访问日志
 */

import fs from "fs";

function createDir(dirArr) {
  let createPathList = dirArr.filter(p => {
    return !fs.existsSync(p);
  });
  if (createPathList.length === 0) return;

  createPathList.forEach(p => {
    try {
      fs.mkdirSync(p);
    } catch (e) {
      console.log(e);
    }
  });
}

function writeErr(e) {
  let handleType = fs.existsSync('./logs/error.log') ? 'appendFile' : 'writeFile';
  fs[handleType]("./logs/error.log", `${new Date()}: ${e}\r\n`, e => {});
}

export default function(log, isWriteErr) {
  createDir(["./logs"]);
  let p = isWriteErr ? "./logs/error.log" : "./logs/log.log";
  let handleType = fs.existsSync(p) ? 'appendFile' : 'writeFile';
  fs[handleType](p, `${new Date()}: ${log} \r\n`, err => {
    if (err) {
      writeErr(err);
    }
  });
}
