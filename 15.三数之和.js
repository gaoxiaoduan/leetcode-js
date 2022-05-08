/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start

// 使用改造twoSum的解法
var twoSumTarget = function (nums, start, target) {
  let lo = start,
    hi = nums.length - 1;
  let res = [];
  while (lo < hi) {
    let left = nums[lo],
      right = nums[hi];
    let sum = left + right;

    if (sum === target) {
      res.push([left, right]);
      // 去除重复答案
      while (lo < hi && nums[lo] === left) lo++;
      while (lo < hi && nums[hi] === right) hi--;
    } else if (sum < target) {
      lo++;
    } else if (sum > target) {
      hi--;
    }
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let twoSumRes = twoSumTarget(nums, i + 1, 0 - nums[i]);

    for (const item of twoSumRes) {
      item.push(nums[i]);
      res.push(item);
    }

    // 去除重复答案
    while (i < len - 1 && nums[i] === nums[i + 1]) i++;
  }

  return res;
};
// @lc code=end

// --------------------------------------------------------------
var threeSumTarget = function (nums, target) {
  nums.sort((a, b) => a - b);
  const res = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let twoSumRes = twoSumTarget(nums, i + 1, target - nums[i]);

    for (const item of twoSumRes) {
      item.push(nums[i]);
      res.push(item);
    }

    // 去除重复答案
    while (i < len - 1 && nums[i] === nums[i + 1]) i++;
  }

  return res;
};
