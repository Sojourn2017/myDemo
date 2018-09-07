/**
 * @desc: Date format
 * @param {string} fmt 目标字符串格式,默认：yyyy-MM-dd HH:mm:ss
 * @returns {string} 返回格式化后的日期字符串
 * 
 * @example
 * var date = new Date();
 * date.Format("yyyy年MM月dd日 第q季度")
 * 
 * @support:
 * yyyy：年
 * q: 季度
 * MM：月
 * dd：日
 * hh: 时
 * mm：分
 * ss：秒
 * S：毫秒
 */

Date.prototype.Format = function (fmt) {
  var f = fmt != null ? fmt : "yyyy-MM-dd hh:mm:ss";
  var o = {
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "S": this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(f)) {
    f = f.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(f)) {
      f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return f;
}

/**
 * @desc: 判断日期字符串是否正确
 * @param {String} dateStr // yyyyMMdd
 * @param {Boolean} ltNow // 是否可以超过当前时间
 * @return {Boolean}
 * 
 * @example
 * 
 */
function isLegal(dateStr, ltNow) {
  if (dateStr == null) return false;
  dateStr = dateStr.toString();
  ltNow = ltNow != null ? ltNow : true;
  var date = new Date();
  var yyyy = dateStr.substr(0, 4);
  var MM = dateStr.substr(4, 2);
  var dd = dateStr.substr(6, 2);
  var regArr = [/(\d{4})/,/(0[1-9]|1[0-2])/,/[0-2][1-9]|10|20|30|31/];
  var flag = yyyy
    ? (/(\d{4})/.test(yyyy)
        ? (/(0[1-9]|1[0-2])/.test(MM)
            ? (/[0-2][1-9]|10|20|30|31/.test(dd)
                ? true
                : false)
            : false)
        : false)
    : false;
  if (yyyy) {
    if (!/(\d{4})/.test(yyyy)) {
      return false
    } else {
      if (!/(0[1-9]|1[0-2])/.test(MM)) {

      }
    }
  }

  // var flag1 = false,
  //   flag2 = false,
  //   flag3 = false;
  // if (ltNow) {
  //   if (yyyy) {
  //     var year = now.getFullYear();
  //     if (year < yyyy) {
  //       flag1 = true
  //     } else if (year == yyyy) {

  //     } else {
  //       return false;
  //     }
  //   }
  // }
}

module.exports = {};