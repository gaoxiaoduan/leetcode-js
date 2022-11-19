/*
 * @lc app=leetcode.cn id=327 lang=javascript
 *
 * [327] 区间和的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function (nums, lower, upper) {
  const len = nums.length;
  let preSum = new Array(len + 1).fill(0);
  const temp = new Array(preSum.length);
  for (let i = 0; i < len; i++) {
    preSum[i + 1] = nums[i] + preSum[i];
  }

  let count = 0;

  const merge = (nums, lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    // // 这段代码会超时
    // for (let i = lo; i <= mid; i++) {
    //     for (let j = mid + 1; j <= hi; j++) {
    //         const diff = nums[j] - nums[i];
    //         if (diff >= lower && diff <= upper) {
    //             count++;
    //         }
    //     }
    // }

    let start = mid + 1;
    let end = mid + 1;
    for (let i = lo; i <= mid; i++) {
      while (start <= hi && nums[start] - nums[i] < lower) {
        start++;
      }
      while (end <= hi && nums[end] - nums[i] <= upper) {
        end++;
      }
      count += end - start;
    }

    let i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
    }
  };

  const sort = (nums, lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);
    sort(nums, lo, mid);
    sort(nums, mid + 1, hi);
    merge(nums, lo, mid, hi);
  };

  sort(preSum, 0, preSum.length - 1);

  return count;
};
// @lc code=end
