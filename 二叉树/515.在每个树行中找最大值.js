/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
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
var largestValues = function (root) {
  let res = [];
  if (root === null) return res;
  const q = [root];

  while (q.length) {
    const level = [];
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift();
      level.push(node.val);
      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }
    res.push(Math.max(...level));
  }

  return res;
};
// @lc code=end
