## [剑指 Offer 64. 求1+2+…+n](https://leetcode.cn/problems/qiu-12n-lcof/) <Badge type="warning">medium</Badge>

时间复杂度O(n) 递归的次数
空间复杂度O(n) 递归栈的深度

- 思路
- 使用&&的特性做为递归出口

```js
/**
 * @param {number} n
 * @return {number}
 */
var sumNums = function (n) {
    // 使用了三元，不符合题目要求
    // return n === 0 ? 0 : n + sumNums(n - 1);
    // 使用&&的短路特性 修改递归出口
    n && (n = n + sumNums(n - 1));
    return n;
};
```
