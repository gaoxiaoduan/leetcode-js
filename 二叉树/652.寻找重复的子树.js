/*
 * @lc app=leetcode.cn id=652 lang=javascript
 *
 * [652] 寻找重复的子树
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  const map = new Map();
  const res = [];

  const traverse = (root) => {
    if (root === null) return;
    const leftVal = traverse(root.left);
    const rightVal = traverse(root.right);
    const subTree = leftVal + "," + rightVal + "," + root.val;
    const count = map.get(subTree) || 0;
    if (count === 1) {
      res.push(root);
    }
    map.set(subTree, count + 1);
    return subTree;
  };

  traverse(root);
  return res;
};
// @lc code=end
