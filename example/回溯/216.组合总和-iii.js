/*
 * @lc app=leetcode.cn id=216 lang=javascript
 *
 * [216] 组合总和 III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
// 元素【无重】【不可复选】
// 使用数字1-9
// n为target
// k为组成target所需要的元素个数
var combinationSum3 = function (k, n) {
  const nums = new Array(9).fill(0).map((_, i) => i + 1);
  const res = [];
  let targetSum = 0;
  const backTrack = (start, track) => {
    // base case
    if (track.length === k && targetSum === n) {
      res.push([...track]);
      return;
    }
    if (track.length > k || targetSum > n) return;
    for (let i = start; i < nums.length; i++) {
      // 做选择
      track.push(nums[i]);
      targetSum += nums[i];

      backTrack(i + 1, track);
      // 撤销选择
      track.pop();
      targetSum -= nums[i];
    }
  };
  backTrack(0, []);
  return res;
};
// @lc code=end
