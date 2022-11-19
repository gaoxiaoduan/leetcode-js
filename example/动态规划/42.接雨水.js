/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
// 思路：
// 对于任意位置i
// water[i] = min( max(height[0,i]), max(height[i,end]) ) - height[i];
var trap = function (height) {
  const n = height.length;
  if (n === 0) return 0;

  let res = 0;
  const l_max = new Array(n).fill(0);
  const r_max = new Array(n).fill(0);
  // 初始化
  l_max[0] = height[0];
  r_max[n - 1] = height[n - 1];

  // 从左往右分别计算出l_max
  for (let i = 1; i < n; i++) {
    l_max[i] = Math.max(height[i], l_max[i - 1]);
  }
  for (let i = n - 2; i >= 0; i--) {
    r_max[i] = Math.max(height[i], r_max[i + 1]);
  }

  for (let i = 1; i < n - 1; i++) {
    res += Math.min(l_max[i], r_max[i]) - height[i];
  }
  return res;
};
// @lc code=end
