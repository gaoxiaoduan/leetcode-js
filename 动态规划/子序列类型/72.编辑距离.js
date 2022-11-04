/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
/**
 * 动态规划（子序列类型问题）
 * 思路
 * - 穷举出每一个动作所需要的操作数，取操作次数最小的动作
 * - 定义i，j两个指针，从后向前去比较字符
 * - 共有四种情况
 * - 1.i、j位置上的元素相同，不需要操作
 * - 2.i位置后面需要插入j，这个时候i不变，j的位置-1
 * - 3.i位置需要删除，这个时候i-1，j不变
 * - 4.i位置需要替换成j，这个时候i，j都需要-1
 * - base case
 * - 当有一方走到-1即表示到头，则需要把另一方的元素删除掉
 * - if (i === -1) return j + 1; // 当i走到头，需要删除j的剩余元素，删除次数是j+1次
 * - if (j === -1) return i + 1; // 同理
 */
// 从上向下递归+备忘录消除子问题
var minDistance = function (word1, word2) {
  const len1 = word1.length,
    len2 = word2.length;
  const memo = new Array(len1).fill(0).map((_) => new Array(len2).fill(-1)); // 初始化memo数组，设置-1为标识

  // 定义dp(i,j)函数返回word1[0,i],转成word2[0,j]的最小操作次数
  const dp = (i, j) => {
    // base case
    if (i === -1) return j + 1; // 当i走到头，需要删除j的剩余元素，删除次数是j+1次
    if (j === -1) return i + 1; // 同理
    if (memo[i][j] !== -1) return memo[i][j];

    if (word1[i] === word2[j]) {
      memo[i][j] = dp(i - 1, j - 1); // 元素相等不需要操作，指针同时前进
    } else {
      memo[i][j] = Math.min(
        dp(i, j - 1) + 1, // 插入
        dp(i - 1, j) + 1, // 删除
        dp(i - 1, j - 1) + 1 // 替换
      );
    }
    return memo[i][j];
  };

  return dp(len1 - 1, len2 - 1);
};

// 自底向上-dp数组
var minDistance1 = function (word1, word2) {
  const m = word1.length, n = word2.length;
  // dp[i][j]存储s1[0..i-1]->s2[0..j-1]的最少次数
  const dp = new Array(m + 1).fill().map(_ => new Array(n + 1).fill(0));
  // base case 
  // i|j 走到头了，返回的就是剩下（i｜j）的数量
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 跳过
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i][j - 1] + 1, // 插入
          dp[i - 1][j] + 1, // 删除
          dp[i - 1][j - 1] + 1, // 替换
        )
      }
    }
  }

  return dp[m][n];
};
// @lc code=end
