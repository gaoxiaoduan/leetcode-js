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
