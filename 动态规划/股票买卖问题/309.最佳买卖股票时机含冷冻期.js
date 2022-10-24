/*
 * @lc app=leetcode.cn id=309 lang=javascript
 *
 * [309] 最佳买卖股票时机含冷冻期
 */

// base case：
// dp[-1][...][0] = dp[...][0][0] = 0
// dp[-1][...][1] = dp[...][0][1] = -infinity

// 状态转移方程：
// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])

// 相对于121题，122不限制k的交易次数所以: k-1 和 k 是一样的
// dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
// dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k][0] - prices[i])

// 我们发现数组中的 k 已经不会改变了，也就是说不需要记录 k 这个状态了：
// dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
// dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])

// 从122专转化过来，309题，k不限次数，设置1天冷冻期
// dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
// dp[i][1] = max(dp[i-1][1], dp[i-2][0] - prices[i])
// 解释：第 i 天选择 buy 的时候，要从 i-2 的状态转移，而不是 i-1 。

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
  dp[-2] = [0, -Infinity];

  for (let i = 0; i < n; i++) {
    // 解释：今天要 未持有，有两种组状态可以选择出最大利润
    // 可以选择 max(昨天未持有的利润 或 将昨天持有的售出)
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);

    // 今天要 持有，有两种状态可以选择出最大利润
    // 可以选择 Max(昨天持有的利润 或 在上次冷冻期未持有的基础上 进行买入 )
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]); // 重点
  }

  return dp[n - 1][0]; // 返回最后一天未持有的最大利润
};

// 优化空间复杂度
var maxProfit = function (prices) {
  const n = prices.length;
  // 定义dp
  let dp_i_0 = 0,
    dp_i_1 = -Infinity;
  let dp_pre_0 = 0; // 表示dp[i-2][0]
  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    // 解释：今天要 未持有，有两种组状态可以选择出最大利润
    // 可以选择 max(昨天未持有的利润 或 将昨天持有的售出)
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);

    // 今天要 持有，有两种状态可以选择出最大利润
    // 可以选择 Max(昨天持有的利润 或 在上次冷冻期未持有的基础上 进行买入 )
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]); // 重点
    dp_pre_0 = temp;
  }

  return dp_i_0; // 返回最后一天未持有的最大利润
};
// @lc code=end
