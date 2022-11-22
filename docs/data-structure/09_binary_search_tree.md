---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 9
---

# 二叉搜索树(BinarySearchTree)

## 一、对二叉搜索树的介绍

> 二叉搜索树（BST，Binary Search Tree），也称为二叉排序树和二叉查找树

### 1. 二叉搜索树的特性

- 非空左子树的所有键值小于其根节点的键值。比如：下图三，中节点 6 的所有非空左子树的键值都小于 6
- 非空右子树的所有键值大于其根节点的键值；比如：下图三，中节点 6 的所有非空右子树的键值都大于 6；
- 左、右子树本身也都是二叉搜索树

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131503306.png" style="max-width:100%" />
</div>

图二和图三符合二叉搜索树的特效，所以属于二叉树

图一中的节点 5 要比节点 7 大，不符合二叉搜索树的特性， 所以不是二叉树

**总结**：二叉搜索树的特点主要是**较小的值总是保存在左节点上**，相对**较大的值总是保存在右节点**上。这种特点使得二叉搜索树的**查询效率非常高**，这也就是二叉搜索树中“搜索”的来源。

### 2. 二叉搜索树应用举例

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131507591.png" style="max-width:100%" />
</div>

上面是一个二叉搜索树，我们若想在其中找到数据 10，只需要查找 4 次，查找效率非常高有木有！

查找步骤图解：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131508329.png" style="max-width:100%" />
</div>

- 第 1 次：将 10 与根节点 9 进行比较，由于 10 > 9，所以 10 下一步与根节点 9 的右子节点 13 比较；
- 第 2 次：由于 10 < 13，所以 10 下一步与父节点 13 的左子节点 11 比较；
- 第 3 次：由于 10 < 11，所以 10 下一步与父节点 11 的左子节点 10 比较；
- 第 4 次：由于 10 = 10，最终查找到数据 10
- 总结：有没有觉得很像**二分查找**

下面看一下数组这种数据结构 的查找效率：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131510135.png" style="max-width:100%" />
</div>

同样是 15 个数据，在排序好的数组中查询数据 10，需要查询 10 次

其实：如果是排序好的数组，可以通过二分查找：第一次找 9，第二次找 13，第三次找 15...。我们发现如果把**每次二分的数据拿出来以树的形式表示的话就是二叉搜索树**。这就是数组二分法查找效率之所以高的原因

### 3. 二叉搜索树的基本属性

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131512016.png" style="max-width:100%" />
</div>

二叉搜索树有四个最基本的属性：指向节点的**根**（root），节点中的**键**（key）、**左指针**（right）、**右指针**（right）

用代码的方式体现：

```js
function BinarySearchTree() {
  // 节点类
  function Node(key) {
    this.left = null; // 左指针
    this.key = key;
    this.right = null; // 右指针
  }

  this.root = null; // 根节点
}
```

## 二、对二叉搜索树的封装

### 二叉搜索树的常见操作：

- `insert（key）`：向树中插入一个新的键
- `search（key）`：在树中查找一个键，如果节点存在，则返回 true；如果不存在，则返回 false
- `midOrderTraversal`：通过中序遍历方式遍历所有节点
- `preOrderTraversal`：通过先序遍历方式遍历所有节点
- `postOrderTraversal`：通过后序遍历方式遍历所有节点
- `min`：返回树中最小的值/键
- `max`：返回树中最大的值/键
- `remove（key）`：从树中移除某个键

### 1. 实现 insert()方法

```js
BinarySearchTree.prototype.insert = function (key) {
  // 1. 创建一个节点类
  var newNode = new Node(key);
  // 2. 判断根节点是否为空
  if (this.root === null) {
    // 2.1 直接插入新的节点
    this.root = newNode;
  } else {
    // 2.2 插入节点类，实现根节点非空时的插入
    this._insertNode(this.root, newNode);
  }
};
```

#### 1.1 \_insertNode 方法的实现

思路：比较 传入的两个节点(root 和要插入的节点) 的大小，寻找新节点适合插入的位置，直到成功插入新节点为止

这里先看一眼**代码实现**，然后再看图解步骤：

```js
BinarySearchTree.prototype._insertNode = function (node, newNode) {
  // 向左寻找
  if (node.key > newNode.key) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      this._insertNode(node.left, newNode);
    }
  } else {
    // 向右寻找
    if (node.right === null) {
      node.right = newNode;
    } else {
      this._insertNode(node.right, newNode);
    }
  }
};
```

根据传入两个节点的比较分为两种情况：

##### 1.1.1 newNode.key < node.key 时

