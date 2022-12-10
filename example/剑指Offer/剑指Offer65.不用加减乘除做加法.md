## [剑指 Offer 65. 不用加减乘除做加法](https://leetcode.cn/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/) <Badge type="success">easy</Badge>

思路
使用二进制表示十进制的加分运算过程

```js
22 + 89 = 111

  百 十 个
     2  2
   + 8  9
   ------
     0  1 // 本位
     1  1 // 进位
```

01 是计算后的本位，直接记录。
11 是计算后的进位，需要：做 「进位逻辑」 后进入下轮计算。
（进位逻辑：乘以进制数，也就是 11 \* 10）
而这里没有下轮计算了，最终得到 111
若这轮的进位不为 0，说明还需要进行下一轮运算

```js
// 最后结果
       0 1
   + 1 1 0
   --------
     1 1 1
```

同样的逻辑在 二进制 里应用：

```js
a ^ b; // 计算出2个加数二进制下每一位的本位
a &
  (b(
    // 计算出2个加数二进制下每一位的进位

    a & b,
  ) <<
    1); // 进位做进位逻辑，也就是 * 2
```

递归解法

```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function (a, b) {
  if (b === 0) return a;
  // 若 a = 1001
  // 若 b = 0101
  //        1100 <- 本位
  //        0001 <- 进位
  //        0010 <- *2 后的进位
  //        然后将（本位和进位*2后的值相加，若还需要进位（进位不为0），则继续迭代下去）

  // 本位求和 => a^b => 1100
  const sum = a ^ b;
  // 先进位求和(a&b => 0001)
  // 然后 (<<1) => 相当于*2 =>（0001 => 0010）
  const carry = (a & b) << 1;
  // add(1100,0010)
  return add(sum, carry);
};
```

迭代解法

```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function (a, b) {
  while (b !== 0) {
    // 若进位还有，说明还需要计算
    const temp = a & b; // 计算进位
    a = a ^ b; // 本位
    b = temp << 1; // 「进位逻辑」*2
  }
  return a;
};
```
