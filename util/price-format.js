/**
* @desc： Format price.
* @param {String} price
* @param {String} currency
* @param {Number} decimals
* @return {String}
*
* @example priceFormat('12345.67890', '$', 3) -> '$12,345.679'
*/
module.exports.priceFormat = function priceFormat(price, currency, decimals) {
  price = parseFloat(price);
  if (!price && price !== 0 || !isFinite(price)) return '';
  currency = currency != null ? currency : '￥';
  decimals = decimals != null ? decimals : 2;
  var sign = price < 0 ? '-' : '';
  var str = Math.abs(price).toFixed(decimals);
  var _int = decimals ? str.slice(0, -1 - decimals) : '';
  var _float = decimals ? str.slice(-1 - decimals) : '';
  var i = _int.length % 3;
  var head = i > 0 
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) 
    : ''; 
  var mid = _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,');
  return sign + currency + head + mid + _float;
}

// // es6 module
// export {
//   priceFormat as priceFormat
// }

// commonJS
module.exports = Object.assign(module.exports, {
  value : 666
})
