## [剑指 Offer 44. 数字序列中某一位的数字](https://leetcode.cn/problems/shu-zi-xu-lie-zhong-mou-yi-wei-de-shu-zi-lcof/) <Badge type="warning">medium</Badge>

跟[264.丑数-ii](/js-logs/dynamic-programming#264丑数-ii)相同

```js
/**
 * @param {number} n
 * @return {number}
 */
// 先求出数字的长度
// 规律
// [1..9]       = 9 * 1个数    => 9 * 1 * 1     => 9 * 10^0 * 1
// [10..99]     = 90 * 2个数   => 9 * 10 * 2    => 9 * 10^1 * 2
// [100..999]   = 900 * 3个数  => 9 * 100 * 3   => 9 * 10^2 * 3
// [1000..9999] = 9000 * 4个数 => 9 * 1000 * 4  => 9 * 10^3 * 4
var findNthDigit = function (n) {
  let k = 1; // 表明当前是 几位数字： 9=>1, 99=>2 ...
  let digit = 1; // 表示位因数： 9=>1,99=>10 ..
  while (n - 9 * digit * k >= 0) {
    n = n - 9 * digit * k;
    k++;
    digit *= 10;
  }

  let target = Math.pow(10, k - 1) + Math.floor(n / k); // 第n位所在的数字
  let index = n % k; // 在target中的第几位

  // index:0 说明【第n位的数字】位于target前一个数字的最后一位
  if (index === 0) {
    let str = String(target - 1);
    return Number(str[str.length - 1]);
  } else {
    let str = String(target);
    return Number(str[index - 1]);
  }
};
```
