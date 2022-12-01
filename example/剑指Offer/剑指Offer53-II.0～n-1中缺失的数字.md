## [剑指 Offer 53 - II. 0 ～ n-1 中缺失的数字](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/) <Badge type="success">easy</Badge>

- 思路
- 因为异或满足交换律
- a ^ b ^ a = b ^ (a ^ a);
- 所以可以将数组内的元素跟[0,n]异或一下
- 结果就是丢失的数字
- 跟[268.丢失的数字](/js-logs/bit-manipulation#268丢失的数字)相同

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const n = nums.length;
  let res = 0;
  res ^= n;
  for (let i = 0; i < n; i++) {
    res ^= nums[i] ^ i;
  }

  return res;
};
```

- 两个等差数列
- `sum(nums) - sum([0,n])`就是缺的那个元素

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber1 = function (nums) {
  let sumNums = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sumNums += nums[i];
    sum += i + 1;
  }
  return sum - sumNums;
};
```