根据二叉搜索树的特性，新节点的位置肯定在 node 节点的左子树，

- 情况 1：若 node 节点的左子树是 null，那么说明 node 没有左子树，其实这个时候 newNode 已经找到合适的位置，让 newNode 插入到 node 的 left 即可
- 情况 2：若 node 节点的左子树**有值存在**，那么需要在 node 的左子树去寻找新节点的插入位置，所以这里需要递归的查找下去并插入面，查找过程如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131535930.png" style="max-width:100%" />
</div>

##### 1.1.2 newNode.key > node.key 时

这时候遇到的情况，根上面刚好相反，新节点的位置肯定在 node 节点的右子树嘛，也是需要递归的找到合适的插入位置并插入即可，查找插入过程如图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131537859.png" style="max-width:100%" />
</div>

#### 测试代码

```js
// 测试代码
var bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(9);
console.log('[ bst ] >', bst);
```

结构化一下测试数据应该是这样的一颗树：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131544171.png" style="max-width:100%" />
</div>

### 2. 对二叉搜索树的遍历

这里所说的树的遍历**不仅仅针对二叉搜索树**，而是**适用于所有的二叉树**。

由于树结构不是线性结构，所以遍历方式有多种选择，常见的三种二叉树遍历方式为：

- 先序遍历 > ==前序位置的代码在刚刚进入一个二叉树节点的时候执行==
- 中序遍历 > ==后序位置的代码在将要离开一个二叉树节点的时候执行==
- 后序遍历 > ==中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行==

还有层序遍历，使用较少，理解上面高亮部分的内容，对刷 leetcode 非常有好处

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131753364.png" style="max-width:100%" />
</div>

#### 2.1 先序遍历

先序遍历的过程为：

- 首先，遍历根节点
- 然后，遍历其左子树
- 最后，遍历其右子树

示例：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131549026.png" style="max-width:100%" />
</div>

如上图所示，二叉树的节点遍历顺序为：A -> B -> D -> H -> I -> E -> C -> F -> G。

##### 2.1.1 代码实现

```js
//1.先序遍历 ==> 根 -> 左 -> 右
BinarySearchTree.prototype.preOrderTraversal = function (handler) {
  this._preOrderTraversalNode(this.root, handler);
};

BinarySearchTree.prototype._preOrderTraversalNode = function (node, handler) {
  if (node !== null) {
    // 1.处理经过的节点
    handler(node.key);
    // 2.处理左节点
    this._preOrderTraversalNode(node.left, handler);
    // 3.处理右节点
    this._preOrderTraversalNode(node.right, handler);
  }
};
```

##### 2.1.2 过程详解

以遍历以下二叉搜索树为例：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131557898.png" style="max-width:100%" />
</div>

首先调用 preOrderTraversal 方法，在方法里再调用 preOrderTraversalNode 方法用于遍历二叉搜索树。在 preOrderTraversalNode 方法中，递归 1 负责遍历左子节点，递归 2 负责遍历右子节点。先执行递归 1，执行过程如下图所示：

> 这里用：preOrderTraversalNode() 表示为 A()，方便图解

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131558339.png" style="max-width:100%" />
</div>

可以看到一共递归调用了 4 次方法 A，分别传入 11、7、5、3，最后遇到 null 不满足 node != null 条件结束递归 1。

注意此时只是执行完最开始的递归 1，并没有执行递归 2，并且递归 1 执行到 null 停止后要一层层地往上返回，按顺序将调用的函数压出函数调用栈。

关于函数调用栈：之前的四次递归共把 4 个函数压入了函数调用栈，现在递归执行完了一层层地把函数压出栈。

值得注意的是：每一层函数都只是执行完了递归 1，当返回到该层函数时，比如 A（3）要继续执行递归 2 遍历二叉搜索树中的右子节点。

在执行递归 2 的过程中会不断调用方法 A，并依次执行递归 1 和递归 2，以此类推直到遇到 null 不满足 node != null 条件为止，才停止递归并一层层返回，如此循环。同理 A（5）层、A（7）层、A（11）层都要经历上述循环，直到将二叉搜索树中的节点全部遍历完为止。

具体过程如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131600207.png" style="max-width:100%" />
</div>

##### 2.1.3 测试代码

```js
// 测试代码
var bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

var resString = ' ';
bst.preOrderTraversal(function (key) {
  resString += key + ' ';
});
console.log(resString); // ? 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
```

#### 2.2 中序遍历

实现思路：与先序遍历原理相同，只不过是遍历的顺序不一样了。

- 首先，遍历其左子树
- 然后，遍历根（父）节点
- 最后，遍历其右子树

