/*
 * @lc app=leetcode.cn id=783 lang=javascript
 *
 * [783] 二叉搜索树节点最小距离
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
var minDiffInBST = function (root) {
  let min = Infinity;
  let prev = null;
  const traverse = (root) => {
    if (root === null) return;

    traverse(root.left);
    if (prev !== null) {
      min = Math.min(min, Math.abs(prev.val - root.val));
    }
    prev = root;
    traverse(root.right);
  };
  traverse(root);

  return min;
};
// @lc code=end
