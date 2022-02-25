/*
 * @lc app=leetcode.cn id=174 lang=javascript
 *
 * [174] 地下城游戏
 */

// @lc code=start
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
// 动态转移： res = min(dp(i+1,j), dp(i,j+1)) - nums[i][j];
var calculateMinimumHP = function (dungeon) {
  let m = dungeon.length,
    n = dungeon[0].length;
  let memo = Array.from({ length: m }).map((_) =>
    Array.from({ length: n }).fill(-1)
  );

  // 表示从nums[i][j] 到达右下角至少需要的血量
  const dp = (nums, i, j) => {
    // base case
    // 当i,j本身就是右下角
    if (i === m - 1 && j === n - 1) {
      return nums[i][j] >= 0 ? 1 : -nums[i][j] + 1;
    }
    // 越界情况判断
    if (i === m || j === n) return Infinity;

    if (memo[i][j] !== -1) return memo[i][j];
    let res = Math.min(dp(nums, i + 1, j), dp(nums, i, j + 1)) - nums[i][j];
    memo[i][j] = res > 0 ? res : 1;
    return memo[i][j];
  };

  // 那么我们所求的就是从nums[0][0]到达右下角需要的血量
  return dp(dungeon, 0, 0);
};
// @lc code=end
