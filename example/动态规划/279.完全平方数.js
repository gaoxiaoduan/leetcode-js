/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    // 定义dp
    // dp[i]表示i的完全平方数的最少数量
    const dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    for (let i = 1; i <= n; i++) {
        let curMin = Infinity;
        for (let j = 1; j * j <= i; j++) {
            curMin = Math.min(curMin, dp[i - (j * j)]);
        }
        // 动态转移方程：dp[i] = dp[i - j^2] + 1;
        dp[i] = curMin + 1;
    }
    return dp[n];
};
// @lc code=end

