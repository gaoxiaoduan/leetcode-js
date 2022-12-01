## [剑指 Offer 15. 二进制中1的个数](https://leetcode.cn/problems/er-jin-zhi-zhong-1de-ge-shu-lcof/) <Badge type="success">easy</Badge>

- 思路
- n & (n-1) 消除数字 n 的二进制表示中的最后一个 1
- 不断消除数字 n 中的 1，直到 n 变为 0。
- 跟[191. 位-1-的个数](/js-logs/bit-manipulation#191位-1-的个数)相同

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210251640239.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let res = 0;
  while (n !== 0) {
    n = n & (n - 1);
    res++;
  }
  return res;
};
```
