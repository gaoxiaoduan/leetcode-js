/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  if (!root) return [];
  const q = [root];
  const res = [];

  while (q.length) {
    let levelRes = [];
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift();
      levelRes.push(node.val);
      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }
    res.unshift(levelRes);
  }
  return res;
};
// @lc code=end
