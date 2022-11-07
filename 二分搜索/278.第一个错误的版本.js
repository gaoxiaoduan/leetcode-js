/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function (n) {
        let l = 1, r = n;
        while (l < r) {
            const mid = Math.floor(l + (r - l) / 2)
            if (isBadVersion(mid)) { // 结果在[l,mid]
                r = mid;
            } else {
                l = mid + 1; // 结果在[mid+1,r]
            }
        }
        // 此时l=r,返回其中一个点即可
        return l;
    };
};
// @lc code=end

