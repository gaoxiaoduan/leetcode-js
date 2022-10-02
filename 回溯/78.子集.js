/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const res = [];

  const backTrack = (start, track) => {
    res.push([...track]);
    for (let i = start; i < nums.length; i++) {
      // 做选择
      track.push(nums[i]);
      backTrack(i + 1, track);
      // 撤销选择
      track.pop();
    }
  };
  backTrack(0, []);
  return res;
};
// @lc code=end
