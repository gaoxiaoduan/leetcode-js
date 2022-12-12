## [剑指 Offer 66. 构建乘积数组](https://leetcode.cn/problems/gou-jian-cheng-ji-shu-zu-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路（前缀和）
- 分别构建从左到右，和从右到左的前缀积
- 例如原数组是： `[1,2,3,4,5]`
- 从左到右的前缀积 prefix[i]是 a[0...i]的元素积
  - prefix: `[ 1, 2, 6, 24, 120 ]`
- 从右到左的前缀积,suffix[i]是 a[i...n-1]的元素积
  - suffix: `[ 120, 120, 60, 20, 5 ]`
- 最后在 res 中，除了自己，将左侧和右侧的元素相乘
- 跟[238.除自身以外数组的乘积](/js-logs/array#238除自身以外数组的乘积)相同

```js
/**
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function (a) {
  const n = a.length;
  if (n === 0) return [];
  // 假设 a => [1,2,3,4,5]
  // 从左到右的前缀积 prefix[i]是a[0...i]的元素积
  const prefix = Array(n); // => [ 1, 2, 6, 24, 120 ]
  prefix[0] = a[0];
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * a[i];
  }

  // 从右到左的前缀积,suffix[i]是a[i...n-1]的元素积
  const suffix = Array(n); // => [ 120, 120, 60, 20, 5 ]
  suffix[n - 1] = a[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * a[i];
  }

  const res = Array(n);
  res[0] = suffix[1];
  res[n - 1] = prefix[n - 2];
  for (let i = 1; i < n - 1; i++) {
    // 除了nums[i]自己，左侧和右侧的所有元素的积
    res[i] = prefix[i - 1] * suffix[i + 1];
  }
  return res;
};
```
