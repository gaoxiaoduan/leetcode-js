---
nav: JavaScript题解
group:
  title: 进阶算法
  order: 2
order: 0
toc: content
---

# 滑动窗口

## 单调队列解决滑动窗口问题

<embed src="../../example/滑动窗口/单调队列解决滑动窗口问题/239.滑动窗口最大值.md"></embed>

<embed src="../../example/滑动窗口/单调队列解决滑动窗口问题/剑指Offer59-I.滑动窗口的最大值.md"></embed>

<embed src="../../example/滑动窗口/单调队列解决滑动窗口问题/面试题59-II.队列的最大值.md"></embed>

## [567.字符串的排列](https://leetcode.cn/problems/permutation-in-string/) <Badge type="warning">medium</Badge>

时间复杂度 O(N)
空间复杂度 O(N)

- 思路
- 维护一个滑动窗口
- 先初一个 need 和 window，Map 用于记录
- 第一步先根据我们需要找的字符串，用 need 记录字符串出现的次数
- 然后写出滑动窗口的框架
- 再考虑情况，补充适当位置的代码

```js
// 滑动窗口的框架
function slidingWindow(s, t) {
  let need = new Map, window = new Map();
  for (const c of s) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1)
  }

  let let = 0, right = 0;
  // valid 变量表示窗口中满足 need 条件的字符个数，
  // 如果 valid 和 need.size 的大小相同，则说明窗口已满足条件，已经完全覆盖了串
  let valid = 0;
  while (right < s.length) {
    // 将移入窗口的字符
    let c = s[right];
    // 右移窗口
    right += 1;

    // 进行窗口内数据的一系列更新
    // ...

    /*** debug 输出的位置 ***/
    console.log(left, right)
    /********************/

    // 判断左侧窗口是否要收缩
    while (window needs shrink) {
      // c2 是将移出窗口的字符
      let c2 = s[left];
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      // ...
    }
  }
}
```

