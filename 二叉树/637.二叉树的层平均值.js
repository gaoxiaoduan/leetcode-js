/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
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
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  const res = [];
  if (root === null) return res;
  const q = [root];
  while (q.length) {
    const levelAve = [];
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift();
      levelAve.push(node.val);
      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }
    let average = levelAve.reduce((a, b) => (a += b), 0) / levelAve.length;
    res.push(average);
  }
  return res;
};
// @lc code=end
