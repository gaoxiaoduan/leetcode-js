/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 快慢指针
 * - 跳过对目标val的处理，这样就相当于删除了val
 * - 对于不等于val的数据，做指针的偏移处理
 */
var removeElement = function (nums, val) {
  if (nums.length === 0) return 0;
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
};
// @lc code=end
