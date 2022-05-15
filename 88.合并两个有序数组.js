/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 双指针法
var merge = function (nums1, m, nums2, n) {
  let p1 = 0,
    p2 = 0;
  let sortArr = new Array(m + n).fill(0);
  let cur;
  while (p1 < m || p2 < n) {
    let n1 = nums1[p1];
    let n2 = nums2[p2];
    if (p1 === m) {
      // 当p1走到头
      cur = n2;
      p2++;
    } else if (p2 === n) {
      // 当p2走到头
      cur = n1;
      p1++;
    } else if (n1 < n2) {
      // 当n1小于n2，则当前数字为n1
      cur = n1;
      p1++;
    } else {
      // 当n1大于n2，则当前数字为n2
      // 当n1等于n2，随意取一个，这里就取n2
      cur = n2;
      p2++;
    }
    sortArr[p1 + p2 - 1] = cur;
  }

  for (let i = 0; i < sortArr.length; i++) {
    nums1[i] = sortArr[i];
  }
};
// ----------------------------------------------------------------
// 这里将nums2截取到nums1中，然后排序
var merge1 = function (nums1, m, nums2, n) {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
};

// @lc code=end
