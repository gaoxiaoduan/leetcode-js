## [002.二进制加法](https://leetcode.cn/problems/JFETK5/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路(模拟十进制加法)
- 这里「逢二进一」，低位对齐，开始计算
- 进位用`carry`表示，那么个位置的答案其实是「carry + a[i] + b[i] % 2」
- 每个位置计算完，carry 要计算出来`carry / 2`,也就是右移一位`carry >> 1`
- 最后计算完毕，若 carry 不为 0，说明最高位需要进位 1，在 res 结果中补 1
- 最后反转结果，拼成字符串返回

```js
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
// 模拟十进制加法
var addBinary = function (a, b) {
  let res = [];
  let carry = 0; // 进位
  let m = a.length - 1,
    n = b.length - 1;
  while (m >= 0 || n >= 0) {
    if (m >= 0) {
      carry += Number(a[m]);
      m--;
    }
    if (n >= 0) {
      carry += Number(b[n]);
      n--;
    }
    res.push((carry % 2) + '');
    carry = carry >> 1;
  }
  if (carry > 0) {
    res.push('1');
  }

  return res.reverse().join('');
};
```
