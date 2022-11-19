/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
// 题目理解：
// 求最远能跳多远的距离？若最远距离超出数组长度，表示可以到达最后一个下标
// 反子不能到达
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let len = nums.length;
  let farthest = 0; // 最远距离
  for (let i = 0; i < len - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest - i <= 0) {
      return false;
    }
  }
  return farthest >= len - 1;
};
// @lc code=end
