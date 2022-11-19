// 剑指 Offer 15. 二进制中1的个数: https://leetcode.cn/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/
// 本题与主站 191 题相同：https://leetcode-cn.com/problems/number-of-1-bits/
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
