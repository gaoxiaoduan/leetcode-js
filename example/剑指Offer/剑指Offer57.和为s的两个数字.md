## [剑指 Offer 57. 和为s的两个数字](https://leetcode.cn/problems/he-wei-sde-liang-ge-shu-zi-lcof/) <Badge type="success">easy</Badge>

时间复杂度O(N)
空间复杂度O(1)

- 思路
- 因为数组是有序的，所以可以利用 sum的大小关系，去靠近target，类似于二分查找的思路
- 不过这里是使用头尾双指针
- 如果sum太大了，就right--
- 如果sum小了，就left++
- sun===target时，返回left和right位置上的值即可

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 双指针
var twoSum = function (nums, target) {
    let left = 0, right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) {
            return [nums[left], nums[right]];
        } else if (sum > target) {
            right--;
        } else if (sum < target) {
            left++;
        }
    }
};
```
