/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
// 27.移除元素 https://leetcode.cn/problems/remove-element/
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

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * 时间复杂度 O(N)
 * 空间复杂度 O(1)
 * 思路
 * - 先使用快慢指针法，将不为0的元素，按照之前顺序排在前面
 * - 然后将slow之后的元素全部设置为0即可
 */
var moveZeroes = function (nums) {
  // 先使用【移除元素】，将数组中0的元素删除
  // 返回nums的length，且nums[0,p-1]已经原地删除了0
  let p = removeElement(nums, 0);
  for (; p < nums.length; p++) {
    nums[p] = 0;
  }
  return nums;
};
// @lc code=end
