/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
var zigzagLevelOrder = function (root) {
  if (!root) return [];
  const q = [root];
  const res = [];
  let isLeft = true; // true 表示 --> 从左向右
  while (q.length) {
    let levelResult = []; // 当前层级遍历结果
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift();
      if (isLeft) {
        levelResult.push(node.val);
      } else {
        levelResult.unshift(node.val);
      }

      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }
    isLeft = !isLeft;
    res.push(levelResult);
  }
  return res;
};
// @lc code=end
