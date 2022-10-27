/*
 * @lc app=leetcode.cn id=1254 lang=javascript
 *
 * [1254] 统计封闭岛屿的数目
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
//  【200.岛屿数量】四周都是水，所以靠边的也算是岛屿
//  该题的四周四周不算是水了，求岛屿的数量
//  那么我们就可以先把四周用水淹了，就变成了【200.岛屿数量】
var closedIsland = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  // 从 (i, j) 开始，将与之相邻的陆地都变成海水
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return;
    if (grid[i][j] === 1) return; // 已经是水了

    grid[i][j] = 1; // (i,j) 变成水
    // 相邻的都变成水
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  for (let i = 0; i < m; i++) {
    dfs(i, 0); // 把左边淹了
    dfs(i, n - 1); // 把右边淹了
  }

  for (let j = 0; j < n; j++) {
    dfs(0, j); // 把上边淹了
    dfs(m - 1, j); // 把下边淹了
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 如果发现岛屿
      if (grid[i][j] === 0) {
        res++;
        dfs(i, j);
      }
    }
  }
  return res;
};
// @lc code=end
