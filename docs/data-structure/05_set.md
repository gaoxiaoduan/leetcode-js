---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 5
---

# 集合(set)

## 一、介绍

集合通常是由一组**无序的**、**不能重复的**元素构成。数学中常指的集合中的元素是可以重复的，但是计算机中集合的元素不能重复。

集合是特殊的数组。

- 特殊之处在于里面的元素**没有顺序**，也**不能重复**。
- 没有顺序意味着**不能通过下标值进行访问**，不能重复意味着相同的对象在集合中**只会存在一份**。

## 二、集合的实现

集合比较常见的实现方式是哈希表，这里使用 JavaScript 的 Object 进行封装

### 集合常见的操作

- `add(value)` 向集合添加一个新的项
- `remove(value)` 从集合移除一个值
- `has(value)` 如果值在集合中，返回 `true`，否则返回` false`
- `clear()` 移除集合中的所有项
- `size()` 返回集合所包含元素的数量。与数组的 `length` 属性类似
- `values()` 返回一个包含集合中所有值的数组。
- 还有其他的方法，用的不多，这里不做封装

### 1.Set 类的代码实现

```js
function MySet() {
  this.items = {};

  MySet.prototype.add = function (value) {
    if (this.has(value)) return false;
    this.items[value] = value;
    return true;
  };

  MySet.prototype.has = function (value) {
    return this.items.hasOwnProperty(value);
  };

  MySet.prototype.remove = function (value) {
    if (!this.has(value)) return false;
    delete this.items[value];
    return true;
  };

  MySet.prototype.clear = function () {
    this.items = {};
  };

  MySet.prototype.size = function () {
    return Object.keys(this.items).length;
  };

  // 返回一个包含集合中所有值的数组
  MySet.prototype.values = function () {
    return Object.keys(this.items);
  };
}
```

#### 测试代码

```js
// 测试代码
var set = new MySet();
console.log(set.add('10')); // true
console.log(set.add('10')); // false
console.log(set.add('20')); // true
console.log(set.add('30')); // true
console.log(set.values()); // [ '10', '20', '30' ]

console.log(set.remove('10')); // true
console.log(set.remove('10')); // false
console.log(set.values()); // [ '20', '30' ]
console.log(set.size()); // 2
```

### 2.集合间操作的封装

- 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
- 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
- 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
- 子集：验证一个给定集合是否是另一个集合的子集

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201091510184.png" style="max-width:100%" />
  <div align=center>集合间操作</div>
</div>

#### 2.1 并集的实现

```js
// 并集 ==> 将两个set集合合并
MySet.prototype.union = function (otherSet) {
  // 创建一个新的set
  var unionSet = new MySet();
  // 取出当前set里的value
  var values = this.values();

  // 将当前set里的value添加到新的set中
  for (var i = 0; i < values.length; i++) {
    unionSet.add(values[i]);
  }

  // 取出传入的set
  values = otherSet.values();
  // 将传入的set添加到新的set中
  for (var i = 0; i < values.length; i++) {
    // 因为是set结构，所以会过滤掉重复的内容
    unionSet.add(values[i]);
  }

  return unionSet;
};
```

##### 测试代码

```js
// 测试代码
var set1 = new MySet();
var set2 = new MySet();
set1.add('10');
set1.add('20');
set1.add('30');

set2.add('10');
set2.add('40');
set2.add('50');
var unionSet = set1.union(set2);
console.log(unionSet.values()); // [ '10', '20', '30', '40', '50' ]
```

#### 2.2 交集的实现

```js
// 交集 ==> 取出两个集合重复的内容
MySet.prototype.intersect = function (otherSet) {
  var intersectSet = new MySet();
  var values = this.values();

  for (var i = 0; i < values.length; i++) {
    // 找出重复的内容
    if (otherSet.has(values[i])) {
      // 将重复的内容，添加到交集中
      intersectSet.add(values[i]);
    }
  }
  return intersectSet;
};
```

