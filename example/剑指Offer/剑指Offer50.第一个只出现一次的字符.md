## [剑指 Offer 50. 第一个只出现一次的字符](https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/) <Badge type="success">easy</Badge>

考察map的使用
跟[387.字符串中的第一个唯一字符](https://leetcode.cn/problems/first-unique-character-in-a-string/)相似

```js
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
    let map = new Map();
    for (const item of s) {
        if (map.has(item)) {
            // 已经出现过就累加
            map.set(item, map.get(item) + 1);
        } else {
            map.set(item, 1);
        }
    }

    let res = ' ';
    for (let [key, value] of map) {
        if (value === 1) {
            return res = key
        }
    }
    return res;
};
```
