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
// 遍历解法：对应回溯算法
// var maxDepth = function (root) {
//   let res = 0;
//   let deep = 0; // 当前深度
//   const traverse = (root) => {
//     if (root === null) { // 到达根节点
//       res = Math.max(res, deep); // 更新结果
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

// 分解子问题解法：对应动态规划解法
// 定义：maxDepth函数返回输入节点的最大深度
var maxDepth = function (root) {
  // base case
  if (root === null) {
    return 0;
  }
  let leftDepth = maxDepth(root.left); // 获取左子树的最大深度
  let rightDepth = maxDepth(root.right); // 获取右子树的最大深度
  return Math.max(leftDepth, rightDepth) + 1; // 取左右子树中的最大深度 + 当前节点，即返回当前节点的最大深度
};

// @lc code=end
