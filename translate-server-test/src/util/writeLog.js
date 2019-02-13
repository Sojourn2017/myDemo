/**
 * 访问日志
 */ 
import fs from "fs";

function writeErr(e) {
  fs.appendFile("./src/log/error.txt", `${new Date()}: ${e}\r\n`, e => {});
}

export default function(log, isWriteErr) {
  let p = isWriteErr ? "./src/log/error.txt" : "./src/log/log.txt";
  fs.appendFile(p, `${new Date()}: ${log} \r\n`, err => {
    if (err) {
      writeErr(err);
    }
  });
}
