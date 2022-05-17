/*
 * @lc app=leetcode.cn id=508 lang=javascript
 *
 * [508] 出现次数最多的子树元素和
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
var findFrequentTreeSum = function (root) {
  const map = new Map();
  const traverse = (root) => {
    if (root === null) return 0;
    const leftSum = traverse(root.left);
    const rightSum = traverse(root.right);
    const sum = leftSum + rightSum + root.val;
    map.set(sum, map.has(sum) ? map.get(sum) + 1 : 1);
    return sum;
  };
  traverse(root);

  let res = [];
  const max = Math.max(...map.values());
  for (const [k, v] of map) {
    if (v === max) res.push(k);
  }
  return res;
};
// @lc code=end
