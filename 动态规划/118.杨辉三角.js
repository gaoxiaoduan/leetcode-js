/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
// 递归
var generate = function (numRows) {
    if (numRows === 1) {
        let res = [];
        const firstRow = [1];
        res.push(firstRow);
        return res;
    }

    // 先递归生成 numRows - 1
    const triangle = generate(numRows - 1);

    const prevRow = triangle[triangle.length - 1];
    const newRow = [1];
    for (let i = 0; i < prevRow.length - 1; i++) {
        newRow.push(prevRow[i] + prevRow[i + 1]);
    }
    newRow.push(1);

    triangle.push(newRow);
    return triangle;
};

// 迭代方式
var generate1 = function (numRows) {
    let res = [];

    // 先 生成第一层
    let firstRow = [1];
    res.push(firstRow);

    // 开始一层一层的生成
    for (let i = 2; i <= numRows; i++) {
        const prevRow = res[res.length - 1];
        const curRow = [1];
        for (let i = 0; i < prevRow.length - 1; i++) {
            curRow.push(prevRow[i] + prevRow[i + 1]);
        }
        curRow.push(1);

        res.push(curRow);
    }

    return res;
}
// @lc code=end

