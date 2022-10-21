/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const n = nums.length;

  // 跳的最远距离，若长度能超过最后一格，返回true，否则返回false
  let res = 0;
  for (let i = 0; i < n - 1; i++) {
    res = Math.max(res, i + nums[i]);
    // [0,2,3]
    if (res === i) return false; // 可能遇到0，跳不动了
  }

  return res >= n - 1;
};
// @lc code=end