##### 2.2.1 代码实现

```js
// 2.中序遍历 ==> 左 -> 根 -> 右
BinarySearchTree.prototype.midOrderTraversal = function (handler) {
  this._midOrderTraversalNode(this.root, handler);
};

BinarySearchTree.prototype._midOrderTraversalNode = function (node, handler) {
  if (node !== null) {
    // 1.处理左节点
    this._midOrderTraversalNode(node.left, handler);
    // 2.处理经过的节点
    handler(node.key);
    // 3.处理右节点
    this._midOrderTraversalNode(node.right, handler);
  }
};
```

##### 2.2.2 过程详解

遍历的顺序应如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131605249.png" style="max-width:100%" />
</div>

首先调用 midOrderTraversal 方法，在方法里再调用 midOrderTraversalNode 方法用于遍历二叉搜索树。

先使用递归 1 遍历左子树中的节点；然后，处理父节点；最后，遍历右子树中的节点。

##### 2.2.3 测试代码

```js
// 插入顺序和先序遍历的插入一样，这里就省略了，也可以看上图，验证中序遍历的结果
var resString = ' ';
bst.midOrderTraversal(function (key) {
  resString += key + ' ';
});
console.log(resString); // ? 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
```

#### 2.3 后序遍历

实现思路：与先序遍历原理相同，只不过是遍历的顺序不一样了。

- 首先，遍历其左子树
- 然后，遍历其右子树
- 最后，遍历根（父）节点

##### 2.3.1 代码实现

```js
// 3.后序遍历 ==> 左 -> 右 -> 根
BinarySearchTree.prototype.postOrderTraversal = function (handler) {
  this._postOrderTraversalNode(this.root, handler);
};

BinarySearchTree.prototype._postOrderTraversalNode = function (node, handler) {
  if (node !== null) {
    // 1.处理左节点
    this._postOrderTraversalNode(node.left, handler);
    // 2.处理右节点
    this._postOrderTraversalNode(node.right, handler);
    // 3.处理经过的节点
    handler(node.key);
  }
};
```

##### 2.3.2 过程详解

遍历的顺序应如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131609129.png" style="max-width:100%" />
</div>

首先调用 postOrderTraversal 方法，在方法里再调用 postOrderTraversalNode 方法用于遍历二叉搜索树。

先使用递归 1 遍历左子树中的节点；然后，遍历右子树中的节点；最后，处理父节点。

##### 2.3.3 测试代码

```js
var resString = ' ';
bst.postOrderTraversal(function (key) {
  resString += key + ' ';
});
console.log(resString); // ? 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
```

### 3. 对二叉搜索树的搜索

#### 3.1 搜索最大值&最小值

在二叉搜索树中查找最值非常简单，最小值在二叉搜索树的最左边，最大值在二叉搜索树的最右边。只需要一直向左/右查找就能得到最值，如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131612601.png" style="max-width:100%" />
</div>

##### 代码实现

```js
BinarySearchTree.prototype.min = function () {
  var node = this.root;
  while (node.left !== null) {
    node = node.left;
  }
  return node.key;
};

BinarySearchTree.prototype.max = function () {
  var node = this.root;
  while (node.right !== null) {
    node = node.right;
  }
  return node.key;
};
```

#### 3.2 实现 search()

search 方法可以返回某个值是否在二叉树中，若存在返回 true，不存在返回 false

查找二叉搜索树当中的特定值效率也非常高。只需要从根节点开始将需要查找节点的 key 值与之比较，若**node.key < root**则向左查找，若**node.key > root**就向右查找，直到找到或查找到 null 为止。这里可以使用递归实现，也可以采用循环来实现

##### 3.2.1 代码实现

```js
BinarySearchTree.prototype.search = function (key) {
  return this._searchNode(this.root, key);
};
BinarySearchTree.prototype._searchNode = function (node, key) {
  // 这里使用while循环
  var node = this.root;
  while (node !== null) {
    if (key < node.key) {
      node = node.left;
    } else if (key > node.key) {
      node = node.right;
    } else {
      return true;
    }
  }
  return false;

  // 递归调用，占用空间，
  // if (node === null) return false;
  // if (node.key < key) {
  //   // 查找右边的树
  //   this._searchNode(node.right, key);
  // } else if (node.key > key) {
  //   //查找左边的树
  //   this._searchNode(node.left, key);
  // } else {
  //   // 相等情况，说明找到
  //   return true;
  // }
};
```

##### 3.2.2 测试代码

```js
// 测试代码
var bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

bst.search(3); // ? true
bst.search(26124); // ? false
```

