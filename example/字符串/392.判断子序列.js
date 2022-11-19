/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 双指针解法
var isSubsequence = function (s, t) {
    let p1 = 0, // p1为s的头指针
        p2 = 0; // p2为t的头指针

    while (p1 < s.length && p2 < t.length) {
        if (s[p1] === t[p2]) {
            p1++;
        }
        p2++;
    }

    return p1 === s.length;
};
// @lc code=end

