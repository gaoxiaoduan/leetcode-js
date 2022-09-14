/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
//中序 [9, 3, 15, 20, 7]
//     ^  ^   ^      ^
//     |  |   |      |
//     l root  ---r---

//后序 [9, 15, 7, 20, 3]
//         ^      ^  ^
//         |      |  |
//         ---r---  root

var buildTree = function (inorder, postorder) {
  return build(
    inorder,
    0,
    inorder.length - 1,
    postorder,
    0,
    postorder.length - 1
  );
};

const build = (inorder, inStart, inEnd, postorder, poStart, poEnd) => {
  if (inStart > inEnd) return null;
  let rootVal = postorder[poEnd];
  let rootIndex = inorder.indexOf(rootVal);

  const leftSize = rootIndex - inStart;
  const root = new TreeNode(rootVal);

  root.left = build(
    inorder,
    inStart,
    rootIndex - 1,
    postorder,
    poStart,
    poStart + leftSize - 1
  );
  root.right = build(
    inorder,
    rootIndex + 1,
    inEnd,
    postorder,
    poStart + leftSize,
    poEnd - 1
  );

  return root;
};
// @lc code=end
