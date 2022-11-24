---
nav: JavaScript题解
group: 基础数据结构
order: 3
---

# 字符串

## [8.字符串转换整数-atoi](https://leetcode.cn/problems/string-to-integer-atoi/) <Badge type="warning">medium</Badge>

1.常规解法
时间复杂度 O(N)
空间复杂度 O(1)

- 思路：
- 去除空格，（可以用 trim 或者，指针偏移）
- 判断正负（使用 flag 标记）然后指针偏移，越过正负号
- 然后遍历这个字符串，当 ptr\< length 且是一个数字的时候
- 累加这个数值，指针后移动
- 最后进行正负号判断和越界判断即可

```js
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let ptr = 0;
  let resNumber = 0;
  let flag = 1; // 1为正数
  // while (s[ptr] === " ") { ptr++; }
  s = s.trim();
  if (s[ptr] === '-') {
    flag = 0;
  }
  if (s[ptr] === '-' || s[ptr] === '+') {
    ptr++;
  }

  while (ptr < s.length && isNumber(s[ptr])) {
    resNumber += s[ptr];
    ptr++;
  }
  let res = flag ? Number(resNumber) : -Number(resNumber);
  resNumber = isNaN(res) ? 0 : res;
  if (resNumber >= Math.pow(2, 31)) return Math.pow(2, 31) - 1;
  if (resNumber < -Math.pow(2, 31)) return -Math.pow(2, 31);
  return resNumber;
};

let strNumber = []; // ["0","1","2"....,"9"]
for (let i = 0; i <= 9; i++) {
  strNumber[i] = String(i);
}
// 判断是否为一个数组
const isNumber = (s) => {
  return strNumber.indexOf(s) !== -1;
};
```

2.状态级流转

```js
class Atoi {
  constructor() {
    this.flag = 1; // 1表示正
    this.sumStr = '';
    this.state = 'start';
    // " " ,"+/-","number","other"
    this.map = new Map([
      ['start', ['start', 'single', 'is_number', 'end']],
      ['single', ['end', 'end', 'is_number', 'end']],
      ['is_number', ['end', 'end', 'is_number', 'end']],
      ['end', ['end', 'end', 'end', 'end']],
    ]);
  }
  get_state(c) {
    if (c === ' ') return 0;
    if (c === '+' || c === '-') return 1;
    if (isNumber(c)) return 2;
    return 3;
  }
  get(c) {
    this.state = this.map.get(this.state)[this.get_state(c)];
    if (this.state === 'single') {
      this.flag = c === '-' ? 0 : 1;
    } else if (this.state === 'is_number') {
      this.sumStr += c;
    }
  }
}

var myAtoi1 = function (s) {
  let atoi = new Atoi();
  for (let c of s) {
    atoi.get(c);
  }
  let resNumber = atoi.flag ? Number(atoi.sumStr) : -Number(atoi.sumStr);
  if (resNumber >= Math.pow(2, 31)) return Math.pow(2, 31) - 1;
  if (resNumber < -Math.pow(2, 31)) return -Math.pow(2, 31);
  return resNumber;
};
```

3.使用正则表达式

- ^[\+\-] 表示以+或-开头
- ^[\+\-]? 表示以+或-开头，但是可以不写
- \d 表示数字
- +表示一次或多次

```js
var myAtoi2 = function (s) {
  s = s.trim();
  let Regx = /^[\+\-]?\d+/;
  let resNumber = s.match(Regx);
  if (resNumber >= Math.pow(2, 31)) return Math.pow(2, 31) - 1;
  if (resNumber < -Math.pow(2, 31)) return -Math.pow(2, 31);
  return resNumber;
};
```

## [392.判断子序列](https://leetcode.cn/problems/is-subsequence/) <Badge type="success">easy</Badge>

双指针解法

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let p1 = 0, // p1为s的头指针
    p2 = 0; // p2为t的头指针

  while (p1 < s.length && p2 < t.length) {
    if (s[p1] === t[p2]) {
      p1++;
    }
    p2++;
  }

  return p1 === s.length;
};
```

<embed src="@/example/字符串/387.字符串中的第一个唯一字符.md"></embed>
