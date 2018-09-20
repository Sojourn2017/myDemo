/**
 * @desc： Check weather the string is a mobile number.
 * @param {String} str
 * @return {Boolean}
 */
function isMoblie(str) {
  var s = str.toString().trim();
  var pat = /^1[34578]\d{9}$/g;
  return pat.test(s);
}

function isTel(str) {
  var s = str.toString().trim();
  var pat = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/g;
  return pat.test(s);
}

module.exports = {
  isMoblie: isMoblie,
  isTel: isTel
}