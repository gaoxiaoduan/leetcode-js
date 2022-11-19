/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor(l + (r - l) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            r = mid - 1;
        } else if (nums[mid] < target) {
            l = mid + 1;
        }
    }
    return l;
};
// @lc code=end

