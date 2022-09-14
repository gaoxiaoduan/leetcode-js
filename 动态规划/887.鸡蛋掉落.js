/*
 * @lc app=leetcode.cn id=887 lang=javascript
 *
 * [887] 鸡蛋掉落
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */

// dp递归
// 时间复杂度 O(kn^2)
// 空间复杂度 O(kn)
// var superEggDrop = function (k, n) {
//   let memo = new Map(); // 备忘录消除重叠子问题

//   // 表示当鸡蛋为k，楼层为n时，最小的操作次数
//   function dp(k, n) {
//     // base case
//     if (k === 1) return n; // 就一个鸡蛋，需要线性查找，所以返回楼层n
//     if (n === 0) return 0; // 楼层为0，不需要操作

//     if (memo.has(k + "" + n)) {
//       return memo.get(k + "" + n);
//     }

//     let res = Infinity;
//     for (let i = 1; i <= n; i++) {
//       res = Math.min(
//         res,
//         Math.max(
//           dp(k - 1, i - 1), // 碎了
//           dp(k, n - i) // 没碎
//         ) + 1
//       );
//     }

//     memo.set(k + "" + n, res);
//     return res;
//   }

//   return dp(k, n);
// };

// dp递归+二分查找
// 时间复杂度 O(k * n * logn)
// 空间复杂度 O(kn)
var superEggDrop = function (k, n) {
  let memo = new Map(); // 备忘录消除重叠子问题

  // 表示当鸡蛋为k，楼层为n时，最小的操作次数
  function dp(k, n) {
    // base case
    if (k === 1) return n; // 就一个鸡蛋，需要线性查找，所以返回楼层n
    if (n === 0) return 0; // 楼层为0，不需要操作

    if (memo.has(k + "" + n)) {
      return memo.get(k + "" + n);
    }

    let res = Infinity;
    let lo = 1,
      hi = n;
    while (lo <= hi) {
      let mid = Math.floor((lo + hi) / 2);
      let broken = dp(k - 1, mid - 1); // 碎了
      let noBroken = dp(k, n - mid); // 没碎
      // res = min(max(borken,noBroken) + 1);
      // 如果碎的结果比较多,直接从碎的结果里面求最小操作次树即可，因为我们要考虑的是最坏情况下
      if (broken > noBroken) {
        hi = mid - 1;
        res = Math.min(res, broken + 1);
      } else {
        lo = mid + 1;
        res = Math.min(res, noBroken + 1);
      }
    }

    memo.set(k + "" + n, res);
    return res;
  }

  return dp(k, n);
};

// @lc code=end
// superEggDrop(3, 14);
