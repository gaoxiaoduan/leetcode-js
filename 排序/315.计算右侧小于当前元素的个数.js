/*
 * @lc app=leetcode.cn id=315 lang=javascript
 *
 * [315] 计算右侧小于当前元素的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  const len = nums.length;
  const counts = new Array(len).fill(0);
  const temp = new Array(len);
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = {
      index: i,
      val: nums[i],
    };
  }
  const merge = (lo, mid, hi) => {
    for (let i = lo; i <= hi; i++) {
      temp[i] = arr[i];
    }

    let i = lo,
      j = mid + 1;
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        arr[p] = temp[j++];
      } else if (j === hi + 1) {
        arr[p] = temp[i++];
        counts[arr[p].index] += j - (mid + 1);
      } else if (temp[i].val > temp[j].val) {
        arr[p] = temp[j++];
      } else {
        arr[p] = temp[i++];
        counts[arr[p].index] += j - (mid + 1);
      }
    }
  };

  const sort = (lo, hi) => {
    if (lo === hi) return;
    let mid = Math.floor(lo + (hi - lo) / 2);

    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  };

  sort(0, len - 1);

  return counts;
};
// @lc code=end
