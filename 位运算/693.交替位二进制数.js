/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
    //  n:000010101
    //  m:000001010 n>>1
    //  a:000011111
    //a+1:000100000
    //  &:000000000
    const a = n ^ (n >> 1);
    return (a & (a + 1)) === 0;
};