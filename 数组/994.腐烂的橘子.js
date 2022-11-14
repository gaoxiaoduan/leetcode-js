/**
 * @param {number[][]} grid
 * @return {number}
 */
//  - 跟542.01矩阵解法相似
//  - 只变换橘子位置
//  - 求最大的结果，如果有-1，返回-1
 var orangesRotting = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dist = new Array(m).fill().map(_ => new Array(n).fill(0));
    const visited = new Array(m).fill().map(_ => new Array(n).fill(false));
    const q = [];
    const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    // 先把2放入队列中
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                q.push([i, j]);
                visited[i][j] = true;
            } else if (grid[i][j] === 1) {
                dist[i][j] = -1; // -1 表示新鲜橘子
            }
        }
    }

    while (q.length) {
        const [i, j] = q.shift();
        for (let d = 0; d < 4; d++) {
            let ni = direction[d][0] + i;
            let nj = direction[d][1] + j;
            if (ni >= 0 && nj >= 0 && ni < m && nj < n && !visited[ni][nj]) {
                if (dist[ni][nj] === -1) {
                    dist[ni][nj] = dist[i][j] + 1;
                    q.push([ni, nj]);
                    visited[ni][nj] = true;
                }
            }
        }
    }

    let res = -1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dist[i][j] === -1) return -1;
            res = Math.max(res, dist[i][j]);
        }
    }

    return res;
};