题解

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let need = new Map(),
    window = new Map();
  for (const i of s1) {
    need.set(i, need.has(i) ? need.get(i) + 1 : 1);
  }

  let left = 0,
    right = 0;
  let valid = 0;
  while (right < s2.length) {
    // 将要进入窗口的字符
    let c1 = s2[right];
    right++; // 放大窗口
    // 更新数据
    if (need.has(c1)) {
      window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
      if (window.get(c1) === need.get(c1)) {
        valid++;
      }
    }

    while (right - left >= s1.length) {
      // 符合要求，更新结果
      if (valid === need.size) {
        return true;
      }
      // 将要移出窗口等字符
      let c2 = s2[left];
      left++; // 缩小窗口
      // 更新数据
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          valid--;
        }
        window.set(c2, window.get(c2) - 1);
      }
    }
  }

  return false;
};
```

## [3.无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) <Badge type="warning">medium</Badge>

时间复杂度 O(N) N 是 s 的个数
空间复杂度 O(M) M 是 s 的不同元素的个数

- 思路：
- 维护一个滑动窗口
- 1.在右指针滑动的过程中记录当前元素对应的位置
- 2.若在右指针滑动过程中发现 map 中已经有当前元素，并且这个位置没有在左指针之后
- 3.将左指针定位到当前元素位置的下一位
- 4.然后右指针每次滑动，都求左右指针的最大长度
- 这个长度就是最长的无重复子串

```js
var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let l = 0, // 左指针
    res = 0; // 最长的无重复子串的数量

  // r为右指针
  for (let r = 0; r < s.length; r++) {
    let c = s[r]; // 每个字符串
    // 2.
    if (map.has(c) && map.get(c) >= l) {
      // 3.
      l = map.get(c) + 1;
    }
    // 4.
    res = Math.max(res, r - l + 1);

    // 1.
    map.set(c, r); // 记录下每个字符串的位置
  }

  return res;
};
```

滑动窗口框架解法

```js
var lengthOfLongestSubstring = function (s) {
  let window = new Map();

  let right = 0,
    left = 0;
  let res = 0;
  while (right < s.length) {
    let c1 = s[right];
    right++;
    // 更新数据
    window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
    // 缩小窗口的条件
    while (window.get(c1) > 1) {
      let c2 = s[left];
      left++;
      // 更新数据
      window.set(c2, window.get(c2) - 1);
    }
    res = Math.max(res, right - left);
  }
  return res;
};
```

## [9.回文数](https://leetcode.cn/problems/palindrome-number/) <Badge type="success">easy</Badge>

时间复杂度：O(N)
空间复杂度：O(1)

- 思路（双指针法）
- 左右指针，向内滑动
- 发现两个指针的值相等时，左指针++，右指针--，向内靠拢
- 边界值情况：
- 当输入 1 位，的时候，肯定是回文数，true
- 判断相等时，注意值不能取空，否则会与 undefined 比较
- 最后结束时，当头指针没有超过中位，说明不是回文数

```js
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const str = String(x);
  const len = str.length;
  if (len === 1) return true;
  let p1 = 0,
    p2 = len - 1;

  while (p1 < p2) {
    if (str[p1] !== str[p2]) return false;
    p1++;
    p2--;
  }
  return true;
};
```

## [76.最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/) <Badge type="error">hard</Badge>

时间复杂度 O(N) N 代表 s 的长度
空间复杂度 O(M)

- 思路
- 双指针维护一个滑动窗口
- 先找出一个子串，然后将左指针向后移动一位，继续找子串
- 移动过程中，记录 找到子串的长度，返回最小子串

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // need为统计t出现的次数
  let need = new Map(),
    window = new Map();
  for (let i of t) {
    need.set(i, need.has(i) ? need.get(i) + 1 : 1);
  }
  // valid为字符串满足的数量
  let valid = 0;
  let left = 0,
    right = 0;
  let res = '';
  while (right < s.length) {
    // c是将移入窗口的数据
    let c1 = s[right];
    // 放大窗口
    right += 1;
    // 数据更新操作
    if (need.has(c1)) {
      window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
      if (window.get(c1) === need.get(c1)) {
        // 当window中的字符，已经满足need，valid++
        valid += 1;
      }
    }

    // 当valid满足need的size，说明已经找到符合条件的子串了,需要缩小窗口继续找最小
    while (valid === need.size) {
      // 更新结果
      let newStr = s.substring(left, right);
      if (!res || newStr.length < res.length) res = newStr;

      // c2是将移除窗口的数据
      let c2 = s[left];
      // 缩小窗口
      left += 1;
      // 更新数据
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          valid -= 1;
        }
        window.set(c2, window.get(c2) - 1);
      }
    }
  }
  return res;
};
```

## [438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/) <Badge type="warning">medium</Badge>

时间复杂度 O(M+N)
空间复杂度 O(M)

- 思路
- 其实找异位词就是找覆盖子串
- 可以参考[76.最小覆盖子串的解法](#76最小覆盖子串)

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  let need = new Map(),
    window = new Map();
  for (let i of p) {
    need.set(i, need.has(i) ? need.get(i) + 1 : 1);
  }

  let left = 0,
    right = 0;
  let valid = 0;
  let res = [];
  while (right < s.length) {
    let c1 = s[right]; // 将要进入window的字符
    right++; // 放大窗口
    // 更新数据
    if (need.has(c1)) {
      window.set(c1, window.has(c1) ? window.get(c1) + 1 : 1);
      if (window.get(c1) === need.get(c1)) {
        valid++;
      }
    }

    while (right - left >= p.length) {
      if (valid === need.size) {
        res.push(left);
      }

      let c2 = s[left];
      left++;
      // 更新数据
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          valid--;
        }
        window.set(c2, window.get(c2) - 1);
      }
    }
  }

  return res;
};
```
