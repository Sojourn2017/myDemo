function binarySearch(arr, val) {
  let high = arr.length - 1;
  let low = 0;
  while (low <= high) {
    let mid = (high + low) >> 1;
    if (arr[mid] === val) {
      return mid;
    } else if (arr[mid] < val) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return false;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10));