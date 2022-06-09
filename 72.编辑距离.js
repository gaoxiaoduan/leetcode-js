/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
// 从上向下递归+备忘录消除子问题
var minDistance = function (word1, word2) {
  const m = word1.length,
    n = word2.length;
  const memo = Array.from({ length: m }).map(() =>
    Array.from({ length: n }).fill(-1)
  );

  const dp = (i, j) => {
    // base case
    if (i === -1) return j + 1;
    if (j === -1) return i + 1;

    if (memo[i][j] !== -1) return memo[i][j];

    if (word1.charAt(i) === word2.charAt(j)) {
      memo[i][j] = dp(i - 1, j - 1); // 跳过，啥都不做
    } else {
      memo[i][j] = Math.min(
        dp(i, j - 1) + 1, // 插入
        dp(i - 1, j) + 1, // 修改
        dp(i - 1, j - 1) + 1 // 替换
      );
    }
    return memo[i][j];
  };

  return dp(word1.length - 1, word2.length - 1);
};
// @lc code=end
