// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面: https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
// tag: easy

/**
 * @param {number[]} nums
 * @return {number[]}
 */
//  时间复杂度O(n)
//  空间复杂度O(1)
//  - 思路
//  - 快慢指针维护`[0,slow)`为奇数
//  - 当fast指针在前移过程中遇到奇数
//  - 就交换给slow，然后slow前移
var exchange = function (nums) {
  let fast = 0, slow = 0;
  // 维护[0,slow)都是奇数
  while (fast < nums.length) {
    if (nums[fast] % 2 === 1) {
      const temp = nums[slow];
      nums[slow] = nums[fast];
      nums[fast] = temp;
      slow++;
    }
    fast++;
  }
  return nums;
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
//  时间复杂度O(n)
//  空间复杂度O(n)
//  - 思路
//  - 声明两个数组，一个放奇数，另一个放偶数
//  - 然后循环判断num的奇偶，放入对应的数组
//  - 最后将奇数和偶数进行前后拼接返回
var exchange1 = function (nums) {
  const firstArr = [];
  const lastArr = [];
  for (let num of nums) {
    num % 2 === 0 ? lastArr.push(num) : firstArr.push(num);
  }
  return firstArr.concat(lastArr);
};
