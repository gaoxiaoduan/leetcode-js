// 剑指 Offer 14- I. 剪绳子: https://leetcode.cn/problems/jian-sheng-zi-lcof/
// 本题与主站 343 题相同：https://leetcode-cn.com/problems/integer-break/
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  // 定义dp[i]表示 i分解后 的最大乘积
  let dp = new Array(n + 1).fill(0);
  dp[0] = dp[1] = 0; // 0和1不能被拆分
  for (let i = 2; i <= n; i++) {
    let curMax = 0;
    for (let j = 0; j < i; j++) {
      curMax = Math.max(curMax, j * (i - j), j * dp[i - j]);
    }
    dp[i] = curMax;
  }

  return dp[n];
};
