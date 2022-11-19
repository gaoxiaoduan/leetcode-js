/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
//  - 思路
//  - 根据异或的交换律和结合律
//  - a ^ b ^ a = b ^ (a ^ a)
//  - 所以可以将字符做异或操作，最后的结果就是添加的字母
//  - 注意：由于js字符串不支持直接异或，所以要转成对应的unicode
var findTheDifference = function (s, t) {
    let res = 0;
    res ^= t[t.length - 1].charCodeAt();
    for (let i = 0; i < s.length; i++) {
        res ^= s[i].charCodeAt() ^ t[i].charCodeAt();
    }
    return String.fromCharCode(res);
};