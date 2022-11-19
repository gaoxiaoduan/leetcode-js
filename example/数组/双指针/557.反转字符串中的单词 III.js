/**
 * @param {string} s
 * @return {string}
 */
//  - 思路
//  - 根据空格拆分成单字符串的数组
//  - 然后根据344.反转字符串，分别反转单字符串
//  - 最后合并成一个字符串
var reverseWords = function (s) {
    const singleWorldNums = s.split(' ');
    return singleWorldNums.map((item) => {
        return reverseString(item.split('')).join('');
    }).join(' ')
};

var reverseString = function (s) {
    if (s.length === 0 || s.length === 1) return s;
    let left = 0,
        right = s.length - 1;

    const swap = (i, j) => {
        let temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }

    while (left < right) {
        swap(left, right);
        left++;
        right--;
    }
    return s;
};