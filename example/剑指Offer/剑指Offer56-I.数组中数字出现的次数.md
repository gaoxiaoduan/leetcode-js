## [剑指 Offer 56 - I. 数组中数字出现的次数](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 将数字分成两组，不同的数字在不同组，相同的数字在相同组
- 然后对这两组进行异或，两组最后的异或结果就是两个不同的数字
- 根据什么规律进行分组？
  - 若两个不同的数字`x !== y`,说明 x 和 y 二进制中至少有一位不同，可以根据这个特性进行拆分
- 声明 m 变量找出这所有异或结果 x 中最低位的 1

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function (nums) {
  let x = nums.reduce((pre, cur) => (pre ^= cur), 0);

  // 获取x中最低位的1,用来将两个不同的数字进行分组
  let m = 1;
  while ((x & m) === 0) {
    m <<= 1;
  }

  let a = 0,
    b = 0;
  for (const item of nums) {
    if ((item & m) === 0) a ^= item;
    else b ^= item;
  }

  return [a, b];
};
```
