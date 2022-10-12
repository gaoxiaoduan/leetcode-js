/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const memo = new Array(s.length + 1).fill(-1);
  // 定义dp函数
  // 返回s[i,...]能否用wordDict拼成
  const dp = (i) => {
    // base case
    if (i === s.length) return true;

    if (memo[i] !== -1) return memo[i];

    for (const word of wordDict) {
      const len = word.length;
      if (i + len > s.length) continue; // 越界

      const subStr = s.substring(i, i + len);
      if (subStr !== word) continue; // 开头不相等直接跳过
      // 如果dp[i,...]可以被拼出
      // 判断 dp[i+len,...]能否被拼出
      if (dp(i + len)) {
        memo[i] = true;
        return true;
      }
    }

    // s[i,...]不能被拼出
    memo[i] = false;
    return false;
  };

  return dp(0);
};

// @lc code=end
