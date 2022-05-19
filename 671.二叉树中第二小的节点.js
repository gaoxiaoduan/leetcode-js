/*
 * @lc app=leetcode.cn id=671 lang=javascript
 *
 * [671] 二叉树中第二小的节点
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
var findSecondMinimumValue = function (root) {
  if (root.left === null && root.right === null) return -1;
  let left = root.left.val,
    right = root.right.val;
  if (root.val === root.left.val) {
    left = findSecondMinimumValue(root.left);
  }
  if (root.val === root.right.val) {
    right = findSecondMinimumValue(root.right);
  }

  if (left === -1) return right;
  if (right === -1) return left;

  return Math.min(left, right);
};
// @lc code=end
