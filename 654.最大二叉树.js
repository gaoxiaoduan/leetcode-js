/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
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

// 对数组分区，找数组的最大值，然后先构建根节点，再构建左右节点

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  return build(nums, 0, nums.length - 1);
};

const build = (nums, lo, hi) => {
  if (lo > hi) return null;
  let max = -Infinity,
    index = 0;
  for (let i = lo; i <= hi; i++) {
    if (nums[i] > max) {
      max = nums[i];
      index = i;
    }
  }

  const root = new TreeNode(max);
  root.left = build(nums, lo, index - 1);
  root.right = build(nums, index + 1, hi);
  return root;
};
// @lc code=end
