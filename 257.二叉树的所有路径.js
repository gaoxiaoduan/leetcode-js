/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let path = [];
  let res = [];
  const traverse = (root) => {
    if (root === null) return;

    path.push(root.val);
    if (root.left === null && root.right === null) {
      res.push(path.join("->"));
    }
    root.left && traverse(root.left);
    root.right && traverse(root.right);
    path.pop();
  };
  traverse(root);
  return res;
};
// @lc code=end
