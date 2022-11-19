// 剑指 Offer 63. 股票的最大利润: 本题与主站 121 题相同：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
// 动态转移方程
// dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1] + prices[i]);
// dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1][0] - prices[i]);

// 因为k=1，所以k可以消除
// dp[i][0] = max(dp[i-1][0],dp[i-1][1] + prices[i]);
// dp[i][1] = max(dp[i-1][1],dp[i-1][0] - prices[i]);
// dp[i-1][0] 的默认值为0；
// dp[i][1] = max(dp[i-1][1],0 - prices[i]);

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;
  if (n === 0) return 0;
  const dp = new Array(n).fill().map((_) => new Array(2).fill(0));

  for (let i = 0; i < n; i++) {
    // base case
    if (i - 1 === -1) {
      // dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
      dp[i][0] = 0;
      // dp[i][1] = Math.max(dp[i - 1][1], 0 - prices[i]);
      dp[i][1] = -prices[i];
      continue;
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], 0 - prices[i]);
  }

  return dp[n - 1][0];
};
