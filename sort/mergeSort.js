let merge = (arr1, arr2) => {
  let res = [];
  while (arr1.length > 0 && arr2.length > 0) {
    res.push(arr1[0] < arr2[0] ? arr1.shift() : arr2.shift());
  }
  return [...res, ...arr1, ...arr2];
}
function mergeSort(arr) {
  let core = (arr, L, R) => {
    if (R - L < 2) return arr.slice(L, R);
    let mid = (R + L) >> 1;
    return merge(core(arr, L, mid ), core(arr, mid, R))
  }
  return core(arr, 0 , arr.length);
}
console.log(mergeSort([1,3,5,7,9,2,4,6,8,10]));