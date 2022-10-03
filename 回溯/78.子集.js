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
// 元素【无重】【不可复选】
// 需要使用start,保证元素无重
var subsets = function (nums) {
  const res = [];

  const backTrack = (start, track) => {
    res.push([...track]);
    for (let i = start; i < nums.length; i++) {
      // 做选择
      track.push(nums[i]);
      backTrack(i + 1, track); // i+1,保证下次进入，不会再次选中i上的元素
      // 撤销选择
      track.pop();
    }
  };
  backTrack(0, []);
  return res;
};
// @lc code=end
