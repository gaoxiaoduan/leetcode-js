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
  let memo = new Map();

  const dp = (i, j) => {
    if (memo.has(`(${i}, ${j})`)) {
      return memo.get(`(${i}, ${j})`);
    }

    // base case
    if (i === -1) return j + 1;
    if (j === -1) return i + 1;

    if (word1.charAt(i) === word2.charAt(j)) {
      memo.set(`(${i}, ${j})`, dp(i - 1, j - 1)); // 跳过，啥都不做
    } else {
      memo.set(
        `(${i}, ${j})`,
        Math.min(
          dp(i, j - 1) + 1, // 插入
          dp(i - 1, j) + 1, // 删除
          dp(i - 1, j - 1) + 1 // 替换
        )
      );
    }
    return memo.get(`(${i}, ${j})`);
  };

  return dp(word1.length - 1, word2.length - 1);
};
// @lc code=end
