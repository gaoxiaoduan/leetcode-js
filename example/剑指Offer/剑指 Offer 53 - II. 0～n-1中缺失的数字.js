// 剑指 Offer 53 - II. 0～n-1中缺失的数字 ： https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/
// tag: easy

/**
 * @param {number[]} nums
 * @return {number}
 */
//  - 思路
//  - 因为异或满足交换律
//  - a ^ b ^ a = b ^ (a ^ a);
//  - 所以可以将数组内的元素跟[0,n]异或一下
//  - 结果就是丢失的数字
//  - 跟[268题]相同
var missingNumber = function (nums) {
  const n = nums.length;
  let res = 0;
  res ^= n;
  for (let i = 0; i < n; i++) {
    res ^= (nums[i] ^ i);
  }

  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let sumNums = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sumNums += nums[i];
    sum += (i + 1);
  }
  return sum - sumNums;
};