### 4. 实现 remove()方法

> 删除方法要考虑的情况比较多，是一个难点

删除思路：

- 先寻找要删除的节点
  - 若没有找到要删除的节点，说明节点不存在，直接返回 return false 即可
  - 若找到要删除的节点，我们需要先记录下**节点(current)**，以及**删除节点的父节点(parent)**，删除节点是**父节点的左子树还是父节点的右子树(isLeftChild)**
    - 若找到删除的节点，我们需要考虑以下 3 种情况
    - 要删除的是**叶子**节点
    - 要删除的节点，只有**一个子节点**
    - 要删除的节点，有**两个子节点**

#### 4.1 寻找要删除的节点

```js
BinarySearchTree.prototype.remove = function (key) {
  var current = this.root; // current保存要删除的节点
  var parent = null; // 保存要删除节点的父节点
  var isLeftChild = false; // 用于判断要删除的节点是父节点的左节点还是右节点

  // 寻找要删除的节点
  while (current.key != key) {
    parent = current;
    if (key < current.key) {
      isLeftChild = true;
      current = current.left;
    } else {
      isLeftChild = false;
      current = current.right;
    }
    // 若没有找到，说明不需要删除，返回false
    if (current === null) return false;
  }
};
```

#### 4.2 找到了要删除的节点

当我们通过上面的代码找到了删除的节点，我们需要对以下 3 种情况进行展开

- 4.2.1 要删除的是**叶子**节点
- 4.2.2 要删除的节点，只有**一个子节点**
- 4.2.3 要删除的节点，有**两个子节点**

##### 4.2.1 要删除的是叶子节点

```js
// 找到了对应的节点,进行情况分析
// 1.删除的是叶子结点
if (current.left === null && current.right === null) {
  // 1.1 删除的是根节点
  if (current === this.root) {
    this.root = null;
  } else if (isLeftChild) {
    parent.left = null;
  } else {
    parent.right = null;
  }
}
```

###### 情况分析：

当该叶子节点为根节点时，如下图所示，此时**current == this.root**，直接通过：**this.root = null**，删除根节点。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131647042.png" style="max-width:100%" />
</div>

当该叶子节点不为根节点时也有两种情况，如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131647427.png" style="max-width:100%" />
</div>

若 current = 8，可以通过：`parent.left = null`，删除节点 8

若 current = 10，可以通过：`parent.right = null`，删除节点 10

##### 4.2.2 要删除的节点只有一个子节点

```js
// 此处是要删除的是叶子节点代码...

// 2.删除的节点只有一个子节点
else if (current.left === null) {
  // 2.1 要删除的是右节点，下面按照一个节点的情况删除即可
  if (current === this.root) {
    this.root = current.right;
  } else if (isLeftChild) {
    parent.left = current.right;
  } else {
    parent.right = current.right;
  }
} else if (current.right === null) {
  // 2.2 要删除的是左节点
  if (current === this.root) {
    this.root = current.left;
  } else if (isLeftChild) {
    parent.left = current.left;
  } else {
    parent.right = current.left;
  }
}
```

###### 情况分析：

当 current 存在左子节点时`current.right === null`：

- 情况 1：current 为根节点`current === this.root`，如节点 11，此时通过：`this.root = current.left`，删除根节点 11
- 情况 2：current 为父节点 parent 的左子节点`isLeftChild === true`，如节点 5，此时通过：`parent.left = current.left`，删除节点 5
- 情况 3：current 为父节点 parent 的右子节点`isLeftChild == false`，如节点 9，此时通过：`parent.right = current.left`，删除节点 9

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131654976.png" style="max-width:100%" />
</div>

当 current 存在右子节点时`current.left === null`：

- 情况 4：current 为根节点`current === this.root`，如节点 11，此时通过：`this.root = current.right`，删除根节点 11
- 情况 5：current 为父节点 parent 的左子节点`isLeftChild === true`，如节点 5，此时通过：`parent.left = current.right`，删除节点 5
- 情况 6：current 为父节点 parent 的右子节点`isLeftChild == false`，如节点 9，此时通过：`parent.right = current.right`，删除节点 9

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131659344.png" style="max-width:100%" />
</div>

##### 4.2.3 要删除的节点，有**两个子节点**

> 这种情况比较**棘手**，让我们先来观察一下，这种情况下有没有什么规律可循

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131708222.png" style="max-width:100%" />
</div>

**删除节点 9**

在保证删除节点 9 后原二叉树仍为二叉搜索树的前提下，有两种方式：

