/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 元素【可重】【不可复选】
// 要点：进行剪枝
// 如果一个节点有多条值相同的树枝相邻，则只遍历第一条，剩下的都剪掉，不要去遍历
/**
 * 思路
 * - 解法还是和78.子集一样
 * - 不过因为题目包含重复元素，所以在排列的时候，要把重复的元素给过滤掉
 * - 也就是对树进行剪枝操作
 * - 体现在代码上，需要先进行排序，让相同的元素靠在一起，如果发现 nums[i] == nums[i-1]，则跳过
 */
var subsetsWithDup = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b);

  const backTrack = (start, track) => {
    res.push([...track]);

    for (let i = start; i < nums.length; i++) {
      // 剪枝
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
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
// @lc code=end
