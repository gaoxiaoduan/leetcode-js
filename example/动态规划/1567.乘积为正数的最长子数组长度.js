/*
 * @lc app=leetcode.cn id=1567 lang=javascript
 *
 * [1567] 乘积为正数的最长子数组长度
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 跟152.乘积最大子数组 相似
var getMaxLen = function (nums) {
  let maxLength = 0; // 正数的长度
  let minLength = 0; // 负数的长度
  let res = 0;
  for (const num of nums) {
    if (num === 0) {
      // 因为题目要求连续，所以当num为0，maxLength，minLength都为0
      maxLength = minLength = 0;
    } else if (num > 0) {
      // 当 num为正数时
      maxLength = maxLength + 1;
      minLength = minLength === 0 ? 0 : minLength + 1; //若minLength的长度之前就是0，那么还继续为0，否则+1
    } else if (num < 0) {
      let temp = maxLength; // 保留之前的max，因为后面要多max赋新值
      maxLength = minLength === 0 ? 0 : minLength + 1;
      minLength = temp + 1;
    }
    res = Math.max(res, maxLength);
  }
  return res;
};
// @lc code=end
