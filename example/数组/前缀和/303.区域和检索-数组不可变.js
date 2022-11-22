/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start

/**
 * @param {number[]} nums
 */
/**
 * 时间复杂度 O(1)
 * 空间复杂度 O(N)
 * 思路
 * - 前缀和 解法
 * - 初始化是计算前缀和preSum,preSum第一位存储0，方便后面计算，所以长度要比nums+1
 * - nums:     0   1   2   3    4    5
 * -        【 3   5   2   -2   4    1 】
 * - preSum:0  1   2   3   4    5    6
 * -     【 0  3   8   10  8    12   13 】
 * - 核心思路是我们 new 一个新的数组 preSum 出来，preSum[i] 记录 nums[0..i-1] 的累加和,看图 10 = 3 + 5 + 2：
 * - 如果我想求索引区间 [1, 4] 内的所有元素之和，就可以通过 preSum[5] - preSum[1] 得出
 * ![](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211221048704.png)
 */
var NumArray = function (nums) {
  this.preSum = new Array(nums.length + 1).fill(0)
  for (let i = 1; i < this.preSum.length; i++) {
    this.preSum[i] = this.preSum[i - 1] + nums[i - 1];
  }
};

/**
* @param {number} left
* @param {number} right
* @return {number}
*/
NumArray.prototype.sumRange = function (left, right) {
  return this.preSum[right + 1] - this.preSum[left];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
// @lc code=end

// -----------------根据题意求和-----------------------
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  this.nums = nums;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let res = 0;
  for (let i = left; i <= right; i++) {
    res += this.nums[i]
  }
  return res;
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
