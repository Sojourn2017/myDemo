// 数组扁平化
function flattenArray(arr) {
  let iterArr = function* (item) {
    if (Array.isArray(item)) {
      for (let i = 0, len = item.length; i < len; i++) {
        yield* iterArr(item[i]);
      }
    } else {
      yield item;
    }
  }
  let res = [];
  for (let i of iterArr(arr)) {
    res.push(i);
  }
  return res;
}

console.log(flattenArray([1,2,[3,4,5],[6,[7,8,[9]]]]));   // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

