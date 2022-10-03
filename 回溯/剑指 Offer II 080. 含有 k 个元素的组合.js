// 剑指 Offer II 080. 含有 k 个元素的组合: https://leetcode.cn/problems/uUsW3B/
// 本题与主站 77 题相同： https://leetcode-cn.com/problems/combinations/
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 元素【无重】【不可复选】
var combine = function (n, k) {
  let res = [];

  const backTrack = (start, track) => {
    // base case
    if (k === track.length) {
      res.push([...track]);
      return;
    }
    for (let i = start; i <= n; i++) {
      // 做选择
      track.push(i);
      backTrack(i + 1, track);
      // 撤销选择
      track.pop();
    }
  };

  backTrack(1, []);
  return res;
};
