/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 元素【无重】【不可复选】
/**
 * 思路
 * - 跟78题.子集问题类似
 * - 其实就是收集指定层数K的子集
 * - 大小为 k 的组合就是大小为 k 的子集
 */
var combine = function (n, k) {
  let res = [];

  const backTrack = (start, track) => {
    // base case
    if (k === track.length) {
      res.push([...track]);
      return;
    }
    for (let i = start; i <= n; i++) {
      // 做选择
      track.push(i);
      backTrack(i + 1, track);
      // 撤销选择
      track.pop();
    }
  };

  backTrack(1, []);
  return res;
};
// @lc code=end
