// 剑指 Offer 11. 旋转数组的最小数字:https://leetcode.cn/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
// 类似题目154. 寻找旋转排序数组中的最小值 II:https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  const n = numbers.length;
  if (n === 1) return numbers[0];

  let left = 0,
    right = n - 1;
  while (left < right) {
    // const mid = Math.floor((left + right) / 2);
    const mid = (left + right) >> 1;
    if (numbers[mid] > numbers[right]) {
      left = mid + 1;
    } else if (numbers[mid] < numbers[right]) {
      right = mid;
    } else if (numbers[mid] === numbers[right]) {
      right = right - 1;
    }
  }
  return numbers[right];
};
