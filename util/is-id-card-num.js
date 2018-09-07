/**
* @desc： Check weather the string is a ip card number.
* @param {String} str
* @return {Boolean}
*/
function isIdNum(str) {
  var s = str.toString();
  var f = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
  var p = [ 1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2 ];
  var reg_18 = /^\ *([1-9]\d{5}[12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{3}[0-9Xx])\ *$/;
  var reg_15 = /^\ *([1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{3})\ *$/;
  if (reg_18.test(s)) {
    s = reg_18.exec(s)[1];
    var sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += s[i] * f[i];
    }
    return p[sum % 11] == s[17].toLowerCase() ? true : false;
  } else {
    return reg_15.test(s);
  }
}

// export {
//   isIdNum as isIdNum
// }