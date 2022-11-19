/*
 * @lc app=leetcode.cn id=563 lang=javascript
 *
 * [563] 二叉树的坡度
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
var findTilt = function (root) {
  let sum = 0;
  const traverse = (root) => {
    if (root === null) return 0;
    const leftAbs = traverse(root.left);
    const rightAbs = traverse(root.right);
    sum += Math.abs(leftAbs - rightAbs);
    return leftAbs + rightAbs + root.val;
  };
  traverse(root);
  return sum;
};
// @lc code=end
