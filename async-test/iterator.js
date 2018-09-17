// 部署iterator接口
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i];
    yield [key, obj[key]]
  }
}

let obj = {
  a: 1,
  b: 2,
  c: 3
}

for (let [key, val] of iterEntries(obj)) {
  console.log(key, val);
}
