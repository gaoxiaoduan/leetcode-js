/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
// 时间复杂度 O(N)
// 空间复杂度 O(1)

// 思路
// - 其实题目最后要找的还是不重叠的区间数
// - 这里要注意的是， xstart ≤ x ≤ xend就会射爆气球
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  let endSortArr = points.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let end_start = endSortArr[0][1];
  for (let item of endSortArr) {
    if (item[0] > end_start) {
      count++;
      end_start = item[1];
    }
  }

  return count;
};
// @lc code=end
