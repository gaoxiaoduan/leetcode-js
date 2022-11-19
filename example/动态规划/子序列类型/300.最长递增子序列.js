/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * 动态规划
 * dp[i] 表示nums 前i个元素的最长递增子序列数
 * base case：全部初始化为1，因为前i个元素至少为1
 * 动态转移方程 dp[i] = max(dp[i], xxx)；
 * 最后根据dp数组找出nums.length中最大的那个值
 */
// 动态规划标准解法
// 时间复杂度O(N^2)
var lengthOfLIS = function (nums) {
  // 定义dp[i]表示已nums[i]结尾的最长递增子序列的个数
  // 初始化设置为1，表示至少包含自己元素
  let dp = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    // 假设dp[0...i-1]已经有值，想办法求出dp[i]
    // 找出比nums[i]小的值，给这些 比nums[i]小的值 都加上+1，其中最大值为dp[i]的值
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // dp[0...i]已经计算完毕，求出其中的最大值
  let res = 0;
  for (const item of dp) {
    res = Math.max(res, item);
  }
  return res;
};

//********************************************** */
// 耐心排序（patience sorting）解法
// 时间复杂度O(N*logN)
var lengthOfLIS1 = function (nums) {
  let top = new Array(nums.length); // 牌顶的牌
  let p = 0; // 牌堆的数量
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    // 设置左右边界 右边界为牌堆的数量
    let left = 0,
      right = p;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (top[mid] > current) {
        right = mid; // 缩小right
      } else if (top[mid] < current) {
        left = mid + 1; // 缩小left
      } else if (top[mid] === current) {
        right = mid;
      }
    }

    // 如果没找到合适的牌，新建一堆
    if (left === p) p++;
    top[left] = current;
  }
  return p;
};
// @lc code=end
