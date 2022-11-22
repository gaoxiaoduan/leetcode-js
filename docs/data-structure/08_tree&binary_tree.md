---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 8
---

# 树(Tree)和二叉树(BinaryTree)

## 一、树结构的介绍

我们大家都见过现实生活中的树 🌲，例如：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202210092100999.jpg" style="max-width:100%" />
  <div align=center>世界十大名树全球最著名的树盘点其中一棵位于我国台湾</div>
</div>

### 1.1 树的特点：

- 树一般都有一个**根**，连接着根的是**树干**
- 树干会发生**分叉**，形成许多树枝，树枝会继续分化成更小的树枝
- 树枝的最后是**叶子**

现实生活中很多结构都是树的抽象，模拟的树结构相当于旋转`180°`的树，如下：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121415790.png" style="max-width:100%" />
</div>

### 1.2 树结构 对比于数组/链表/哈希表 有哪些**优势**呢？

**数组：**

- 优点：可以通过**下标值访问**，效率高；
- 缺点：查找数据时需要先对数据进行**排序**，生成**有序数组**，才能提高查找效率；并且在插入和删除元素时，需要大量的**位移操作**；

**链表：**

- 优点：数据的插入和删除操作效率都很高；
- 缺点：**查找**效率低，需要从头开始依次查找，直到找到目标数据为止；当需要在链表中间位置插入或删除数据时，插入或删除的效率都不高。

**哈希表：**

- 优点：哈希表的插入/查询/删除效率都非常高；
- 缺点：**空间利用率不高**，底层使用的数组中很多单元没有被利用；并且哈希表中的元素是**无序**的，不能按照固定顺序遍历哈希表中的元素；而且不能快速找出哈希表中**最大值或最小值**这些特殊值。

**树结构：**

优点：树结构综合了上述三种结构的优点，同时也弥补了它们存在的缺点（虽然效率不一定都比它们高），比如树结构中数据都是有序的，查找效率高；空间利用率高；并且可以快速获取最大值和最小值等。

总结：**每种数据结构都有自己特定的应用场景**

## 二、认识树结构

> **树（Tree）**:由 n（n ≥ 0）个节点构成的**有限集合**。当 n = 0 时，称为**空树**。

对于任一棵非空树（n > 0），它具备以下性质：

- 数中有一个称为 **根（Root）** 的特殊节点，用 **r** 表示；
- 其余节点可分为 m（m > 0）个互不相交的有限集合 T1，T2，...，Tm，其中每个集合本身又是一棵树，称为原来树的**子树（SubTree）**。

### 2.1 树的常用术语：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121419732.png" style="max-width:100%" />
</div>

- **节点的度（Degree）**：节点的**子树个数**，比如节点 B 的度为 2
- **树的度**：树的所有节点中**最大的度数**，如上图树的度为 2
- **叶节点（Leaf）**：**度为 0 的节点**（也称为叶子节点），如上图的 H，I，J 等
- **父节点（Parent）**：度不为 0 的节点称为父节点，如上图节点 B 是节点 D 和 E 的父节点
- **子节点（Child）**：若 B 是 D 的父节点，那么 D 就是 B 的子节点
- **兄弟节点（Sibling）**：具有同一父节点的各节点彼此是兄弟节点，比如上图的 B 和 C，D 和 E 互为兄弟节点
- **路径和路径长度**：路径指的是一个节点到另一节点的通道，路径所包含边的个数称为路径长度，比如 A->H 的路径长度为 3
- **节点的层次（Level）**：规定**根节点在 1 层**，其他任一节点的层数是其父节点的**层数加 1**。如 B 和 C 节点的层次为 2
- **树的深度（Depth）**：树种所有节点中的**最大层次**是这棵树的深度，如上图树的深度为 4

### 2.2 数结构的表示方式

#### 2.2.1 常见的表示方法

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121421789.png" style="max-width:100%" />
</div>

如图，树结构的组成方式类**似于链表**，都是由一个个节点连接构成。

不过，根据每个父节点子节点数量的不同，每一个父节点需要的引用数量也不同。

比如：节点 A 需要 3 个引用，分别指向子节点 B，C，D；而 B 节点需要 2 个引用，分别指向子节点 E 和 F；K 节点由于没有子节点，所以不需要引用。

这种方法**缺点**在于我们**无法确定某一结点的引用数**

#### 2.2.2 **儿子-兄弟表示法**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121424041.png" style="max-width:100%" />
</div>

这种表示方法可以完整地记录每个节点的数据，比如

```js
//节点A
Node{
  //存储数据
  this.data = data
  //统一只记录左边的子节点
  this.leftChild = B
  //统一只记录右边的第一个兄弟节点
  this.rightSibling = null
}

//节点B
Node{
  this.data = data
  this.leftChild = E
  this.rightSibling = C
}

//节点F
Node{
  this.data = data
  this.leftChild = null
  this.rightSibling = null
}
```

