---
nav: JavaScript题解
group:
  title: 基础算法
  order: 1
order: 2
---

# 位运算

## [136.只出现一次的数字](https://leetcode.cn/problems/single-number/) <Badge type="success">easy</Badge>

- 思路
- a^a = 0
- a^0 = a
- 所以全部异或一遍，剩下的就是那个出现一次的数字

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let n = 0;
  for (let i = 0; i < nums.length; i++) {
    n ^= nums[i];
  }
  return n;
};
```

## [190.颠倒二进制位](https://leetcode.cn/problems/reverse-bits/) <Badge type="success">easy</Badge>

```js
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
```

## [191.位-1-的个数](https://leetcode.cn/problems/number-of-1-bits/) <Badge type="success">easy</Badge>

- n & (n-1) 消除数字 n 的二进制表示中的最后一个 1
- 不断消除数字 n 中的 1，直到 n 变为 0。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210251640239.png" style="max-width:100%" />
  <div align=center>图解</div>
</div>

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let res = 0;
  while (n !== 0) {
    n = n & (n - 1);
    res++;
  }
  return res;
};
```

## [231. 2 的幂](https://leetcode.cn/problems/power-of-two/) <Badge type="success">easy</Badge>

- `n & (n-1)`可以消除二进制最后一个 1，变成 0

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
};
```

## [268.丢失的数字](https://leetcode.cn/problems/missing-number/) <Badge type="success">easy</Badge>

- 思路
- 因为异或满足交换律
- a ^ b ^ a = b ^ (a ^ a);
- 所以可以将数组内的元素跟[0,n]异或一下
- 结果就是丢失的数字

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  const n = nums.length;
  let res = 0;
  res ^= n;
  for (let i = 0; i < n; i++) {
    res ^= nums[i] ^ i;
  }

  return res;
};
```

- 两个等差数列
- `sum(nums) - sum([0,n])`就是缺的那个元素

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber1 = function (nums) {
  let sumNums = 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sumNums += nums[i];
    sum += i + 1;
  }
  return sum - sumNums;
};
```

## [389.找不同](https://leetcode.cn/problems/find-the-difference/) <Badge type="success">easy</Badge>

- 思路
- 根据异或的交换律和结合律
- a ^ b ^ a = b ^ (a ^ a)
- 所以可以将字符做异或操作，最后的结果就是添加的字母
- 注意：由于 js 字符串不支持直接异或，所以要转成对应的 unicode

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let res = 0;
  res ^= t[t.length - 1].charCodeAt();
  for (let i = 0; i < s.length; i++) {
    res ^= s[i].charCodeAt() ^ t[i].charCodeAt();
  }
  return String.fromCharCode(res);
};
```

## [693.交替位二进制数](https://leetcode.cn/problems/binary-number-with-alternating-bits/) <Badge type="success">easy</Badge>

```js
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
```
