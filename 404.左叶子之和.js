/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和
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
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
  let sum = 0;
  const traverse = (root) => {
    if (root === null) return;
    if (
      root.left !== null &&
      root.left.left === null &&
      root.left.right === null
    ) {
      sum += root.left.val;
    }
    traverse(root.left);
    traverse(root.right);
  };
  traverse(root);
  return sum;
};
// @lc code=end