这种表示法的优点在于每一个节点中引用的数量都是确定的

#### 2.2.3 将儿子-兄弟表示法 选择

将儿子-兄弟表示法旋转后会打开一个新世界，让我们一步一步揭开新世界的大门，下面是儿子-兄弟表示法**尚未旋转**的结构

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121425221.png" style="max-width:100%" />
</div>

将其顺时针旋转 45° 之后：

![image-20200229235549522](https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121428140.png)

这样就成为了一棵**二叉树**，由此我们可以得出结论：**任何树都可以通过二叉树进行模拟**。

问：但是这样父节点不是变了吗？

其实，父节点的设置只是为了方便指向子节点，在代码实现中谁是父节点并没有关系，只要能正确找到对应节点即可

## 三、二叉树的介绍

#### 3.1 什么是二叉树？

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121444180.png" style="max-width:100%" />
</div>

正如上图所示：如果树中的每一个节点最多只能由**两个子节点**，这样的树就称为**二叉树**

二叉树**十分重要**，不仅仅是因为简单，更是因为几乎所有的树都可以表示成二叉树形式。

#### 3.2 二叉树的组成：

- 二叉树可以为空，也就是可以没有节点；
- 若二叉树不为空，则它由根节点和称为其**左子树 TL**和**右子树 TR**的两个不相交的二叉树组成；

#### 3.3 二叉树的五种形态

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121433729.png" style="max-width:100%" />
</div>

上图分别表示：**空的二叉树**、只有**一个节点的二叉树**、只有**左子树 TL**的二叉树、只有**右子树 TR**的二叉树、有左右**两个子树的二叉树**

#### 3.4 二叉树的特性

- 一个二叉树的**第 i 层的最多有 2 ^ (i-1)个节点，i >= 1**
- 一个**深度为 k 的二叉树的最多有(2 ^ k) - 1 个节点，k >= 1**
- 对任何非空二叉树，若 n0 表示叶子节点的个数，n2 表示度为 2 的非叶子节点个数，那么两者满足关系：n0 = n2 + 1；
  - 如下图所示：H，E，I，J，G 为叶子节点，总数为 5；
  - A，B，C，F 为度为 2 的非叶子节点，总数为 4；
  - 满足 n0 = n2 + 1 的规律

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121443735.png" style="max-width:100%" />
</div>

#### 3.5 特殊的二叉树

##### 3.5.1 完美二叉树 ｜满二叉树

完美二叉树（Perfect Binary Tree）也成为满二叉树（Full Binary Tree），在二叉树中，除了最下一层的叶子节点外，每层节点都有 2 个子节点，这就构成了完美二叉树

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121447071.png" style="max-width:100%" />
</div>

##### 3.5.2 完全二叉树

- 除了**二叉树最后一层外**，其他各层的节点数都达到了**最大值**
- 并且，最后一层的叶子节点**从左向右是连续存在**，**只缺失右侧若干叶子节点**
- **完美二叉树是特殊的完全二叉树**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121448180.png" style="max-width:100%" />
</div>

在上图中，由于**H 缺失了右子节点**，所以它**不是**完全二叉树，若 H 存在右子节点，那么上图就是一颗完全二叉树

#### 3.6 二叉树的数据存储

常见的二叉树存储方式为**数组和链表**：

##### 3.6.1 使用数组存储数据

**完全二叉树**：按从上到下，从左到右的方式存储数据

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121451383.png" style="max-width:100%" />
</div>

|   节点   |   A   |   B   |   C   |   D   |   E   |   F   |   G   |   H   |
| :------: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **序号** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** |

使用数组存储时，取数据的时候也十分方便：

- **左子节点的序号等于父节点序号 \* 2**，**右子节点的序号等于父节点序号 \* 2 + 1**

- 例如：H 节点的数据是 D 节点数据 * 2 ，也就是 4*2= 8，I 节点的数据是 D 节点数据 * 2 + 1，也就是 4*2+1 = 9

**非完全二叉树**：非完全二叉树需要转换成完全二叉树才能按照上面的方案存储，这样会**浪费**很大的**存储空间**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121456912.png" style="max-width:100%" />
</div>

|   节点   |   A   |   B   |   C   |   ^   |   ^   |   F   |   ^   |   ^   |   ^   |   ^    |   ^    |   ^    |   M    |
| :------: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :----: | :----: | :----: | :----: |
| **序号** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** | **9** | **10** | **11** | **12** | **13** |

所以，对于非完全二叉树，一般都是使用**链表**进行数据存储

##### 3.6.2 使用链表存储数据

每一个节点封装成一个 Node，Node 中包含存储的数据、左节点的引用和右节点的引用

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201121458243.png" style="max-width:100%" />
</div>
