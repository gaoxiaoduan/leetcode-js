/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
/**
 * 时间复杂度 O(logN)
 * 空间复杂度 O(1)
 * 思路
 * - 左右指针
 * - 交换左右指针的值即可
 */
var reverseString = function (s) {
  if (s.length === 0 || s.length === 1) return s;
  let left = 0,
    right = s.length - 1;
  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
};
// @lc code=end
