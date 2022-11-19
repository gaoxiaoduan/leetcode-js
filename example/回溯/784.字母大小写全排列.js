/**
 * 回溯
 * ![图解](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202211161127762.png)
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
    const res = [];
    const isNumber = (c) => parseInt(c).toString() === 'NaN' ? false : true;

    const backTrack = (start, track, sArr) => {
        track.push(sArr.join(''));
        for (let i = start; i < sArr.length; i++) {
            const c = sArr[i];
            if (isNumber(c)) continue;
            // 'a' ==> 97
            // 'A' ==> 65
            if (c >= 'a') {
                // 小写
                sArr[i] = c.toUpperCase();
                backTrack(i + 1, track, sArr);
                sArr[i] = c.toLowerCase();
            } else {
                // 大写
                sArr[i] = c.toLowerCase();
                backTrack(i + 1, track, sArr);
                sArr[i] = c.toUpperCase();
            }
        }
    }
    backTrack(0, res, [...s]);
    return res;
};

// ## 广度优先搜索
// - 思路
// - 时间复杂度 O(n * 2^n)
// - 空间复杂度 O(n * 2^n)
// - 使用一个队列存储搜索的元素
// - 累加队列的第一个元素，当元素的长度等于s的长度，就是一个组合
// - 当s[p]是一个字母，就把这个字母转换一下大小写，然后当做一个新组合入队
// - 当s[p]是一个数字，直接累加到队头元素即可
var letterCasePermutation = function (s) {
    const ans = [];
    const q = [""];
    while (q.length !== 0) {
        // console.log(q);
        const cur = q[0];
        const p = cur.length;
        if (p === s.length) {
            ans.push(cur);
            q.shift();
        } else {
            if (isLetter(s[p])) {
                q.push(cur + swapCase(s[p]));
            }
            q[0] += s[p];
        }
    }
    return ans;
};

const swapCase = (ch) => {
    if ('a' <= ch && ch <= 'z') {
        return ch.toUpperCase();
    }
    if ('A' <= ch && ch <= 'Z') {
        return ch.toLowerCase();
    }
}

const isLetter = (ch) => {
    return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z';
}
