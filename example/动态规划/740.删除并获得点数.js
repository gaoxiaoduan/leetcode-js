/*
 * @lc app=leetcode.cn id=740 lang=javascript
 *
 * [740] 删除并获得点数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * 转换题目，其实就是打家劫舍问题

选中任意一个之后，必须删除$nums[i-1]$ 和 $nums[i]+1$其实就是不能选择相邻的元素
讲原数组转化成打劫劫舍的nums
统计出每个值的价值，然后求出最大价值
 */
var deleteAndEarn = function (nums) {
  // nums [3, 4, 2]
  // all  [0, 0, 2, 3, 4]
  let max = Math.max.apply(null, nums);
  let all = new Array(max + 1).fill(0);
  for (const val of nums) {
    all[val] += val;
  }
  return rob(all);
};

// 打家劫舍问题
var rob = function (nums) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0);

  dp[0] = 0;
  dp[1] = nums[0];
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }

  return dp[n];
};
// @lc code=end
