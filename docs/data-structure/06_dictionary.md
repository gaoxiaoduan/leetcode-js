---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 6
---

# 字典(Dictionary)

## 一、介绍

字典是用来存储唯一值的一种数据结构，通常以 **[键, 值]** **对 **的形式来存储数据，主要特点是**一一对应**，也称为**映射**。

在 js 中字典是使用`Map`类实现的，每个语言实现的类名不同，比如：Python 中是 `dict`，Java 中的 `HashMap` 和 `TreeMap`，但是实现字典的特点都是一样的

## 二、字典的实现

> 为了区分 ES6 中的 Map，这里使用 Dictionary 作为类名

### 字典常见的操作

- `set(key,value)` 向字典中添加新元素
- `remove(key)` 通过使用键值来从字典中移除键值对应的数据值
- `has(key)` 如果某个键值存在于这个字典中，则返回 `true`，反之则返回 `false`
- `get(key)` 通过键值查找特定的数值并返回
- `clear()` 将这个字典中的所有元素全部删除
- `size()` 返回字典所包含元素的数量。与数组的 `length` 属性类似
- `keys()` 将字典所包含的所有键名以数组形式返回
- `values()` 将字典所包含的所有数值以数组形式返回

### 代码实现

```js
function Dictionary() {
  this.item = {};

  Dictionary.prototype.has = function (key) {
    return this.item.hasOwnProperty(key);
  };

  Dictionary.prototype.set = function (key, value) {
    this.item[key] = value;
  };

  Dictionary.prototype.remove = function (key) {
    if (!this.has(key)) return false;
    delete this.item[key];
    return true;
  };

  Dictionary.prototype.get = function (key) {
    return this.has(key) ? this.item[key] : undefined;
  };

  Dictionary.prototype.clear = function () {
    this.item = {};
  };

  Dictionary.prototype.size = function () {
    return this.keys().length;
  };

  // 返回一个包含集合中所有值的数组
  Dictionary.prototype.keys = function () {
    return Object.keys(this.item);
  };

  Dictionary.prototype.values = function () {
    return Object.values(this.item);
  };
}
```

##### 测试代码

```js
// 测试代码
let map = new Dictionary();
map.set('10', 10);
map.set('20', 20);
map.set('30', 30);
console.log('[ map ] >', map); // [ map ] > Dictionary { item: { 10: 10, 20: 20, 30: 30 } }

map.has('10'); // ? true

map.remove('20'); // ? true
console.log('[ map ] >', map); //[ map ] > Dictionary { item: { 10: 10, 30: 30 } }

map.keys(); // ? [ '10', '30' ]

map.values(); // ? [ 10, 30 ]
map.size(); // ? 2
map.clear();
console.log('[ map ] >', map); // [ map ] > Dictionary { item: {} }
```

## 三、应用

### 1.[两数之和](/js-logs/n-sum#1两数之和)

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  var map = new Map();

  for (var i = 0; i < nums.length; i++) {
    var n = nums[i];
    var n2 = target - n;

    if (map.has(n2)) {
      return [map.get(n2), i];
    } else {
      map.set(n, i);
    }
  }
};
```

### 2.[无重复字符的最长子串](/js-logs/sliding-window#3无重复字符的最长子串)

- 思路
- 用双指针维护一个"滑动窗口"
- 不断移动右指针，当遇到重复元素，将左指针移动到重复元素的下一位
- 遍历过程中，记录窗口的长度，返回最大值

注意
"abbcdefa"，遇到这种情况，要加判断 ==> 重复元素的位置要大于左指针才有效

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let l = 0,
    res = 0;

  for (let r = 0; r < s.length; r++) {
    let c = s[r];
    // 2.如果发现map中已经存过c的位置
    // 4.map.get(c)的位置要大于左指针的位置才更新
    if (map.has(c) && map.get(c) >= l) {
      // 2.1将c的位置拿出来，改变l指针的位置
      l = map.get(c) + 1;
    }
    // 3.更新最长的子串
    res = Math.max(res, r - l + 1);
    // 1.右指针在滑动的过程中，将对应的位置，存入map中
    map.set(c, r);
  }
  return res;
};
```

### 3.[有效的括号](/js-logs/stack#20有效的括号)

- 思路：
- 使用栈结构先进后出的特性
- 先声明一个栈 stack 变量
- 遍历整个字符串
- 发现 ( 、 {、 [ 就入栈
- 发现 )、}、] 就和栈顶做比较，若栈顶存在对应的括号，将与之对应的括号出栈
- 遍历结束后，若栈空，则说明所有括号都能找到相匹配的
- 这题使用 map 做了存储上的优化，不然要写一堆的判断

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }
  var stack = [];
  var length = s.length;
  var map = new Map();
  map.set('(', ')');
  map.set('{', '}');
  map.set('[', ']');

  for (var i = 0; i < length; i++) {
    var c = s[i];
    if (map.has(c)) {
      stack.push(c);
    } else {
      var stackTop = stack[stack.length - 1];
      if (map.get(stackTop) === c) {
        // 栈顶元素出栈
        stack.pop();
      } else {
        // 栈顶元素与当前元素不匹配 “})” "])" return
        return false;
      }
    }
  }
  return stack.length === 0 ? true : false;
};
```
