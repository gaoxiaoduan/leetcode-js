/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
    let res = 0; // 0: '0'
    // n一共长32，所以需要移动32次
    for (let i = 0; i < 32; i++) {
        // res:'00';
        res <<= 1; // 相当于res*2
        // 如果n的右边第一位是1，移入res
        // 如果是0不用管，res << 的时候会空出来0
        if (n & 1) {
            res += 1;
        }
        // 4:'100' >> '10'
        // 2:'10' >> '1'
        n >>= 1; // 相当于 n/2
    }

    return res >>> 0;
};