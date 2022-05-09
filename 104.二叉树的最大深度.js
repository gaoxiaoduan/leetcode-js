/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
// var maxDepth = function (root) {
//   let res = 0;
//   let deep = 0;
//   const traverse = (root) => {
//     if (root === null) {
//       res = Math.max(res, deep);
//       return;
//     }
//     deep++;
//     traverse(root.left);
//     traverse(root.right);
//     deep--;
//   };
//   traverse(root);
//   return res;
// };

var maxDepth = function (root) {
  if (root === null) {
    return 0;
  }
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};

// @lc code=end
