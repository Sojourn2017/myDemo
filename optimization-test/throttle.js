/* 
 * @desc 节流函数 // 在指定时间内只会触发一次指定函数
 * @param {Function} f
 * @param {Number} delay
 */
// // 使用setTimeout
// function throttle(f, delay) {
//   var counting = false;
//   return function() {
//     if (counting) {
//       return;
//     }
//     var _this = this;
//     var _args = arguments;
//     counting = true;
//     setTimeout(function() {
//       counting = false;
//       f.apply(_this, _args);
//     }, delay);
//   }
// }

// 使用Date
function throttle(f, delay) {
  var prev = Date.now();
  return function () {
    var now = Date.now();
    if (delay > now - prev) {
      return;
    } else {
      prev = now;
      var _this = this;
      var _args = arguments;
      f.apply(_this, arguments);
    }
  }
}