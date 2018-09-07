require('./date-format.js');

var p = require('./price-format.js');

console.log(p);

var date = new Date('1996-12-14');

var d = date.Format('yyyyMMdd');

console.log(d);

console.log(p.priceFormat('123456.7890'));