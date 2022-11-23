## [剑指 Offer 38. 字符串的排列](https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/) <Badge type="warning">medium</Badge>

跟47.全排列-ii 类似

```js
/**
 * @param {string} s
 * @return {string[]}
 */
// 元素【可重】【不可复选】
var permutation = function (s) {
  const res = [];
  // 对s进行排序
  s = s.split("").sort().join("");

  // 记录使用情况，防止使用重复元素
  const used = new Array(s.length).fill(false);
  const backTrack = (track) => {
    if (track.length === s.length) {
      res.push(track.join(""));
    }
    for (let i = 0; i < s.length; i++) {
      // 剪枝
      if (i > 0 && s[i] === s[i - 1] && !used[i - 1]) continue;
      // 保证元素不重复
      if (used[i]) continue;
      // 做选择
      track.push(s[i]);
      used[i] = true;
      backTrack(track);
      // 撤销选择
      track.pop();
      used[i] = false;
    }
  };
  backTrack([]);
  return res;
};
```
