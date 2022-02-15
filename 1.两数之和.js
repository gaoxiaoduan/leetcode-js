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
