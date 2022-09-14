/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// dp数组自底向上解法
var fib = function (n) {
  // dp[n]表示斐波那契数列上的第n个数
  let dp = new Array(n + 1).fill(0);
  // base case
  dp[0] = 0;
  dp[2] = dp[1] = 1;
  for (let i = 3; i < dp.length; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// 备忘录解法
// var fib = function (n) {
//   let memo = [];
//   return helper(memo, n);
// };

// const helper = (memo, n) => {
//   if (n === 0) return 0;
//   if (n === 1 || n === 2) return 1;
//   if (memo[n] !== undefined) {
//     return memo[n];
//   }

//   return helper(memo, n - 1) + helper(memo, n - 2);
// };
// @lc code=end
