## [剑指 Offer 56 - II. 数组中数字出现的次数 II](https://leetcode.cn/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-ii-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 使用 map 统计数字出现的次数
- 然后找出，出现次数是 1 的数字返回

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const map = new Map();
  for (const num of nums) {
    map.set(num, map.has(num) ? map.get(num) + 1 : 1);
  }
  let res = 0;
  map.forEach((val, key) => {
    if (val === 1) return (res = key);
  });
  return res;
};
```
