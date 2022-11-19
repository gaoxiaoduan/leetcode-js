/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const len = s.length;
  if (len === 0) return 0;
  // 定义dp[i]表示s[0,i-1]的解码数量
  const dp = new Array(len + 1).fill(0);

  // base case
  dp[0] = 1; // s为空
  dp[1] = s[0] === "0" ? 0 : 1; // s只有一个字符

  for (let i = 2; i <= len; i++) {
    const c = Number(s[i - 1]),
      d = Number(s[i - 2]);
    // 只有一个字符
    if (c >= 1 && c <= 9) {
      dp[i] += dp[i - 1];
    }
    // 两个字符为1组
    if (d === 1 || (d === 2 && c <= 6)) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[len];
};
// @lc code=end
