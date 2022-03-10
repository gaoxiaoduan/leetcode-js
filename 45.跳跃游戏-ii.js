/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
// 贪心算法
// 时间复杂度 O(N)
// 空间复杂度 O(1)
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let len = nums.length;
  let farthest = 0;
  let end = 0;
  let jump = 0;
  for (let i = 0; i < len - 1; i++) {
    farthest = Math.max(i + nums[i], farthest);
    if (end === i) {
      jump++;
      end = farthest;
    }
  }
  return jump;
};

// // 动态规划
// // 时间复杂度 O(N^2)
// // 空间复杂度 O(1)
// /**
//  * @param {number[]} nums
//  * @return {number}
//  */
// var jump = function (nums) {
//   let len = nums.length;
//   let memo = Array.from({ length: len }).fill(len);
//   //表示从p处跳到最后位置的最少步数
//   const dp = (nums, p) => {
//     // base case
//     // 当 p 到达最后的位置，不用跳，返回0
//     if (p >= len - 1) return 0;
//     if (memo[p] !== len) return memo[p];
//     let step = nums[p];
//     for (let i = 1; i <= step; i++) {
//       let subProblum = dp(nums, nums[i] + i);
//       memo[p] = Math.min(memo[p], subProblum + 1);
//     }
//     return memo[p];
//   };

//   return dp(nums, 0);
// };
// @lc code=end
