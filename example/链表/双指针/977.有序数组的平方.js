/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    const n = nums.length;
    let l = 0, r = n - 1;

    const res = new Array(n);
    let p = n - 1;
    while (l <= r) {
        if (Math.abs(nums[l]) > Math.abs(nums[r])) {
            res[p] = nums[l] * nums[l];
            l++;
        } else {
            res[p] = nums[r] * nums[r];
            r--;
        }
        p--;
    }

    return res;
};
// @lc code=end

