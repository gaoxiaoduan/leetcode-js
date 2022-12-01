## [剑指 Offer 53 - I. 在排序数组中查找数字 I](https://leetcode.cn/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(2\* logN) => O(logN)
空间复杂度 O(1)

- 思路(二分查找)
- 跟[34.在排序数组中查找元素的第一个和最后一个位置](/js-logs/binary-search#34在排序数组中查找元素的第一个和最后一个位置)相似
- 用二分法，分别搜索 target 的左右边界
- 如果搜索的边界有效就返回 左右边界区间的长度
- 如果搜索的边界为-1，说明搜索越界，返回 0 即可

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (nums.length === 0) return 0;
  const left = leftSearch(nums, target);
  const right = rightSearch(nums, target);
  if (left === -1 || right === -1) return 0;
  return right - left + 1;
};

// 返回左边界的索引
var leftSearch = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      // 收缩左边界，缩小范围[left,mid-1]
      right = mid - 1;
    } else if (nums[mid] > target) {
      // mid太大了，缩小范围[left,mid-1]
      right = mid - 1;
    } else if (nums[mid] < target) {
      // mid太小了，扩大范围[mid+1,right]
      left = mid + 1;
    }
  }
  // left的范围是[0,nums.length]
  return nums[left] === target ? left : -1;
};

// 返回右边界的索引
var rightSearch = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      // 收缩左边界，缩小范围[mid+1,right]
      left = mid + 1;
    } else if (nums[mid] > target) {
      // mid太大了，缩小范围[left,mid-1]
      right = mid - 1;
    } else if (nums[mid] < target) {
      // mid太小了，扩大范围[mid+1,right]
      left = mid + 1;
    }
  }
  // right的范围是[-1,nums.length-1]
  return nums[right] === target ? right : -1;
};
```

时间复杂度 O(N)
空间复杂度 O(1)

- 普通思路
- 遍历数组
- 如果 num===target，res 就累加

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      res += 1;
    }
  }
  return res;
};
```
