/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
//  时间复杂度 O(N^2)
//  空间复杂度 O(1)
//  思路
//  - 回文指的就是正反念都一样的串
//  - 我们可以根据这个特性使用左右指针共同向外扩散，来判断是否为一个回文串
//  - 我们还要考虑到，回文串长度的奇偶性
//  - 这里我们先编写一个函数，函数返回回文串，这里使用l，r两个函数，兼容了奇偶的情况
//  - 然后遍历这个字符串，分别找奇数情况(i,i)下的回文串，和偶数情况(i,i+1)下的回文串
//  - 然后保留最长的那一个回文串返回即可
var longestPalindrome = function (s) {
    let res = "";

    //  返回以l,r为中心的回文子串
    const help = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }
        // 退出循环时，[l-1,r+1]
        // substring是[i,j) ,所以l要+1
        return s.substring(l + 1, r);
    }

    for (let i = 0; i < s.length; i++) {
        let palindrome1 = help(i, i); // 以i为中心点的回文串
        let palindrome2 = help(i, i + 1); // 以[i,i+1]为中心点的回文子串
        res = palindrome1.length > res.length ? palindrome1 : res;
        res = palindrome2.length > res.length ? palindrome2 : res;
    }
    return res;
};
// @lc code=end

