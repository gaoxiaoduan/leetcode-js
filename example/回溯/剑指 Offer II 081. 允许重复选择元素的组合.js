// 剑指 Offer II 081. 允许重复选择元素的组合 https://leetcode.cn/problems/Ygoe9J/
// 本题与主站 39 题相同： https://leetcode-cn.com/problems/combination-sum/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 元素【无重】【可复选】
var combinationSum = function (candidates, target) {
  const res = [];
  let targetSum = 0;
  const backTrack = (start, track) => {
    // base case
    if (targetSum === target) {
      res.push([...track]);
      return;
    }
    // 因为targetSum是累加的，所以当targetSum > target是，可以直接停止递归
    if (targetSum > target) return;
    for (let i = start; i < candidates.length; i++) {
      // 做选择
      track.push(candidates[i]);
      targetSum += candidates[i];
      backTrack(i, track);
      // 撤销选择
      track.pop();
      targetSum -= candidates[i];
    }
  };
  backTrack(0, []);
  return res;
};
