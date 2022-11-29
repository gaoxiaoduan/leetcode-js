## [剑指 Offer 46. 把数字翻译成字符串](https://leetcode.cn/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/) <Badge type="warning">medium</Badge>

动态规划(自顶向下)
跟[91.解码方法](/js-logs/dynamic-programming#91解码方法)类似
91题中 中 `0表示无效字符`，`1表示A`，这里`0表示a`，仅错了一位数字,思路是一样的

- 这其实是一道字符串类的动态规划题
- 不难发现对于字符串 s 的某个位置 i 而言
- 我们只关心「位置 i 自己能否形成独立 item 」和「位置 i 能够与前一位置（i-1）能否形成 item」
- 而不关心 i-1 之前的位置
- 动态转移方程：
- 若s[i]单独组成item：`dp[i] = dp[i-1]` 继承dp[i-1]的数量
- 若s[i]与前一位置组成item： `dp[i] = dp[i-1] + dp[i-2]`

```js
/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function (num) {
    const s = num.toString();
    const n = s.length;
    if (n === 0) return 0;
    // 定义dp[i] 表示以s[i-1]结尾的解码数量
    const dp = new Array(n + 1).fill(0);
    // base case
    dp[0] = 1; // s为空

    dp[1] = 1; // 初始化第一个字符s[0]的数量
    for (let i = 2; i <= n; i++) {
        const c = s[i - 1], d = s[i - 2];// s[1],s[0]
        if ('0' <= c && c <= '9') {
            dp[i] = dp[i - 1]; // 如果可以单独组成item，则继承dp[i-1]的数量
        }
        if (d === '1' || d === '2' && c <= '5') {
            dp[i] += dp[i - 2]; // 如果可以和前一位组合成item，则dp[i] = dp[i-1]+dp[i-2]
        }
    }

    return dp[n];
};
```