- 方式 1：从节点 9 的左子树中选择一合适的节点替代节点 9，可知节点 8 符合要求
- 方式 2：从节点 9 的右子树中选择一合适的节点替代节点 9，可知节点 10 符合要求

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131708640.png" style="max-width:100%" />
</div>

**删除节点 7**

在保证删除节点 7 后原二叉树仍为二叉搜索树的前提下，也有两种方式：

- 方式 1：从节点 7 的左子树中选择一合适的节点替代节点 7，可知节点 5 符合要求
- 方式 2：从节点 7 的右子树中选择一合适的节点替代节点 7，可知节点 8 符合要求

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131708537.png" style="max-width:100%" />
</div>

**删除节点 15**

在保证删除节点 15 后原树二叉树仍为二叉搜索树的前提下，同样有两种方式：

- 方式 1：从节点 15 的左子树中选择一合适的节点替代节点 15，可知节点 14 符合要求
- 方式 2：从节点 15 的右子树中选择一合适的节点替代节点 15，可知节点 18 符合要求

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131709293.png" style="max-width:100%" />
</div>

相信你已经发现其中的规律了！

**规律总结：**如果要删除的节点有两个子节点，甚至子节点还有子节点，这种情况下需要从要删除节点**下面的子节点中找到一个合适的节点**，来替换当前的节点。

若用 current 表示需要删除的节点，则合适的节点指的是

- current 左子树中比 current**小一点点的节点**，即 current**左子树**中的**最大值**
- current 右子树中比 current**大一点点的节点**，即 current**右子树**中的**最小值**

**前驱&后继**

在二叉搜索树中，这两个特殊的节点有特殊的名字：

- 比 current 小一点点的节点，称为 current 节点的**前驱**。比如下图中的节点 5 就是节点 7 的前驱；
- 比 current 大一点点的节点，称为 current 节点的**后继**。比如下图中的节点 8 就是节点 7 的后继；

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131712004.png" style="max-width:100%" />
</div>

**代码实现：**

- 查找需要被删除的节点 current 的后继时，需要在 current 的**右子树**中查找**最小值**，即在 current 的**右子树**中一直**向左遍历**查找；
- 查找前驱时，则需要在 current 的**左子树**中查找**最大值**，即在 current 的**左子树**中一直**向右遍历**查找。

下面只讨论查找 current 后继的情况，查找前驱的原理相同，这里暂不讨论。

```js
// 获取后继的节点，即从要删除的节点的右边开始查找最小的值
BinarySearchTree.prototype.getSuccessor = function (delNode) {
  var successor = delNode; // 保存后继
  var current = delNode.right; // 保存删除节点的右子树
  var successorParent = delNode; // 保存后继节点的父节点
  // 循环查找 current 的右子树节点
  while (current !== null) {
    successorParent = successor; // 保存父节点
    successor = current; // 保存后继
    current = current.left;
  }
  // 判断寻找到的后续节点是否直接就是要删除节点的 right
  if (successor !== delNode.right) {
    successorParent.left = successor.right;
    successor.right = delNode.right;
  }

  return successor;
};
```

###### 代码实现

```js
// 3.有两个子节点(难点)
else {
  /**
  * 规律：如果要删除的节点有两个子节点，甚至子节点还有子节点，
  * 这种情况下需要从要删除节点下面的子节点中找到一个合适的节点，来替换当前的节点
  * 若用 current 表示需要删除的节点，则合适的节点指的是：
  * - current 左子树中比 current 小一点点的节点，即 current 左子树中的最大值
  * - current 右子树中比 current 大一点点的节点，即 current 右子树中的最小值
  */
  // 找到后继节点
  var successor = this.getSuccessor(current);
  // 判断是否为根节点
  if (this.root === successor) {
    this.root = successor; // 使用后继替换根节点
  } else if (isLeftChild) {
    parent.left = successor;  // 使用后继替换掉 要删除节点的位置
  } else {
    parent.right = successor; // 使用后继替换掉 要删除节点的位置
  }

  successor.left = current.left; // 将后继节点的左子树，与要删除节点的左子树相连
}
// 删除成功
return true;
};
```

##### 4.2.4 完整的 remove 代码

