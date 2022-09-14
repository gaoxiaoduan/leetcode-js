/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数
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
var findMode = function (root) {
  const map = new Map();
  const traverse = (root) => {
    if (root === null) return;

    traverse(root.left);
    let v = root.val;
    map.set(v, map.has(v) ? map.get(v) + 1 : 1);
    traverse(root.right);
  };
  traverse(root);

  let max = Math.max(...map.values());
  let res = [];
  for (let [k, v] of map) {
    if (v === max) res.push(k);
  }
  return res;
};
// @lc code=end
