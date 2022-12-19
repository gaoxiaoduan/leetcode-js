## [剑指 Offer 51. 数组中的逆序对](https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/) <Badge type="error">hard</Badge>

跟[493.翻转对](/leetcode-js/js-logs/sort#493翻转对)相似

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 在归并排序中处理
var reversePairs = function (nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const temp = new Array(n);
  let count = 0;

  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    // ---左右数组有序之前---
    // let start = lo, end = mid + 1;
    // while (start <= mid && end <= hi) {
    //     if (nums[start] > nums[end]) {
    //         count += mid + 1 - start;
    //         end++;
    //     } else {
    //         start++;
    //     }
    // }

    // 维护一个[mid+1,end)的区间，是nums[i] > num[j]逆序对
    let end = mid + 1;
    for (let start = lo; start <= mid; start++) {
      while (end <= hi && nums[start] > nums[end]) {
        end++;
      }
      count += end - (mid + 1);
    }

    // ---左右数组有序---
    let i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else if (temp[i] <= temp[j]) {
        nums[p] = temp[i++];
      }
    }
  };

  const sort = (lo, hi) => {
    // 单个元素不用排序
    if (lo === hi) return;
    // const mid = Math.floor(lo + (hi - lo) / 2);
    const mid = lo + ((hi - lo) >> 1);
    sort(lo, mid);
    sort(mid + 1, hi);
    // 合并[lo,mid][mid,hi]
    merge(lo, mid, hi);
  };

  // 归并
  sort(0, n - 1);
  return count;
};
```
