/*
 * @lc app=leetcode.cn id=1905 lang=javascript
 *
 * [1905] 统计子岛屿
 */

// @lc code=start
/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
//  【子岛屿】就是B中的岛屿，在A中也是岛屿
//  我们可以先想办法把B中不是子岛屿的给消除掉，然后求B的岛屿数量，这样就转化成【200.岛屿数量】了

//  怎么消除呢？
//  若B中的岛屿位置，在A中是海洋，那么B就不是一个子岛屿，可以被海水覆盖掉
var countSubIslands = function (grid1, grid2) {
  const m = grid1.length,
    n = grid1[0].length;

  // 淹没掉（i，j）所有相邻的岛屿
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return; // 越界
    if (grid2[i][j] === 0) return; // 已经是海水了

    grid2[i][j] = 0; // 用海水覆盖
    // 覆盖四周
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  // 消除grid2中非子岛屿的岛屿
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 当grid1是海水 且 grid2是岛屿
      if (grid1[i][j] === 0 && grid2[i][j] === 1) {
        dfs(i, j); // 这个岛屿肯定不是子岛屿，淹掉
      }
    }
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid2[i][j] === 1) {
        res += 1;
        dfs(i, j);
      }
    }
  }
  return res;
};
// @lc code=end
