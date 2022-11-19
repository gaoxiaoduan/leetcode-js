/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 动态规划
var updateMatrix = function (mat) {
    const m = mat.length, n = mat[0].length;
    const dist = new Array(m).fill().map(_ => new Array(n).fill(Infinity));

    // 先把0放入队列中
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dist[i][j] = 0;
            }
        }
    }

    // 水平向左，垂直向上
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i - 1 >= 0) {
                dist[i][j] = Math.min(dist[i][j], dist[i - 1][j] + 1);
            }
            if (j - 1 >= 0) {
                dist[i][j] = Math.min(dist[i][j], dist[i][j - 1] + 1);
            }
        }
    }
    // 水平向右，垂直向下
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (i + 1 < m) {
                dist[i][j] = Math.min(dist[i][j], dist[i + 1][j] + 1);
            }
            if (j + 1 < n) {
                dist[i][j] = Math.min(dist[i][j], dist[i][j + 1] + 1);
            }
        }
    }

    return dist;
};

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// 广度优先遍历
var updateMatrix1 = function (mat) {
    const m = mat.length, n = mat[0].length;
    const dist = new Array(m).fill().map(_ => new Array(n).fill(0));
    const visited = new Array(m).fill().map(_ => new Array(n).fill(false));
    const q = [];
    const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    // 先把0放入队列中
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                q.push([i, j]);
                visited[i][j] = true;
            }
        }
    }

    while (q.length) {
        const [i, j] = q.shift();
        for (let d = 0; d < 4; d++) {
            let ni = direction[d][0] + i;
            let nj = direction[d][1] + j;
            if (ni >= 0 && nj >= 0 && ni < m && nj < n && !visited[ni][nj]) {
                dist[ni][nj] = dist[i][j] + 1;
                q.push([ni, nj]);
                visited[ni][nj] = true;
            }
        }
    }


    return dist;
};