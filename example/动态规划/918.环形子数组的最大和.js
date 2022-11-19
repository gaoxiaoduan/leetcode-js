/*
 * @lc app=leetcode.cn id=918 lang=javascript
 *
 * [918] 环形子数组的最大和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  let total = 0, // 综合
    curMax = 0,
    max = -Infinity,
    curMin = 0,
    min = Infinity;

  for (const item of nums) {
    curMax = Math.max(curMax + item, item);
    max = Math.max(max, curMax);

    curMin = Math.min(curMin + item, item);
    min = Math.min(min, curMin);

    total += item;
  }

  return max > 0 ? Math.max(max, total - min) : max;
};
// @lc code=end
