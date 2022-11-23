## [剑指 Offer II 083. 没有重复元素集合的全排列](https://leetcode.cn/problems/VvJkup/) <Badge type="warning">medium</Badge>

[本题与主站 46 题相同](https://leetcode-cn.com/problems/permutations/)

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 元素【无重】【不可复选】
var permute = function (nums) {
  let res = [];

  var backTrack = function (nums, track) {
    if (track.length === nums.length) {
      res.push([...track]);
      return;
    }
    for (let num of nums) {
      if (track.includes(num)) {
        continue;
      }
      // 做选择
      track.push(num);
      backTrack(nums, track);
      // 撤销选择
      track.pop();
    }
  };

  backTrack(nums, []);
  return res;
};
```