##### 测试代码

```js
var intersectSet = set1.intersect(set2);
console.log(intersectSet.values()); // [ '10' ]
```

#### 2.3 差集的实现

```js
// 差集 ==> 跟交集相反，剔除集合A中那些在集合B中也存在的内容
MySet.prototype.difference = function (otherSet) {
  var differenceSet = new MySet();
  var values = this.values();
  for (var i = 0; i < values.length; i++) {
    if (!otherSet.has(values[i])) {
      differenceSet.add(values[i]);
    }
  }
  return differenceSet;
};
```

##### 测试代码

```js
var differenceSet = set1.difference(set2);
console.log(differenceSet.values()); // [ '20', '30' ]
```

#### 2.4 判断子集的实现

```js
// 子集 ==> 若集合B里的内容，在集合A中也存在，那么B就是A的子集
MySet.prototype.subset = function (otherSet) {
  var values = this.values();
  for (var i = 0; i < values.length; i++) {
    if (!otherSet.has(values[i])) {
      return false;
    }
  }
  return true;
};
```

##### 测试代码

```js
console.log(set1.subset(set2)); // false
```

### 3.完整代码

```js
function MySet() {
  this.items = {};

  MySet.prototype.add = function (value) {
    if (this.has(value)) return false;
    this.items[value] = value;
    return true;
  };

  MySet.prototype.has = function (value) {
    return this.items.hasOwnProperty(value);
  };

  MySet.prototype.remove = function (value) {
    if (!this.has(value)) return false;
    delete this.items[value];
    return true;
  };

  MySet.prototype.clear = function () {
    this.items = {};
  };

  MySet.prototype.size = function () {
    return Object.keys(this.items).length;
  };

  // 返回一个包含集合中所有值的数组
  MySet.prototype.values = function () {
    return Object.keys(this.items);
  };

  // 并集 ==> 将两个set集合合并
  MySet.prototype.union = function (otherSet) {
    // 创建一个新的set
    var unionSet = new MySet();
    // 取出当前set里的value
    var values = this.values();

    // 将当前set里的value添加到新的set中
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    // 取出传入的set
    values = otherSet.values();
    // 将传入的set添加到新的set中
    for (var i = 0; i < values.length; i++) {
      // 因为是set结构，所以会过滤掉重复的内容
      unionSet.add(values[i]);
    }

    return unionSet;
  };

  // 交集 ==> 取出两个集合重复的内容
  MySet.prototype.intersect = function (otherSet) {
    var intersectSet = new MySet();
    var values = this.values();

    for (var i = 0; i < values.length; i++) {
      // 找出重复的内容
      if (otherSet.has(values[i])) {
        // 将重复的内容，添加到交集中
        intersectSet.add(values[i]);
      }
    }
    return intersectSet;
  };

  // 差集 ==> 跟交集相反，剔除集合A中那些在集合B中也存在的内容
  MySet.prototype.difference = function (otherSet) {
    var differenceSet = new MySet();
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  };

  // 子集 ==> 若集合B里的内容，在集合A中也存在，那么B就是A的子集
  MySet.prototype.subset = function (otherSet) {
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        return false;
      }
    }
    return true;
  };
}

// 测试代码
var set1 = new MySet();
var set2 = new MySet();
set1.add('10');
set1.add('20');
set1.add('30');

set2.add('10');
set2.add('40');
set2.add('50');
var unionSet = set1.union(set2);
console.log(unionSet.values()); // [ '10', '20', '30', '40', '50' ]

var intersectSet = set1.intersect(set2);
console.log(intersectSet.values()); // [ '10' ]

var differenceSet = set1.difference(set2);
console.log(differenceSet.values()); // [ '20', '30' ]

console.log(set1.subset(set2)); // false
```

## 三、应用

### 1.[两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // 使用set结构，一行代码就可以解决
  return [...new Set(nums1)].filter((n) => nums2.includes(n));
};
```
