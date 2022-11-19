/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
/**
 * 时间复杂度 O(logN)
 * 空间复杂度 O(1)
 * 思路
 * - 声明left、right两个指针
 * - 从两头取值进行比较
 * - 若两头取到的和想等，说明找到了，返回索引+1即可
 * - 若sum > target ，说明sum大了，让right--，使sum小一点，再进行比较
 * - 若sum < target ，说明sum小了，让left++，使sum大一点，再进行比较
 * - 以上两点是因为题目说数组是 **非递减顺序排列**的
 */
var twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      // 找到target，返回索引
      // 题目下标从1开始的，所以要+1
      return [left + 1, right + 1];
    } else if (sum > target) {
      right--; // 让sum小一点
    } else if (sum < target) {
      left++; // 让sum大一点
    }
  }
  return [-1, -1];
};
// @lc code=end
