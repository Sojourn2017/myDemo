/**
* @desc 验证电子邮箱格式.
* @param {String} str
* @return {Boolean}
*/
function isMail(str) {
  var s = str.toString();
  var pat = /^([0-9a-zA-Z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
  return pat.test(s);
}

// export {
//   checkIp as checkIp
// }

module.exports = {
  isMail: isMail
}