/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  // 把与（i，j）附近的陆地给淹了
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return; // 越界
    if (grid[i][j] === "0") return; // 已经是海水了

    grid[i][j] = "0"; // 用海水覆盖
    // 覆盖四周
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 如果发现岛屿
      if (grid[i][j] === "1") {
        res++;
        dfs(i, j);
      }
    }
  }
  return res;
};
// @lc code=end
