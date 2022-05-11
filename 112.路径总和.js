/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} targetSum
 * @return {boolean}
 */
// 常规思路，遍历二叉树，在遍历过程中积累路径和，
// 当遍历到叶子结点的时候，判断路径和是否与targetSum相等
var hasPathSum = function (root, targetSum) {
  if (root === null) return false;
  let curSum = 0; //当前和
  let found = false; // 判断是否找
  const traverse = (root) => {
    if (root === null) return;

    curSum += root.val;
    if (root.left === root.right) {
      if (curSum === targetSum) found = true;
    }
    traverse(root.left);
    traverse(root.right);
    curSum -= root.val;
  };
  traverse(root);
  return found;
};

// 动态规划解法
// 拆分子问题，用小问题推到出大问题
// 输入一个根结点，该根结点的路径和是否能凑到targetSum
var hasPathSum2 = function (root, targetSum) {
  if (root === null) return false;
  if (root.left === root.right && root.val === targetSum) {
    return true;
  }
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};
// @lc code=end
