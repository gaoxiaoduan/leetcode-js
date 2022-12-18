## [剑指 Offer 60. n 个骰子的点数](https://leetcode.cn/problems/nge-tou-zi-de-dian-shu-lcof/) <Badge type="warning">medium</Badge>

- 首先，一个骰子能扔出的点数是 1~6，
- 那么 n 个骰子扔出点数 point 的概率
- 就可以通过 n - 1 个骰子扔出点数 point-1, point-2,... point-6 的概率分别乘以 1/6 再相加得到。

```js
/**
 * @param {number} n
 * @return {number[]}
 */
var dicesProbability = function (n) {
  const min = n,
    max = n * 6;
  const memo = new Array(n + 1).fill().map((_) => new Array(max + 1).fill(0));

  // 用n个骰子，抛出point点数到概率
  const dp = (n, point) => {
    if (point <= 0) return 0;
    if (n === 1) {
      if (point > 6) return 0;
      return 1 / 6.0;
    }
    if (memo[n][point] !== 0) return memo[n][point];

    let procent = 0;
    for (let i = 1; i <= 6; i++) {
      procent += (dp(n - 1, point - i) * 1) / 6.0;
    }
    memo[n][point] = procent;
    return procent;
  };

  const res = new Array(max - min + 1);
  for (let i = 0; i < res.length; i++) {
    res[i] = dp(n, min + i);
  }
  return res;
};
```
