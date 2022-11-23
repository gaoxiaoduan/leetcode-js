---
nav: JavaScript题解
group:
  title: 基础算法
  order: 1
order: 0
---

# 二分搜索

## [704.二分查找](https://leetcode.cn/problems/binary-search/) <Badge type="success">easy</Badge>

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return -1;
};
```

## [35.搜索插入位置](https://leetcode.cn/problems/search-insert-position/) <Badge type="success">easy</Badge>

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else if (nums[mid] < target) {
      l = mid + 1;
    }
  }
  return l;
};
```

## [34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/) <Badge type="warning">medium</Badge>

跟[剑指 Offer 53 - I. 在排序数组中查找数字 I](/js-logs/sword-point-offer#剑指-offer-53---i-在排序数组中查找数字-i)相似

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  if (nums.length === 0) return [-1, -1];
  return [leftSearch(nums, target), rightSearch(nums, target)];
};

var leftSearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1;
    } else if (nums[mid] === target) {
      // 搜索区间变为 [left, mid-1]
      right = mid - 1; //注意
    }
  }

  // left 是的区间是[0,nums.length]
  // if (left === nums.length) return -1; // 越界
  return nums[left] === target ? left : -1;
};

var rightSearch = (nums, target) => {
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      left = mid + 1; //注意
    }
  }

  // if (left - 1 < 0) return -1;// 防止越界
  // return nums[left - 1] === target ? right : -1;
  // 当while结束时，left-1=right;
  // if (right < 0) return -1;// 防止越界
  return nums[right] === target ? right : -1;
};
```

## [154.寻找旋转排序数组中的最小值-ii](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/) <Badge type="error">hard</Badge>

二分法寻找最小值

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 二分法寻找最小值
var findMin = function (nums) {
  let n = nums.length;
  if (n === 1) return nums[0];
  // 原：[0,1,2,2,2,2,3,4,5,6]
  // 后：[2,3,4,5,6,0,1,2,2,2]
  // [2,3,4,5,6,0,1,2,2,2]
  //  l       m    >    r  ==> l=m+1;
  // [2,3,4,5,6,0,1,2,2,2]
  //            l   m = r  ==> r=r-1;
  // [2,3,4,5,6,0,1,2,2,2]
  //            l m < r  ==> r=m;
  // [2,3,4,5,6,0,1,2,2,2]
  //            l
  //            m<r  ==> r = m;
  // 最后l=r;停止寻找

  let left = 0,
    right = n - 1;
  while (left < right) {
    // let mid = Math.floor((left + right) / 2);
    let mid = (left + right) >> 1;
    console.log(left, mid, right);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else if (nums[mid] === nums[right]) {
      right = right - 1;
    }
  }

  return nums[right];
};
```

## [278.第一个错误的版本](https://leetcode.cn/problems/first-bad-version/) <Badge type="success">easy</Badge>

```js
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let l = 1,
      r = n;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (isBadVersion(mid)) {
        // 结果在[l,mid]
        r = mid;
      } else {
        l = mid + 1; // 结果在[mid+1,r]
      }
    }
    // 此时l=r,返回其中一个点即可
    return l;
  };
};
```
