/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1];
  return [leftSearch(nums, target), rightSearch(nums, target)];
};

var leftSearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1;
    } else if (nums[mid] === target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1; //注意
    }
  }

  // left 是的区间是[0,nums.length]
  // if (left === nums.length) return -1; // 越界
  return nums[left] === target ? left : -1;
};

var rightSearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      left = mid + 1; //注意
    }
  }

  // if (left - 1 < 0) return -1;// 防止越界
  // return nums[left - 1] === target ? right : -1;
  // 当while结束时，left-1=right;
  // if (right < 0) return -1;// 防止越界
  return nums[right] === target ? right : -1;
};
// @lc code=end
