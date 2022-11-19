/*
 * @lc app=leetcode.cn id=877 lang=javascript
 *
 * [877] 石子游戏
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  let n = piles.length;
  let dp = Array.from({ length: n }).map((_) => Array.from({ length: n }));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] = {
        fir: 0,
        sec: 0,
      };
    }
  }

  // base case
  for (let i = 0; i < n; i++) {
    dp[i][i].fir = piles[i];
    dp[i][i].sec = 0;
  }

  // console.log(dp);

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      let left = piles[i] + dp[i + 1][j].sec;
      let right = piles[j] + dp[i][j - 1].sec;
      if (left > right) {
        dp[i][j].fir = left;
        dp[i][j].sec = dp[i + 1][j].fir;
      } else {
        dp[i][j].fir = right;
        dp[i][j].sec = dp[i][j - 1].fir;
      }
    }
  }

  let res = dp[0][n - 1];
  return res.fir > res.sec ? true : false;
};
// @lc code=end
