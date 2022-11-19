/*
 * @lc app=leetcode.cn id=343 lang=javascript
 *
 * [343] 整数拆分
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
//  - 思路
//  - 动态规划
//  - 定义dp[i]表示i被分解后的最大乘积
//  - 0和1不能被拆解成正整数，所以dp[0]=dp[1]=0;
//  - i(i>=2)可以被拆解为（j,i-j）,若i-j可以被继续拆解，那么最大的积就是dp[i-j]
//  - `dp[i] = max( j * (i-j), j * dp[i-j])`;
var integerBreak = function (n) {
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
// @lc code=end
