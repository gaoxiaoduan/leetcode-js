## [剑指 Offer 42. 连续子数组的最大和](https://leetcode.cn/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/) <Badge type="success">easy</Badge>

时间复制度O(N)
空间复杂度O(N)

- 思路（动态规划）
- 要求子数组的和的最大值
- 要看当前值，是否要和前面的数组组合形成更大的数字
- 或者自己成为一个单独的数组
- dp数组，定义dp[i]表示nums[0..i]的最大和
- 那么动态转移方程就是
```js
dp[i] = max(dp[i - 1] + nums[i], nums[i]);
```
- 跟[53.最大子数组和](/js-logs/dynamic-programming#53最大子数组和)相同

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    const n = nums.length;
    // dp[i]表示nums[0..i]的最大和
    let dp = new Array(n).fill(0);

    // base case
    dp[0] = nums[0];
    let max = nums[0];
    for (let i = 1; i < n; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        max = Math.max(max, dp[i]); // 更新max
    }

    return max;
};
```
