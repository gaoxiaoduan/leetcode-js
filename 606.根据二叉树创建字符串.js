/*
 * @lc app=leetcode.cn id=606 lang=javascript
 *
 * [606] 根据二叉树创建字符串
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
 * @return {string}
 */
var tree2str = function (root) {
  if (root === null) return "";
  if (root.left === null && root.right === null) return root.val + "";
  let leftStr = tree2str(root.left);
  let rightStr = tree2str(root.right);
  // 当左边有值，右边没值时
  if (root.left !== null && root.right === null) {
    return `${root.val}(${leftStr})`;
  }
  if (root.left === null && root.right !== null) {
    return `${root.val}()(${rightStr})`;
  }
  return `${root.val}(${leftStr})(${rightStr})`;
};
// @lc code=end
