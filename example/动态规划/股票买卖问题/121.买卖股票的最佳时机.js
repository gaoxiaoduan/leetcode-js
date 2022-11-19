/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// 121:只能交易一次

// dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
// dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])
//             = max(dp[i-1][1][1], -prices[i])
// 解释：k = 0 的 base case，所以 dp[i-1][0][0] = 0。

// 现在发现 k 都是 1，不会改变，即 k 对状态转移已经没有影响了。
// 可以进行进一步化简去掉所有 k：
// dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
// dp[i][1] = max(dp[i-1][1], -prices[i])

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function (prices) {
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
    // 可以选择 Max(昨天持有的利润 或 进行买入 )
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }

  return dp[n - 1][0]; // 返回最后一天未持有的最大利润
};

// 优化空间复杂度
var maxProfit = function (prices) {
  const n = prices.length;
  // 定义dp
  let dp_i_0 = 0,
    dp_i_1 = -Infinity;

  for (let i = 0; i < n; i++) {
    // 解释：今天要 未持有，有两种组状态可以选择出最大利润
    // 可以选择 max(昨天未持有的利润 或 将昨天持有的售出)
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);

    // 今天要 持有，有两种状态可以选择出最大利润
    // 可以选择 Max(昨天持有的利润 或 进行买入 )
    dp_i_1 = Math.max(dp_i_1, -prices[i]);
  }

  return dp_i_0; // 返回最后一天未持有的最大利润
};
// @lc code=end
