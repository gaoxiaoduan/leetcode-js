// 剑指 Offer 03. 数组中重复的数字: https://leetcode.cn/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
// tag: easy

// 时间复杂度 O(N)
// 空间复杂度 O(N)
// - 思路
// - 使用set内元素不重复的特点
// - 遍历整个数组，若元素已经存在与set内，返回即可
// - 若set内不存在，就进行添加操作
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  var set = new Set()
  for (var i = 0; i < nums.length; i++) {
    var c = nums[i];
    if (set.has(c)) {
      return c
    } else {
      set.add(c)
    }
  }
};
