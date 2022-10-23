/*
 * @lc app=leetcode.cn id=1014 lang=javascript
 *
 * [1014] 最佳观光组合
 */

// @lc code=start
/**
 * @param {number[]} values
 * @return {number}
 */
// values[i] + values[j] + i - j可以转换出
// （values[i] + i） + （values[j] - j）
// values[j] - j是不变的，所以求出values[i] + i的最大值即可
var maxScoreSightseeingPair = function (values) {
  let maxValueI = values[0] + 0;
  let res = 0;
  for (let i = 1; i < values.length; i++) {
    const valueJ = values[i] - i;
    res = Math.max(res, maxValueI + valueJ);
    maxValueI = Math.max(maxValueI, values[i] + i);
  }
  return res;
};
// @lc code=end
