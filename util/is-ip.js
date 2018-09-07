/**
* @desc： Check weather the string is a ip address.
* @param {String} str
* @return {Boolean}
*/
function isIp(str) {
  var s = str.toString();
  // ((0-9 | 10-99 | 100-199 | 200-249 | 250-255).)*3(0-9 | 10-99 | 100-199 | 200-249 | 250-255)
  var reg = /^\ *((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\ *$/;
  return reg.test(s);
}

// export {
//   checkIp as checkIp
// }