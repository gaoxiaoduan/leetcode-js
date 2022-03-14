/*
 * @lc app=leetcode.cn id=1024 lang=javascript
 *
 * [1024] 视频拼接
 */

// @lc code=start
/**
 * @param {number[][]} clips
 * @param {number} time
 * @return {number}
 */
var videoStitching = function (clips, time) {
  if (time === 0) return 0;
  let clipsArr = clips.sort((a, b) => {
    if (a[0] === b[0]) {
      // 如果开头相同，将最长的片段放到最前面
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  let res = 0;
  let curEnd = 0,
    nextEnd = 0;
  let i = 0,
    len = clipsArr.length;

  while (i < len && clipsArr[i][0] <= curEnd) {
    while (i < len && clipsArr[i][0] <= curEnd) {
      nextEnd = Math.max(nextEnd, clipsArr[i][1]);
      i++;
    }

    res++;
    curEnd = nextEnd;
    if (curEnd >= time) {
      return res;
    }
  }

  // 没找到,返回-1
  return -1;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = videoStitching;
// @after-stub-for-debug-end
