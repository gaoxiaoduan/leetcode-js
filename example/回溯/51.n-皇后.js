/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let res = [];
  // 初始化空棋盘: '.' 表示空 'Q'表示皇后
  let board = new Array(n).fill(0).map(() => new Array(n).fill("."));
  backTrack(0);
  return res;

  // 判断board[row][col]位置是否可以放Q
  function isValid(row, col) {
    // 判断头上⬆的元素是否有Q
    for (let i = 0; i <= row; i++) {
      if (board[i][col] === "Q") return false;
    }
    // 判断右上↗️的元素是否有Q
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }
    // 判断左上↖️的元素是否有Q
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }
    return true;
  }

  function backTrack(row) {
    // 触发结束条件
    if (row === board.length) {
      // 将['.','.','.','.']join成字符串返回
      res.push(board.map((row) => row.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      // 排除不合法选择
      if (!isValid(row, col)) {
        continue;
      }
      // 做选择
      board[row][col] = "Q";
      backTrack(row + 1);
      // 撤销选择
      board[row][col] = ".";
    }
  }
};

// @lc code=end
