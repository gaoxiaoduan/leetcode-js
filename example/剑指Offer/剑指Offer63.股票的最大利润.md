## [剑指 Offer 63. 股票的最大利润](https://leetcode.cn/problems/gu-piao-de-zui-da-li-run-lcof/) <Badge type="warning">medium</Badge>


跟[121.买卖股票的最佳时机](/js-logs/dynamic-programming#121买卖股票的最佳时机)相同
通用动态转移方程
```js
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
            = max(   今天选择reset,   今天选择sell           )
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
            = max(   今天选择reset,   今天选择buy           )
```
因为k=1,所以可以看作
```js
dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i])
```
因为k为0时，说明不让交易，利润肯定是0，所以`dp[i-1][0][0]`是0

其他情况k=1，不会变，可以省略，动态转移方程变换为：
```js
dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
dp[i][1] = max(dp[i-1][1], 0 - prices[i])
```

base case
```js
dp[-1][...][0] = 0
解释：因为 i 是从 0 开始的，所以 i = -1 意味着还没有开始，这时候的利润当然是 0

dp[-1][...][1] = -infinity
解释：还没开始的时候，是不可能持有股票的
因为我们的算法要求一个最大值，所以初始值设为一个最小值，方便取最大值

dp[...][0][0] = 0
解释：因为 k 是从 1 开始的，所以 k = 0 意味着根本不允许交易，这时候利润当然是 0

dp[...][0][1] = -infinity
解释：不允许交易的情况下，是不可能持有股票的
因为我们的算法要求一个最大值，所以初始值设为一个最小值，方便取最大值
```

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const n = prices.length;
    if (n === 0) return 0;
    const dp = new Array(n).fill().map(_ => new Array(2).fill(0));

    for (let i = 0; i < n; i++) {
        // base case
        if (i - 1 === -1) {
            // [i-1] === -1 的时候越界
            // dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            //          = max(dp[-1][0], dp[-1][1] + prices[i])
            //          = max(0, -infinity + prices[i]) = 0
            dp[i][0] = 0;

            // dp[i][1] = Math.max(dp[i - 1][1], 0 - prices[i]);
            //          = max(dp[-1][1], -prices[i])
            //          = max(-infinity, -prices[i]) = -prices[i]
            dp[i][1] = -prices[i];
            continue;
        }
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], 0 - prices[i]);
    }

    return dp[n - 1][0]; // 最后一天肯定售出的利润大
};
```
