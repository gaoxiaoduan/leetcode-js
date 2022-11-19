/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  let max = 1; // 维护i位置的最大值
  let min = 1; // 维护i位置的最小值
  let res = -Infinity;

  for (const num of nums) {
    if (num < 0) {
      // 当num为负数
      // 最大值和最小值交换
      let temp = min;
      min = max;
      max = temp;
    }
    max = Math.max(max * num, num);
    min = Math.min(min * num, num);
    res = Math.max(res, max);
  }
  return res;
};
// @lc code=end
