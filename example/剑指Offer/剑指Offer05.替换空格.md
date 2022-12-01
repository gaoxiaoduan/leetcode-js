## [剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/) <Badge type="success">easy</Badge>

- 思路
- 由于字符串具有不可修改的特性
- 所以先把字符串打散成数组，然后去修改空格键部分
- 最后拼接返回即可
- 或者直接使用 replaceAll 替换

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function (s) {
  // return s.replaceAll(' ', '%20');
  const res = s.split('');
  for (let i = 0; i < res.length; i++) {
    if (res[i] === ' ') {
      res[i] = '%20';
    }
  }
  return res.join('');
};
```
