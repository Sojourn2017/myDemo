/* 
 * @desc 防抖函数 // 触发间隔超过指定时间后触发指定函数
 * @param {Function} f
 * @param {Number} delay
 * @param {Boolean} isImmediate
 */
function debounce(f, delay, isImmediate) {
  // argument validation
  if (f !== undefined && typeof f !== 'function') {
    throw TypeError(f + ' is not a function');
  }
  if (delay !== undefined && typeof delay !== 'number') {
    throw TypeError(delay + ' is not a number');
  }
  if (isImmediate !== undefined && typeof isImmediate !== 'boolean') {
    throw TypeError(isImmediate + ' is not a boolean');
  }

  var timer = null;
  return function () {
    var _this = this;
    var _args = [].slice.call(arguments);
    clearTimeout(timer);
    timer = setTimeout(function () {
      f.apply(_this, _args);
    }, delay)
    if (isImmediate) {
      f.apply(_this, _args);
    }
  }
}