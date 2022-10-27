// 题目还是输入一个二维矩阵，0 表示海水，1 表示陆地，这次让你计算 【不同的 (distinct)】 岛屿数量，函数签名如下
// ![](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210271615238.png)
// 其中有四个岛屿，但是左下角和右上角的岛屿形状相同，所以不同的岛屿共有三个，算法返回 3。
// 很显然我们得想办法把二维矩阵中的「岛屿」进行转化，变成比如字符串这样的类型，然后利用 Set 这样的数据结构去重，最终得到不同的岛屿的个数。
// 1, 2, 3, 4 代表上下左右，用 -1, -2, -3, -4 代表上下左右的撤销

var numDistinctIslands = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  // 淹没与 (i, j) 相邻的陆地，并返回淹没的陆地面积
  const dfs = (i, j, path, direction) => {
    if (i < 0 || i >= m || j < 0 || j >= n) return 0; // 越界
    if (grid[i][j] === 0) return 0; // 已经是海水了

    grid[i][j] = 0; // 用海水覆盖

    // 前序遍历位置
    path.push(String(direction) + ",");
    // 覆盖四周
    dfs(i - 1, j, path, 1); // 上
    dfs(i + 1, j, path, 2); // 下
    dfs(i, j - 1, path, 3); // 左
    dfs(i, j + 1, path, 4); // 右
    // 后续位置
    path.push(String(-direction) + ",");
  };

  let set = new Set();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 如果发现岛屿
      if (grid[i][j] === 1) {
        let path = [];
        dfs(i, j, path, 666); // 开始位置不影响正确性
        set.add(path.join(""));
      }
    }
  }
  return set.size;
};

const grid = [
  [1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1],
];
const res = numDistinctIslands(grid);

console.log(res, res === 3 ? true : false);
