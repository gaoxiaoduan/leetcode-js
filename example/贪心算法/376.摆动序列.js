/*
 * @lc app=leetcode.cn id=376 lang=javascript
 *
 * [376] 摆动序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 贪心
var wiggleMaxLength = function (nums) {
    const n = nums.length;
    if (n < 2) return n;

    let preDiff = nums[1] - nums[0];
    // base case
    // 若前两位数差为0，那么最长的摆动子序列就是1，否则就是前两位数字
    let res = preDiff !== 0 ? 2 : 1;

    for (let i = 2; i < n; i++) {
        const diff = nums[i] - nums[i - 1]; // 当前i与i-1的差
        //若diff与preDiff是【峰】【谷】的或是【谷】【峰】的，res+1
        if ((diff > 0 && preDiff <= 0) || (diff < 0 && preDiff >= 0)) {
            res++;
            preDiff = diff;
        }
    }

    return res;
};
// @lc code=end

