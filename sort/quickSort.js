let patition = (arr, L, R) => {
  let pivot = L;
  let index = pivot + 1;
  for (let i = index; i <= R; i++) {
    if (arr[i] < arr[pivot]) {
      [arr[i], arr[index]] = [arr[index], arr[i]];
      index++;
    }
  }
  [arr[pivot], arr[index - 1]] = [arr[index - 1], arr[pivot]]
  return index - 1;
}

function quickSort(arr) {
  let quickSortCore = (arr, L, R) => {
    if (L < R) {
      let patitionIndex = patition(arr, L, R);
      quickSortCore(arr, L, patitionIndex - 1);
      quickSortCore(arr, patitionIndex + 1, R);
    } 
  }
  quickSortCore(arr, 0, arr.length - 1);
  return arr;
}

console.log(quickSort([1,3,5,7,9,2,4,6,8,10]));