## [剑指 Offer 58 - I. 翻转单词顺序](https://leetcode.cn/problems/fan-zhuan-dan-ci-shun-xu-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路
- 先将 单词 split(分割)成数组，然后对数组进行反转，在join就行
- 还可以通过反转两次完成，一次对处理过空格的数组整体翻转，一次对单词进行单独翻转
- 跟[151.反转字符串中的单词](/js-logs/string#151反转字符串中的单词)相同

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    return s.trim().split(/\s+/).reverse().join(' ');
};
```
