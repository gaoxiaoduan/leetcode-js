## [剑指 Offer 39. 数组中出现次数超过一半的数字](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/solution/) <Badge type="success">easy</Badge>

时间复杂度 O(N\*logN)
空间复杂度 O(logN)

- 思路
- 排序后，取中间元素，无论数字长度是奇偶，都是超过一半的数字

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const sort = nums.sort((a, b) => a - b);
  return sort[nums.length >> 1];
};
```
