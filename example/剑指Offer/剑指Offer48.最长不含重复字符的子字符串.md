## [剑指 Offer 48. 最长不含重复字符的子字符串](https://leetcode.cn/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/) <Badge type="warning">medium</Badge>

滑动窗口
跟[3.无重复字符的最长子串](/js-logs/sliding-window#3无重复字符的最长子串)相同

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const window = new Map();
    let left = 0, right = 0;
    let res = 0;
    while (right < s.length) {
        const c = s[right];
        // 窗口增大
        right++;
        window.set(c, window.has(c) ? window.get(c) + 1 : 1);

        // 判断窗口是否要缩小
        while (window.get(c) > 1) {
            const d = s[left];
            left++;
            window.set(d, window.get(d) - 1);
        }
        res = Math.max(res, right - left);
    }

    return res;
};
```
