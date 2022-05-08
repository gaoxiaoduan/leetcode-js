/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let item = nums[i];
    let diffNum = target - item;

    if (map.has(diffNum)) {
      return [map.get(diffNum), i];
    } else {
      map.set(item, i);
    }
  }
};

// @lc code=end

// --------------------------------------------------------------
/**
 * 泛化题：
 * 如果假设输入一个数组 nums 和一个目标和 target，请你返回 nums 中能够凑出 target 的两个元素的值，
 * 比如输入 nums = [5,3,1,6], target = 9，那么算法返回两个元素 [3,6]。
 * nums 中可能有多对儿元素之和都等于 target，请你的算法返回所有和为 target 的元素对儿，其中不能出现重复。
 * @param {*} nums
 * @param {*} target
 * @returns
 */
var twoSumTarget = function (nums, target) {
  nums.sort((a, b) => a - b);
  let lo = 0,
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
// test
let res = twoSumTarget([1, 1, 1, 2, 2, 3, 3], 4);
console.log("[ res ] >", res);
