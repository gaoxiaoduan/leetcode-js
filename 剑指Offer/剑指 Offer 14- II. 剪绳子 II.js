// 剑指 Offer 14- II. 剪绳子 II: https://leetcode.cn/problems/jian-sheng-zi-ii-lcof/
// 本题与主站 343 题相同：https://leetcode-cn.com/problems/integer-break/
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  // 定义dp[i]表示 i分解后 的最大乘积
  let dp = new Array(n + 1).fill(0n);
  dp[0] = dp[1] = 0n; // 0和1不能被拆分
  const MOD = 1000000007n;
  for (let i = 2; i <= n; i++) {
    let curMax = 0n;
    for (let j = 0; j < i; j++) {
      const subProblem1 = BigInt(j * (i - j));
      const subProblem2 = BigInt(j) * dp[i - j];
      const res = subProblem1 > subProblem2 ? subProblem1 : subProblem2;
      curMax = curMax > res ? curMax : res;
    }

    dp[i] = curMax;
  }

  return dp[n] % MOD;
};
