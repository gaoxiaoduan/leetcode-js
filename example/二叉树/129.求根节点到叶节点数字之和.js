/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根节点到叶节点数字之和
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
var sumNumbers = function (root) {
  let res = 0;
  let path = [];

  const traverse = (root) => {
    if (root === null) return;
    path.push(root.val);
    if (root.left === null && root.right === null) {
      res += path.reduce((a, b) => a * 10 + b);
    }
    root.left && traverse(root.left);
    root.right && traverse(root.right);
    path.pop();
  };

  traverse(root);
  return res;
};
// @lc code=end
