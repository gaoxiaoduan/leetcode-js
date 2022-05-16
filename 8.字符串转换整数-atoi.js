/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
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
  if (s[ptr] === "-") {
    flag = 0;
  }
  if (s[ptr] === "-" || s[ptr] === "+") {
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

//----------------------------------------------------------------
// 状态级流转
class Atoi {
  constructor() {
    this.flag = 1; // 1表示正
    this.sumStr = "";
    this.state = "start";
    // " " ,"+/-","number","other"
    this.map = new Map([
      ["start", ["start", "single", "is_number", "end"]],
      ["single", ["end", "end", "is_number", "end"]],
      ["is_number", ["end", "end", "is_number", "end"]],
      ["end", ["end", "end", "end", "end"]],
    ]);
  }
  get_state(c) {
    if (c === " ") return 0;
    if (c === "+" || c === "-") return 1;
    if (isNumber(c)) return 2;
    return 3;
  }
  get(c) {
    this.state = this.map.get(this.state)[this.get_state(c)];
    if (this.state === "single") {
      this.flag = c === "-" ? 0 : 1;
    } else if (this.state === "is_number") {
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

//----------------------------------------------------------------
/**
 * 使用正则表达式
 * ^[\+\-] 表示以+或-开头
 * ^[\+\-]? 表示以+或-开头，但是可以不写
 * \d表示数字
 * +表示一次或多次
 */
var myAtoi2 = function (s) {
  s = s.trim();
  let Regx = /^[\+\-]?\d+/;
  let resNumber = s.match(Regx);
  if (resNumber >= Math.pow(2, 31)) return Math.pow(2, 31) - 1;
  if (resNumber < -Math.pow(2, 31)) return -Math.pow(2, 31);
  return resNumber;
};
// @lc code=end
