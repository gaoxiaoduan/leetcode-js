/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
/**
 * 时间复杂度 O(N) N是s的个数
 * 空间复杂度 O(M) M是s的不同元素的个数
 * 思路：
 * 维护一个滑动窗口
 * 1.在右指针滑动的过程中记录当前元素对应的位置
 * 2.若在右指针滑动过程中发现map中已经有当前元素，并且这个位置没有在左指针之后
 * 3.将左指针定位到当前元素位置的下一位
 * 4.然后右指针每次滑动，都求左右指针的最大长度
 * 这个长度就是最长的无重复子串
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let l = 0, // 左指针
    res = 0; // 最长的无重复子串的数量

  // r为右指针
  for (let r = 0; r < s.length; r++) {
    let c = s[r]; // 每个字符串
    // 2.
    if (map.has(c) && map.get(c) >= l) {
      // 3.
      l = map.get(c) + 1;
    }
    // 4.
    res = Math.max(res, r - l + 1);

    // 1.
    map.set(c, r); // 记录下每个字符串的位置
  }

  return res;
};
// @lc code=end
