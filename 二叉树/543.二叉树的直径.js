/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
var diameterOfBinaryTree = function (root) {
  let diameterMax = 0; // 最大直径

  const maxDeep = (root) => {
    if (root === null) {
      return 0;
    }
    let left = maxDeep(root.left);
    let right = maxDeep(root.right);
    diameterMax = Math.max(diameterMax, left + right);
    return 1 + Math.max(left, right);
  };

  maxDeep(root);
  return diameterMax;
};
// @lc code=end