```js
BinarySearchTree.prototype.remove = function (key) {
  var current = this.root; // current保存要删除的节点
  var parent = null; // 保存要删除节点的父节点
  var isLeftChild = false; // 用于判断要删除的节点是父节点的左节点还是右节点

  // 寻找要删除的节点
  while (current.key != key) {
    parent = current;
    if (key < current.key) {
      isLeftChild = true;
      current = current.left;
    } else {
      isLeftChild = false;
      current = current.right;
    }
    // 若没有找到，说明不需要删除，返回false
    if (current === null) return false;
  }

  // 找到了对应的节点,进行情况分析
  // 1.删除的是叶子结点
  if (current.left === null && current.right === null) {
    // 1.1 删除的是根节点
    if (current === this.root) {
      this.root = null;
    } else if (isLeftChild) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }

  // 2.删除的节点只有一个子节点
  else if (current.left === null) {
    if (current === this.root) {
      this.root = current.right;
    } else if (isLeftChild) {
      parent.left = current.right;
    } else {
      parent.right = current.right;
    }
  } else if (current.right === null) {
    if (current === this.root) {
      this.root = current.left;
    } else if (isLeftChild) {
      parent.left = current.left;
    } else {
      parent.right = current.left;
    }
  }
  // 3.有两个子节点(难点)
  else {
    /**
     * 规律：如果要删除的节点有两个子节点，甚至子节点还有子节点，
     * 这种情况下需要从要删除节点下面的子节点中找到一个合适的节点，来替换当前的节点
     * 若用 current 表示需要删除的节点，则合适的节点指的是：
     * - current 左子树中比 current 小一点点的节点，即 current 左子树中的最大值
     * - current 右子树中比 current 大一点点的节点，即 current 右子树中的最小值
     */
    var successor = this.getSuccessor(current);
    if (this.root === successor) {
      this.root = successor;
    } else if (isLeftChild) {
      parent.left = successor;
    } else {
      parent.right = successor;
    }

    successor.left = current.left;
  }

  return true;
};

// 获取后继的节点，即从要删除的节点的右边开始查找最小的值
BinarySearchTree.prototype.getSuccessor = function (delNode) {
  var successor = delNode;
  var current = delNode.right;
  var successorParent = delNode;

  while (current !== null) {
    successorParent = successor;
    successor = current;
    current = current.left;
  }

  if (successor !== delNode.right) {
    successorParent.left = successor.right;
    successor.right = delNode.right;
  }

  return successor;
};
```

#### 5. 完整的二叉搜索树代码

