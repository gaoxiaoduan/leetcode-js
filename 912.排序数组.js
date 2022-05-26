/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

var sortArray = function (nums) {
  const temp = new Array(nums.length);

  const merge = function (lo, mid, hi) {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    let i = lo,
      j = mid + 1;

    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[j] < temp[i]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);

    // [lo,mid]有序
    sort(lo, mid);
    // [mid+1,hi]有序
    sort(mid + 1, hi);
    // 合并两个有序数组
    merge(lo, mid, hi);
  };

  sort(0, nums.length - 1);

  return nums;
};

// 归并排序--使用了shift方法，比较慢
// var sortArray = function (nums) {
//   if (nums.length <= 1) return nums;
//   let mid = Math.floor(nums.length / 2);
//   let left = sortArray(nums.slice(0, mid));
//   let right = sortArray(nums.slice(mid));
//   return merge(left, right);
// };
// const merge = (left, right) => {
//   let res = [];
//   while (left.length && right.length) {
//     res.push(left[0] < right[0] ? left.shift() : right.shift());
//   }
//   return res.concat(left, right);
// };
// @lc code=end


var sortArray = function (nums) {
  quickSort(nums, 0, nums.length - 1);
  return nums;
};

// // 快速排序
// const quickSort = (nums, lo, hi) => {
//   if (lo >= hi) return;

//   // 对[lo,hi]根据p进行划分
//   // nums[lo,p-1] <= nums[p] < nums[p,hi];
//   const p = partition(nums, lo, hi);

//   quickSort(nums, lo, p - 1);
//   quickSort(nums, p + 1, hi);
// }

// // 对[lo,hi]进行区分
// const partition = (nums, lo, hi) => {
//   let p = nums[lo];
//   let i = lo + 1, j = hi;
//   while (i <= j) {
//       while (i < hi && nums[i] <= p) {
//           i++;
//           // 结束时，nums[i] > p
//       }
//       while (j > lo && nums[j] > p) {
//           j--;
//           // 结束时，nums[j] <= p;
//       }
//       // 此时 nums[i] <= p < nums[j]
//       if (i >= j) {
//           break;
//       }
//       swap(nums, i, j);
//   }
//   swap(nums, lo, j);
//   return j;
// }

// const swap = (nums, i, j) => {
//   const temp = nums[i];
//   nums[i] = nums[j];
//   nums[j] = temp;
// }