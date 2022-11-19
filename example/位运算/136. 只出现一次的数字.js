/**
 * @param {number[]} nums
 * @return {number}
 */
//  - 思路
//  - a^a = 0
//  - a^0 = a
//  - 所以全部异或一遍，剩下的就是那个出现一次的数字
var singleNumber = function (nums) {
    let n = 0;
    for (let i = 0; i < nums.length; i++) {
        n ^= nums[i];
    }
    return n;
};