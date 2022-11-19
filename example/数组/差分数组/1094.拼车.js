/*
 * @lc app=leetcode.cn id=1094 lang=javascript
 *
 * [1094] 拼车
 */

// @lc code=start
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  const nums = new Array(1001).fill(0);
  const df = new Diff(nums);
  for (let item of trips) {
    const [val, i, j] = item;
    // 乘客在i上车
    // 在j已经下车，所以j要-1
    df.increment(i, j - 1, val);
  }
  df.result();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > capacity) {
      return false;
    }
  }
  return true;
};

class Diff {
  constructor(nums) {
    this.nums = nums;
    this.len = nums.length;
    this.diff = [];
    // nums: [ 8, 5, 3, 6, 2 ]
    // diff: [ 8,-3,-2, 3,-4 ]
    // 区间加减[i,j]，例如:nums[1,3]+3,就是diff[i]+3,diff[j+1]-3,经过还原后区间就整体加3了
    // nums: [ 8, 5, 3, 6, 2 ] ==》还原后 [ 8, 8, 6, 9, 2 ]
    // diff: [ 8,-3,-2, 3,-4 ] ==》操作后 [ 8, 0,-2, 3,-7 ]
    //            ⬆       ⬆
    //          -3+3     -4-3
    //            0       -7
    this.init();
  }

  init() {
    this.diff[0] = this.nums[0];
    for (let i = 1; i < this.len; i++) {
      this.diff[i] = this.nums[i] - this.nums[i - 1];
    }
  }

  result() {
    this.nums[0] = this.diff[0];
    for (let i = 1; i < this.len; i++) {
      this.nums[i] = this.nums[i - 1] + this.diff[i];
    }
    return this.nums;
  }

  // 对nums[i,j]区间整体+val val可以是负数
  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.len) {
      this.diff[j + 1] -= val;
    }
  }
}
// @lc code=end
