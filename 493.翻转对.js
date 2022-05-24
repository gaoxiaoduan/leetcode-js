/*
 * @lc app=leetcode.cn id=493 lang=javascript
 *
 * [493] 翻转对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  const len = nums.length;
  const temp = new Array(len);
  let count = 0;

  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    // ----左右数组有序之后----
    let start = lo,
      end = mid + 1;

    while (start <= mid && end <= hi) {
      if (nums[start] > 2 * nums[end]) {
        count += mid + 1 - start;
        end++;
      } else {
        start++;
      }
    }

    // ----合并之前----
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

  const sort = (lo, hi) => {
    if (lo === hi) return;
    const mid = Math.floor(lo + (hi - lo) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };
  sort(0, len - 1);
  return count;
};
// @lc code=end
