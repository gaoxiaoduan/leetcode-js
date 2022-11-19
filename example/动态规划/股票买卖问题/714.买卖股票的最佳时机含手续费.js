/*
 * @lc app=leetcode.cn id=714 lang=javascript
 *
 * [714] 买卖股票的最佳时机含手续费
 */

// 相对于122，k都是无限，然后每次交易再扣除手续费就好

// dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
// dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i] - fee)
// 解释：相当于买入股票的价格升高了。
// 在第一个式子里减也是一样的，相当于卖出股票的价格减小了。

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit1 = function (prices, fee) {
  const n = prices.length;
  // 定义dp
  // dp[i][0,1] 0 <= i <= n-1 | 0表示未持有，1表示持有
  // 表示第i天,持有、未持有的最大利润
  const dp = new Array(n).fill(0).map((_) => new Array(2).fill(0));
  // base case
  // -1表示还没开始
  // 0 => 未持有就是 最大利润就是0
  // 1 => 持有，最后求最大值，方便比较给一个 -Infinity
  dp[-1] = [0, -Infinity];

  for (let i = 0; i < n; i++) {
    // 解释：今天要 未持有，有两种组状态可以选择出最大利润
    // 可以选择 max(昨天未持有的利润 或 将昨天持有的售出)
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);

    // 今天要 持有，有两种状态可以选择出最大利润
    // 可以选择 Max(昨天持有的利润 或 在昨天未持有的基础上 进行买入 再扣除手续费 )
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee); // 重点
  }

  return dp[n - 1][0]; // 返回最后一天未持有的最大利润
};

// 优化空间复杂度
var maxProfit = function (prices, fee) {
  const n = prices.length;
  // 定义dp
  let dp_i_0 = 0,
    dp_i_1 = -Infinity;

  for (let i = 0; i < n; i++) {
    // 解释：今天要 未持有，有两种组状态可以选择出最大利润
    // 可以选择 max(昨天未持有的利润 或 将昨天持有的售出)
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);

    // 今天要 持有，有两种状态可以选择出最大利润
    // 可以选择 Max(昨天持有的利润 或 进行买入 再扣除手续费)
    dp_i_1 = Math.max(dp_i_1, dp_i_0 - prices[i] - fee); // 重点
  }

  return dp_i_0; // 返回最后一天未持有的最大利润
};
// @lc code=end
