// 442. 数组中重复的数据 : https://leetcode.cn/problems/find-all-duplicates-in-an-array/
// tag:medium

// 时间复杂度O(N)
// 空间复杂度O(N)
// - 思路
// - 使用set内元素不重复的特点
// - 遍历数组，若set内没有num，则向set内添加
// - 如果set内已经有num了，那么num就是重复的添加到res中
// - 跟[剑指 Offer 03. 数组中重复的数字]思路类似
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  const set = new Set();
  const res = [];
  for (const num of nums) {
    if (set.has(num)) {
      res.push(num);
    } else {
      set.add(num);
    }
  }
  return res;
};
