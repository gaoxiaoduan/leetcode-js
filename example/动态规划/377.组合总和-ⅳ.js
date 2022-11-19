/*
 * @lc app=leetcode.cn id=377 lang=javascript
 *
 * [377] 组合总和 Ⅳ
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    // 定义dp
    //dp[i]表示组成i的排列个素
    const dp = new Array(target + 1).fill(0);
    // base case
    dp[0] = 1; // 组成0，只有一种方案

    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (num <= i) {
                // 累加 i-num的排列组合
                dp[i] = dp[i] + dp[i - num];
            }
        }
    }

    return dp[target];
};
// @lc code=end

