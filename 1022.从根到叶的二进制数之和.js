/*
 * @lc app=leetcode.cn id=1022 lang=javascript
 *
 * [1022] 从根到叶的二进制数之和
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
var sumRootToLeaf = function (root) {
  let dept = [];

  const traverse = (root, s) => {
    if (root === null) return;
    s += root.val;
    if (root.left === null && root.right === null) {
      dept.push(s);
    }
    traverse(root.left, s);
    traverse(root.right, s);
    s -= root.val;
  };

  traverse(root, "");

  const res = dept.reduce((pre, cur) => parseInt(pre) + parseInt(cur, 2), "0");
  return res;
};
// @lc code=end
