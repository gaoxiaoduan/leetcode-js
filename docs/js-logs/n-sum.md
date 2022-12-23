---
nav: JavaScript题解
group:
  title: TODO
  order: 3
order: 3
toc: content
---

# nSum

## [1.两数之和](https://leetcode.cn/problems/two-sum/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路
- 使用 map 存放当前元素和对应的位置
- 每次循环先算出与之对应目标数，看看 map 中有没有存放，如果有，就返回 map 中存放的下标喝当前数字的下标
- 如果 map 中没有找到对应树，就在 map 中保留一份信息，等着别的数来配对

哈哈，跟相亲一样

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    let item = nums[i];
    let diffNum = target - item;

    if (map.has(diffNum)) {
      return [map.get(diffNum), i];
    } else {
      map.set(item, i);
    }
  }
};
```

泛化题：
如果假设输入一个数组 nums 和一个目标和 target，请你返回 nums 中能够凑出 target 的两个元素的值，
比如输入 nums = [5,3,1,6], target = 9，那么算法返回两个元素 [3,6]。
nums 中可能有多对儿元素之和都等于 target，请你的算法返回`所有`和为 target 的元素对儿，其中`不能出现重复`。

```js
/**
 * @param {*} nums
 * @param {*} target
 * @returns
 */
var twoSumTarget = function (nums, target) {
  nums.sort((a, b) => a - b);
  let lo = 0,
    hi = nums.length - 1;
  let res = [];
  while (lo < hi) {
    let left = nums[lo],
      right = nums[hi];
    let sum = left + right;

    if (sum === target) {
      res.push([left, right]);
      // 去除重复答案
      while (lo < hi && nums[lo] === left) lo++;
      while (lo < hi && nums[hi] === right) hi--;
    } else if (sum < target) {
      lo++;
    } else if (sum > target) {
      hi--;
    }
  }

  return res;
};
// test
let res = twoSumTarget([1, 1, 1, 2, 2, 3, 3], 4);
console.log('[ res ] >', res); // [ [ 1, 3 ], [ 2, 2 ] ]
```

## [15.三数之和](https://leetcode.cn/problems/3sum/) <Badge type="warning">medium</Badge>

- 使用改造 twoSum 的解法
- 先把根据当前 nums[i]找出 target 为`0-nums[i]`的数组
- 然后再把 nums[i]加入找到的数组中
- 注意:如果 nums[i]和 nums[i+1]如果相等，结果会重复，所以需要跳过相邻的

```js
// 使用改造twoSum的解法
var twoSumTarget = function (nums, start, target) {
  let lo = start,
    hi = nums.length - 1;
  let res = [];
  while (lo < hi) {
    let left = nums[lo],
      right = nums[hi];
    let sum = left + right;

    if (sum === target) {
      res.push([left, right]);
      // 去除重复答案
      while (lo < hi && nums[lo] === left) lo++;
      while (lo < hi && nums[hi] === right) hi--;
    } else if (sum < target) {
      lo++;
    } else if (sum > target) {
      hi--;
    }
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let twoSumRes = twoSumTarget(nums, i + 1, 0 - nums[i]);

    for (const item of twoSumRes) {
      item.push(nums[i]);
      res.push(item);
    }

    // 去除重复答案
    while (i < len - 1 && nums[i] === nums[i + 1]) i++;
  }

  return res;
};
```

根据`twoSumTarget`构造`threeSumTarget`

```js
var threeSumTarget = function (nums, target) {
  nums.sort((a, b) => a - b);
  const res = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let twoSumRes = twoSumTarget(nums, i + 1, target - nums[i]);

    for (const item of twoSumRes) {
      item.push(nums[i]);
      res.push(item);
    }

    // 去除重复答案
    while (i < len - 1 && nums[i] === nums[i + 1]) i++;
  }

  return res;
};
```

## [18.四数之和](https://leetcode.cn/problems/4sum/) <Badge type="warning">medium</Badge>

- 根据上面构造的`threeSumTarget`去解
- 思路跟[15.三数之和](#15三数之和)相同
- 这里就省略`threeSumTarget`了，可以直接使用上面构造好的

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);
  const res = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    // threeSumTarget使用上面构造好的，此处省略
    let threeSumRes = threeSumTarget(nums, i + 1, target - nums[i]);
    for (const item of threeSumRes) {
      item.push(nums[i]);
      res.push(item);
    }
    // 去除重复答案
    while (i < len - 1 && nums[i] === nums[i + 1]) i++;
  }

  return res;
};
```
