## [剑指 Offer 17. 打印从1到最大的n位数](https://leetcode.cn/problems/da-yin-cong-1dao-zui-da-de-nwei-shu-lcof/) <Badge type="success">easy</Badge>


```js
/**
 * @param {number} n
 * @return {number[]}
 */
var printNumbers = function (n) {
  const res = [];
  // 生成 n位9 如：n=3 ==> 999
  let end = new Array(n).fill("9").join("");
  for (let i = 1; i <= Number(end); i++) {
    res.push(i);
  }
  return res;
};
```
