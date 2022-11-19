/*
 * @lc app=leetcode.cn id=188 lang=javascript
 *
 * [188] 买卖股票的最佳时机 IV
 */

// 相对于123题：只能交易两次$k=2$，该题的k是不确定的

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const n = prices.length;
  const maxK = k;
  const dp = new Array(n)
    .fill()
    .map((_) => new Array(maxK + 1).fill().map((_) => new Array(2).fill(0)));

  for (let i = 0; i < n; i++) {
    for (let k = maxK; k >= 1; k--) {
      if (i - 1 === -1) {
        dp[i][k][0] = 0;
        dp[i][k][1] = -prices[i];
        continue;
      }
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
    }
  }

  return dp[n - 1][maxK][0];
};
// @lc code=end
