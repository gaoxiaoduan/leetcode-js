/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
  const n = costs.length;
  // 定义dp数组
  // dp[i][j]表示[0...i]号房子，粉成0，1，2号颜色所需最少成本
  const dp = new Array(n).fill(0).map((_) => [0, 1, 2]);
  // base case
  // 第0排花费的最少成本就是costs[0][j]
  dp[0] = costs[0];

  for (let i = 1; i < n; i++) {
    // dp[i]的最小成本 = dp[i-1]的最小成本+当前层的成本
    // 因为相邻颜色不能相同,所以0颜色，只能选1，2颜色的最小成本 + 当前颜色成本
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
  }

  // 找出[0...i]号房子中花费最少的成本
  const res = Math.min.call(null, ...dp[n - 1]);
  return res;
};
