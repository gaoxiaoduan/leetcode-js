## [剑指 Offer 43. 1 ～ n 整数中 1 出现的次数](https://leetcode.cn/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/) <Badge type="error">hard</Badge>

[官方题解](https://leetcode.cn/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/solution/1n-zheng-shu-zhong-1-chu-xian-de-ci-shu-umaj8/)

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202212201053637.png" style="max-width:100%" />
  <div align=center>公式</div>
</div>

跟[233. 数字 1 的个数](/js-logs/math#233-数字-1-的个数)相同

```js
/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function (n) {
  let digit = 1; // 位因子
  let res = 0;

  for (let k = 0; digit <= n; k++) {
    let forwardDigit = digit * 10;
    res +=
      Math.floor(n / forwardDigit) * digit +
      Math.min(Math.max((n % forwardDigit) - digit + 1, 0), digit);
    digit *= 10;
  }
  return res;
};
```
