// 剑指 Offer II 084. 含有重复元素集合的全排列: https://leetcode.cn/problems/7p8L0Z/
// 本题与主站 47 题相同： https://leetcode-cn.com/problems/permutations-ii/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 元素【可重复】【不可复选】
// 要点：保证相同元素在排列中的相对位置保持不变
var permuteUnique = function (nums) {
  const res = [];
  const used = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b);
  const backTrack = (track) => {
    if (track.length === nums.length) {
      res.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      // 剪枝
      // 如果前面的相邻相等元素没有用过，则跳过
      // 当出现重复元素时，比如输入 nums = [1,2,2',2'']，2' 只有在 2 已经被使用的情况下才会被选择
      // 同理，2'' 只有在 2' 已经被使用的情况下才会被选择，这就保证了相同元素在排列中的相对位置保证固定
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      // 做选择
      track.push(nums[i]);
      used[i] = true;
      backTrack(track);
      // 撤销选择
      track.pop();
      used[i] = false;
    }
  };

  backTrack([]);
  return res;
};
