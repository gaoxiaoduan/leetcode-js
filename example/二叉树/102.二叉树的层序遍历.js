/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
var levelOrder = function (root) {
  if (!root) return [];
  const q = [root];
  const res = [];
  let level = 0;

  while (q.length) {
    for (let i = 0, len = q.length; i < len; i++) {
      const node = q.shift();
      if (!res[level]) {
        res[level] = [node.val];
      } else {
        res[level].push(node.val);
      }

      node.left && q.push(node.left);
      node.right && q.push(node.right);
    }
    level += 1;
  }
  return res;
};
// @lc code=end
