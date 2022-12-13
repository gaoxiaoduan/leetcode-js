## [剑指 Offer 57 - II. 和为 s 的连续正数序列](https://leetcode.cn/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N) N 为 target/2(limitArray 的长度)
空间复杂度 O(N) N 为 limitArray 的长度

- 思路(滑动窗口)
- 改题第一个难点是找出结果数组对应的范围
- 由于数组是有序的，所以结果的临界点就是`target >> 1`
- 然后将结果范围转化为对应的数组，方便查找（时间复杂度优化点）
- 然后题目就变成了在对应的范围内找出连续的系列，就可以使用滑动窗口进行求解了
  - 声明前后指针(l,r)和 sum
  - r 每前进一步，就 sum+=num[r]，l 也是如此
  - 共有三种状态
  - 1.`sum < target`,说明 sum 还不够，r 继续前进，扩大窗口
  - 2.`sum > target` 说明 sum 大了，sum-=num[l],l 前进一步，缩小窗口范围
  - 3.`sum == target`，说明找到了对应的序列[l,r],然后将这个序列记录到结果数组中，缩小窗口，继续寻找其他序列

```js
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
  const res = [];
  // 若 target = 9
  // limitArray = [ 1, 2, 3, 4, 5 ]
  const limitArray = Array((target >> 1) + 1)
    .fill(0)
    .map((_, index) => index + 1);
  // 声明左右指针
  let l = (r = 0);
  let sum = 0;
  while (r <= limitArray.length) {
    if (sum < target) {
      sum += limitArray[r];
      r++;
    } else if (sum > target) {
      sum -= limitArray[l];
      l++;
    } else if (sum === target) {
      let record = [];
      for (let k = l; k < r; k++) {
        record.push(limitArray[k]);
      }
      res.push(record);
      sum -= limitArray[l];
      l++;
    }
  }

  return res;
};
```
