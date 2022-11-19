/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  return build(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
};

const build = (preorder, preStart, preEnd, inorder, inoStart, inoEnd) => {
  if (preStart > preEnd) return null;
  const rootVal = preorder[preStart];
  const inoRootIndex = inorder.indexOf(rootVal);

  const leftSize = inoRootIndex - inoStart;

  const root = new TreeNode(rootVal);

  root.left = build(
    preorder,
    preStart + 1,
    preStart + leftSize,
    inorder,
    inoStart,
    inoRootIndex - 1
  );
  root.right = build(
    preorder,
    preStart + leftSize + 1,
    preEnd,
    inorder,
    inoRootIndex + 1,
    inoEnd
  );
  return root;
};
// @lc code=end
