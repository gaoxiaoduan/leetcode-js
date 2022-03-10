/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start

// 时间复杂度 O(N)
// 空间复杂度 O(1)
// 思路笔记：-->利用贪心算法
// - 核心思路
// - 求出有多少不重复的区间，再用总数 - 不重复的区间数
// - 如何求出不重复区间数？
// 	- 跟据end进行升序排列
// 	- 找出跟end不重叠的区间，计数器++，改变end的值，继续遍历
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  // 如果为空，不需要改变
  if (!intervals.length) return 0;
  let endSortArr = intervals.sort((a, b) => a[1] - b[1]);

  // 计算有多少不重复的区间，至少为 开头的数量1
  let count = 1;
  let end_start = endSortArr[0][1];

  for (let item of endSortArr) {
    if (item[0] >= end_start) {
      count++;
      end_start = item[1];
    }
  }

  return endSortArr.length - count;
};
// @lc code=end
