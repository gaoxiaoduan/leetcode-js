## [剑指 Offer 10- II. 青蛙跳台阶问题](https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/) <Badge type="success">easy</Badge>

- 思路（动态规划）
- 跟fib类型
- 动态转移方程`dp(n) = dp(n - 1) + dp(n - 2)`
- 跟[70题](https://leetcode-cn.com/problems/climbing-stairs/)相同

```js
/**
 * @param {number} n
 * @return {number}
 */
var numWays = function (n) {
    const memo = new Array(n + 1).fill(-1);
    // 定义到n台阶的方法
    const dp = (n) => {
        // base case
        if (n === 0) return 1;
        if (n <= 2) return n;

        if (memo[n] !== -1) return memo[n];

        memo[n] = (dp(n - 1) + dp(n - 2)) % 1000000007; // 防止溢出
        return memo[n];

        // // n台阶的方法等于 （n-1）的方法 + （n-2）的方法
        // return dp(n - 1) + dp(n - 2);
    }
    return dp(n);
};
```