```js
function BinarySearchTree() {
  function Node(key) {
    this.left = null;
    this.key = key;
    this.right = null;
  }

  this.root = null;

  BinarySearchTree.prototype.insert = function (key) {
    // 1. 创建一个节点类
    var newNode = new Node(key);
    // 2. 判断根节点是否为空
    if (this.root === null) {
      // 2.1 直接插入新的节点
      this.root = newNode;
    } else {
      // 2.2 插入节点类，实现根节点非空时的插入
      this._insertNode(this.root, newNode);
    }
  };

  BinarySearchTree.prototype._insertNode = function (node, newNode) {
    // 向左寻找
    if (node.key > newNode.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      // 向右寻找
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  };

  //1.先序遍历 ==> 根 -> 左 -> 右
  BinarySearchTree.prototype.preOrderTraversal = function (handler) {
    this._preOrderTraversalNode(this.root, handler);
  };

  BinarySearchTree.prototype._preOrderTraversalNode = function (node, handler) {
    if (node !== null) {
      // 1.处理经过的节点
      handler(node.key);
      // 2.处理左节点
      this._preOrderTraversalNode(node.left, handler);
      // 3.处理右节点
      this._preOrderTraversalNode(node.right, handler);
    }
  };

  // 2.中序遍历 ==> 左 -> 根 -> 右
  BinarySearchTree.prototype.midOrderTraversal = function (handler) {
    this._midOrderTraversalNode(this.root, handler);
  };

  BinarySearchTree.prototype._midOrderTraversalNode = function (node, handler) {
    if (node !== null) {
      // 1.处理左节点
      this._midOrderTraversalNode(node.left, handler);
      // 2.处理经过的节点
      handler(node.key);
      // 3.处理右节点
      this._midOrderTraversalNode(node.right, handler);
    }
  };

  // 3.后序遍历 ==> 左 -> 右 -> 根
  BinarySearchTree.prototype.postOrderTraversal = function (handler) {
    this._postOrderTraversalNode(this.root, handler);
  };

  BinarySearchTree.prototype._postOrderTraversalNode = function (
    node,
    handler,
  ) {
    if (node !== null) {
      // 1.处理左节点
      this._postOrderTraversalNode(node.left, handler);
      // 2.处理右节点
      this._postOrderTraversalNode(node.right, handler);
      // 3.处理经过的节点
      handler(node.key);
    }
  };

  BinarySearchTree.prototype.min = function () {
    var node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.key;
  };

  BinarySearchTree.prototype.max = function () {
    var node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.key;
  };

  BinarySearchTree.prototype.search = function (key) {
    return this._searchNode(this.root, key);
  };

  BinarySearchTree.prototype._searchNode = function (node, key) {
    // 这里使用while循环
    var node = this.root;
    while (node !== null) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;

    // 递归调用，占用空间，
    // if (node === null) return false;
    // if (node.key < key) {
    //   // 查找右边的树
    //   this._searchNode(node.right, key);
    // } else if (node.key > key) {
    //   //查找左边的树
    //   this._searchNode(node.left, key);
    // } else {
    //   // 相等情况，说明找到
    //   return true;
    // }
  };

  BinarySearchTree.prototype.remove = function (key) {
    var current = this.root; // current保存要删除的节点
    var parent = null; // 保存要删除节点的父节点
    var isLeftChild = false; // 用于判断要删除的节点是父节点的左节点还是右节点

    // 寻找要删除的节点
    while (current.key != key) {
      parent = current;
      if (key < current.key) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
      // 若没有找到，说明不需要删除，返回false
      if (current === null) return false;
    }

    // 找到了对应的节点,进行情况分析
    // 1.删除的是叶子结点
    if (current.left === null && current.right === null) {
      // 1.1 删除的是根节点
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // 2.删除的节点只有一个子节点
    else if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }
    // 3.有两个子节点(难点)
    else {
      /**
       * 规律：如果要删除的节点有两个子节点，甚至子节点还有子节点，
       * 这种情况下需要从要删除节点下面的子节点中找到一个合适的节点，来替换当前的节点
       * 若用 current 表示需要删除的节点，则合适的节点指的是：
       * - current 左子树中比 current 小一点点的节点，即 current 左子树中的最大值
       * - current 右子树中比 current 大一点点的节点，即 current 右子树中的最小值
       */
      var successor = this.getSuccessor(current);
      if (this.root === successor) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }

      successor.left = current.left;
    }

    return true;
  };

  // 获取后继的节点，即从要删除的节点的右边开始查找最小的值
  BinarySearchTree.prototype.getSuccessor = function (delNode) {
    var successor = delNode;
    var current = delNode.right;
    var successorParent = delNode;

    while (current !== null) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    if (successor !== delNode.right) {
      successorParent.left = successor.right;
      successor.right = delNode.right;
    }

    return successor;
  };
}

// 测试代码
var bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

// var resString = " ";
// bst.preOrderTraversal(function (key) {
//   resString += key + " ";
// });
// console.log(resString); // ? 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

// var resString = " ";
// bst.midOrderTraversal(function (key) {
//   resString += key + " ";
// });
// console.log(resString); // ? 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

// var resString = " ";
// bst.postOrderTraversal(function (key) {
//   resString += key + " ";
// });
// console.log(resString); // ? 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
// console.log(bst.max()); // ? 25
// console.log(bst.min()); // ? 3

// console.log(bst.remove(8));
// console.log(bst.remove(7));
// console.log(bst.remove(78));

// var resString = " ";
// bst.midOrderTraversal(function (key) {
//   resString += key + " ";
// });
// console.log(resString); // ?
```

## 三、平衡树

二叉搜索树的缺陷：当插入的数据是有序的数据，就会造成二叉搜索树的深度过大。

比如原二叉搜索树由 11 7 15 组成，如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131728245.png" style="max-width:100%" />
</div>

当插入一组有序数据：6 5 4 3 2 就会变成深度过大的搜索二叉树，会严重影响二叉搜索树的性能。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201131728220.png" style="max-width:100%" />
</div>

### **非平衡树**

- 比较好的二叉搜索树，它的数据应该是**左右均匀分布**的
- 但是插入**连续数据**后，二叉搜索树中的数据分布就变得**不均匀**了，我们称这种树为**非平衡树**
- 对于一棵**平衡二叉树**来说，插入/查找等操作的效率是**O（logN）**
- 而对于一棵**非平衡二叉树**来说，相当于编写了一个链表，查找效率变成了**O（N）**

### **树的平衡性**

为了能以**较快的时间 O（logN）**来操作一棵树，我们需要**保证树总是平衡**的

- 起码大部分是平衡的，此时的时间复杂度也是接近 O（logN）的；
- 这就要求树中**每个节点左边的子孙节点**的个数，应该尽可能地等于**右边的子孙节点**的个数

### **常见的平衡树**

- **AVL 树**：是最早的一种平衡树，它通过在每个节点多存储一个额外的数据来保持树的平衡。由于 AVL 树是平衡树，所以它的时间复杂度也是 O（logN）。但是它的整体效率不如红黑树，开发中比较少用。
- **红黑树**：同样通过**一些特性**来保持树的平衡，时间复杂度也是 O（logN）。进行插入/删除等操作时，性能优于 AVL 树，所以平衡树的应用基本都是红黑树。

