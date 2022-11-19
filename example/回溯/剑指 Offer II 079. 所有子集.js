// 剑指 Offer II 079. 所有子集: https://leetcode.cn/problems/TVdhkn/
// 本题与主站 78 题相同： https://leetcode-cn.com/problems/subsets/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 元素【无重】【不可复选】
var subsets = function (nums) {
  const res = [];
  const backTrack = (start, track) => {
    res.push([...track]);

    for (let i = start; i < nums.length; i++) {
      // 做选择
      track.push(nums[i]);

      backTrack(i + 1, track);
      // 撤销选择
      track.pop();
    }
  };

  backTrack(0, []);

  return res;
};
