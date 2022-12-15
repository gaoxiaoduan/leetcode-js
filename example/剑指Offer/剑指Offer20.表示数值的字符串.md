## [剑指 Offer 20. 表示数值的字符串](https://leetcode.cn/problems/biao-shi-shu-zhi-de-zi-fu-chuan-lcof/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
  if (s == null || s.length == 0) return false;

  //去掉首位空格
  s = s.trim();

  //是否出现数字
  let numFlag = false;
  //是否出现小数点
  let dotFlag = false;
  // 是否出现 e
  let eFlag = false;

  for (let i = 0; i < s.length; i++) {
    if (s[i] >= '0' && s[i] <= '9') {
      //判定为数字，则标记 numFlag
      numFlag = true;
    } else if (s[i] == '.' && !dotFlag && !eFlag) {
      //小数点只可以出现再 e 之前，且只能出现一次 .num、num.num、num. 都是被允许的
      dotFlag = true;
    } else if ((s[i] == 'e' || s[i] == 'E') && !eFlag && numFlag) {
      //判定为e，之前没出现过e，并且前面存在数字
      eFlag = true;
      //避免e以后没有出现数字
      numFlag = false;
    } else if (
      (s[i] == '+' || s[i] == '-') &&
      (i == 0 || s[i - 1] == 'e' || s[i - 1] == 'E')
    ) {
      //判定为+-符号，只能出现在第一位或者紧接e后面
      continue;
    } else {
      //其他情况，都是非法的
      return false;
    }
  }

  //是否出现了数字
  return numFlag;
};
```