## 四、关于深度优先和广度优先遍历

实际开发中，我们直接操作二叉树的情况比较少，但是操作下面这种 tree 机构的情况比较多，而我们对于这种树，最常见的遍历方式就是深度优先遍历(DFS)和广度优先遍历(BFS)，所以在这里我简单拓展一下这两种遍历方式

```js
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: [],
        },
        {
          val: 'e',
          children: [],
        },
      ],
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: [],
        },
        {
          val: 'g',
          children: [],
        },
      ],
    },
  ],
};
```

### 1. 深度优先遍历(dfs)

> 这个算法会尽可能深的搜索树的分支。当节点 v 的所在边都己被探寻过，搜索将回溯到发现节点 v 的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。如果还存在未被发现的节点，则选择其中一个作为源节点并重复以上过程，整个进程反复进行直到所有节点都被访问为止

```js
/**
 * @param {*} root 根结点
 * 思路
 * 访问根节点
 * 对根节点的子节点诶个进行深度优先遍历 ==> 递归
 */
const dfs = (root) => {
  console.log(root.val);
  root.children.forEach(dfs);
};
dfs(tree); // a,b,d,e,c,f,g
```

### 2. 广度优先遍历(bfs)

> 又译作**宽度优先搜索**，或**横向优先搜索**，是一种[图形搜索算法](https://zh.wikipedia.org/wiki/搜索算法)。简单的说，BFS 是从[根节点](<https://zh.wikipedia.org/wiki/树_(数据结构)#术语>)开始，沿着树的宽度遍历树的[节点](https://zh.wikipedia.org/wiki/节点)。如果所有节点均被访问，则算法中止

```js
/**
 * @param {*} root 根节点
 * 思路：
 * 1.先将根节点放入队列中
 * 2.队头出队，并访问
 * 3.将出队的子节点加入队列
 * 4.重复23步，直到队列为空
 */
const bfs = (root) => {
  let queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.val);
    node.children.forEach((child) => {
      queue.push(child);
    });
  }
};
bfs(tree); // a,b,c,d,e,f,g
```

## 五、用迭代的方法实现树的三种遍历方式

我们这里只讨论先序遍历方式如果使用迭代的方法实现，因为先、中、后序遍历只是顺序上的不一样，当我们理解先序遍历的迭代写法之后，可以举一反三，写出另外两种

虽然递归的写法简单易懂，但是如果树的层级过深，很容易出现栈溢出的情况，通常情况下，递归都是可以用迭代的方式实现的，我们这里来考虑一下如何实现 🤔

这里回顾一下先序遍历的访问顺序

- 先访问当前节点
- 再遍历左节点
- 再遍历右节点

我们知道访问顺序之后，可以使用**栈结构**来模仿**函数递归时整个调用流程**

实现步骤：

- 声明一个栈内存(这里用数组表示)
- 将根节点放入栈中
- 在栈内元素不为空的情况下，重复以下步骤
  - 取出栈顶元素（第一次取的时候，是根节点）
  - 访问取到的元素
  - 若取到的元素有右节点，将右节点入栈
    - 因为先序遍历访问顺序是根==> 左 ==> 右
    - 而栈的特性是先入后出的，所以这里先将右节点入栈，后将左节点入栈，节点出栈时的访问顺序就与先序遍历保存一致了
  - 若取到的元素有左节点，将左节点入栈

### 代码实现

```js
//1.先序遍历 ==> 根 -> 左 -> 右
BinarySearchTree.prototype.preOrderTraversal = function (handler) {
  // 迭代写法
  let stack = []; // 栈
  stack.push(this.root); // 先将root入栈

  while (stack.length !== 0) {
    let node = stack.pop(); // 1.节点出栈
    handler(node.key); // 2.处理节点 这里做打印即可
    // 3. 因为先序遍历是先打印左节点的值，根据栈先入后出的特性
    // 所以这里需要先让右节点入栈
    if (node.right !== null) {
      stack.push(node.right);
    }
    // 4.左节点入栈
    if (node.left !== null) {
      stack.push(node.left);
    }
  }

  // this._preOrderTraversalNode(this.root, handler);  // 递归写法
};
```

##### 测试代码

```js
var resString = ' ';
bst.preOrderTraversal(function (key) {
  resString += key + ' ';
});
console.log(resString); // ? 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
// 与递归写法输出顺序保持一致
```
