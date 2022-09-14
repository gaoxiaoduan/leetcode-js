/*
 * @lc app=leetcode.cn id=700 lang=javascript
 *
 * [700] 二叉搜索树中的搜索
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
 * @param {number} val
 * @return {TreeNode}
 */
// 利用左小右大的特性优化搜索
var searchBST = function (root, val) {
  if (root === null) return null;
  if (root.val < val) {
    return searchBST(root.right, val);
  }
  if (root.val > val) {
    return searchBST(root.left, val);
  }

  return root;
};
// @lc code=end
