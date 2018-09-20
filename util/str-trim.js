/**
* @desc 去除字符串收尾的空格.
* @param {String} str
* @return {Boolean}
*/
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    // return this.replace(/^[\s\uFEFF\xA0]+(.*?)[\s\uFEFF\xA0]+$/g, '$1');
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  };
}

// export {
// }

module.exports = {}