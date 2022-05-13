/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
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
var maxPathSum = function (root) {
  if (root === null) return 0;
  let res = -Infinity;

  const onSideMax = (root) => {
    if (root === null) return 0;

    let leftMax = Math.max(0, onSideMax(root.left));
    let rightMax = Math.max(0, onSideMax(root.right));

    let sum = leftMax + rightMax + root.val;
    res = Math.max(res, sum);
    return Math.max(leftMax, rightMax) + root.val;
  };

  onSideMax(root);
  return res;
};
// @lc code=end
