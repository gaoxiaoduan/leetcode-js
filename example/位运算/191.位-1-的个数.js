/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
// n & (n-1) 消除数字 n 的二进制表示中的最后一个 1
// 不断消除数字 n 中的 1，直到 n 变为 0。
// ![](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210251640239.png)
var hammingWeight = function (n) {
  let res = 0;
  while (n !== 0) {
    n = n & (n - 1);
    res++;
  }
  return res;
};
// @lc code=end
