// 使用Generator遍历完全二叉树

// 定义二叉树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 根据数组生成完全二叉树
function renderTree(arr) {
  if (arr.length == 1) {
    return new Tree(null, arr[0], null);
  } else {
    return new Tree(renderTree(arr[0]), arr[1], renderTree(arr[2]));
  }
}

let treeArr = [
  [
    [4], 2, [5]
  ],
  1,
  [
    [6], 3, [7]
  ]
]

let tree = renderTree(treeArr);

// 中序遍历二叉树
function inorder(tree) {
  let format = function* (tree) {
    if (tree) {
      yield* format(tree.left);
      yield tree.label;
      yield* format(tree.right);
    }
  }
  let res = [];
  for (let i of format(tree)) {
    res.push(i);
  }
  return res;
}

console.log(inorder(tree));   // [ 4, 2, 5, 1, 6, 3, 7 ]