## [001.整数除法](https://leetcode.cn/problems/xoh6Oh/) <Badge type="success">easy</Badge>

- 思路
- [题解](https://leetcode.cn/problems/xoh6Oh/solution/wei-yun-suan-kuai-su-xiang-jian-fa-by-ch-fv8h/)

```js
const MAX_VAL = Math.pow(2, 31) - 1,
  MIN_VAL = -Math.pow(2, 31);
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var divide = function (a, b) {
  if (b === 1) return a;
  if (b === -1) return a === MIN_VAL ? MAX_VAL : -a;
  if (a === 0) return 0;

  // 判断正负
  const flag = (a ^ b) >= 0;
  a = a < 0 ? a : -a;
  b = b < 0 ? b : -b;

  let res = 0;
  while (a <= b) {
    let base = 1;
    let divisor = b;
    while (a - divisor <= divisor) {
      base <<= 1;
      divisor <<= 1;
    }
    res += base;
    a -= divisor;
  }
  return flag ? res : -res;
};
```
