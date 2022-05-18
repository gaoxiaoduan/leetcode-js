/*
 * @lc app=leetcode.cn id=653 lang=javascript
 *
 * [653] 两数之和 IV - 输入 BST
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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  let map = new Map();
  let isFound = false;

  const traverse = (root) => {
    if (root === null) return;
    if (map.has(k - root.val)) {
      return (isFound = true);
    } else {
      map.set(root.val, "666xxx");
    }
    traverse(root.left);
    traverse(root.right);
  };
  traverse(root);
  return isFound;
};
// @lc code=end
