/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // dp[x] 表示 当总金额为x时，最少的硬币数
  let dp = new Array(amount + 1).fill(amount + 1);

  // base case
  dp[0] = 0;

  for (let i = 0; i < dp.length; i++) {
    for (let coin of coins) {
      if (i < coin) continue;
      // 动态转移方程
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] !== amount + 1 ? dp[amount] : -1;
};
// @lc code=end
