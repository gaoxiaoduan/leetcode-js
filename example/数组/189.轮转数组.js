/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 轮转数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  if (nums.length === 1) return nums;
  k = k % nums.length;
  let spliceStart = nums.length - k;
  let kNums = nums.splice(spliceStart);
  if (spliceStart < 0) {
    reverse(nums, 0, nums.length - 1);
  }
  nums.unshift(...kNums);
};
const reverse = (arr, start, end) => {
  while (start < end) {
    [arr[start++], arr[end--]] = [end, start];
  }
};

var rotate1 = function (nums, k) {
  const n = nums.length;
  const move = n - k % n;
  const endNums = nums.splice(move);
  nums.unshift(...endNums);
};
// @lc code=end
