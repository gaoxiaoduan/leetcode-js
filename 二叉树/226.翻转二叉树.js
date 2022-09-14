/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  const traverse = (root) => {
    if (root === null) return;
    // 交换当前树的左右子树
    let temp = root.left;
    root.left = root.right;
    root.right = temp;

    traverse(root.left);
    traverse(root.right);
  };
  traverse(root);
  return root;
};

// 分解问题方式
var invertTree1 = function (root) {
  if (root === null) return null;
  let left = invertTree1(root.left);
  let right = invertTree1(root.right);
  // 交换树
  root.left = right;
  root.right = left;
  return root;
};
// @lc code=end
