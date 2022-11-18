/**
 * @param {number} n
 * @return {boolean}
 */
//  `n & (n-1)`可以消除二进制最后一个1，变成0
var isPowerOfTwo = function (n) {
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
};