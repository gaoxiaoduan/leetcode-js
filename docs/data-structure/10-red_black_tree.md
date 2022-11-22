---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 10
---

# 红黑树(RedBlackTree)

## 一、红黑树的介绍

> **红黑树**（Red–black tree）是一种[自平衡二叉查找树](https://zh.wikipedia.org/wiki/自平衡二叉查找树)，是在[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)中用到的一种[数据结构](https://zh.wikipedia.org/wiki/数据结构)，典型用途是实现[关联数组](https://zh.wikipedia.org/wiki/关联数组)。它在 1972 年由[鲁道夫·贝尔](https://zh.wikipedia.org/wiki/鲁道夫·贝尔)发明，被称为"**对称二叉 B 树**"，它现代的名字源于 Leo J. Guibas 和[罗伯特·塞奇威克](https://zh.wikipedia.org/wiki/罗伯特·塞奇威克)于[1978 年](https://zh.wikipedia.org/wiki/1978年)写的一篇论文。
>
> 红黑树的结构复杂，但它的操作有着良好的最坏情况[运行时间](https://zh.wikipedia.org/wiki/算法分析)，并且在实践中高效：它可以在![{\displaystyle {\text{O}}(\log n)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/67697a0b44080bbf967c00d60bf4aac79f9ce385)时间内完成查找、插入和删除，这里的![n](https://wikimedia.org/api/rest_v1/media/math/render/svg/a601995d55609f2d9f5e233e36fbe9ea26011b3b)是树中元素的数目
>
> ----来自维基百科

## 二、红黑树的五条规则

红黑树除了符合二叉搜索树的基本规则外，还添加了以下特性：

- **规则 1：节点是红色或黑色的**
- **规则 2：根节点是黑色的**
- **规则 3：每个叶子节点都是黑色的空节点（NIL 节点）**
- **规则 4：每个红色节点的两个子节点都是黑色的（从每个叶子到根的所有路径上不可能有两个连续的红色节点）**
- **规则 5：从任一节点到其每个叶子节点的所有路径都包含相同数目的黑色节点**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141413757.png" style="max-width:100%" />
</div>

### 红黑树的相对平衡

前面 5 条规则的约束确保了以下红黑树的关键特性：

- 从**根到叶子节点**的**最长路径**，不会超过**最短路径**的**两倍**
- 结果就是这棵树**基本**是平衡的
- 虽然没有做到绝对的平衡，但是可以保证在最坏的情况下，该树依然是高效的

为什么可以做到**最长路径不超过最短路径的两倍**呢？

- **性质 4**决定了路径上不能有两个相连的红色节点
- 所以，最长路径一定是红色节点和黑色节点交替而成的
- 由于根节点和叶子节点都是黑色的，最短路径可能都是黑色节点，并且最长路径中一定是黑色节点多于红色节点
- **性质 5**决定了所有路径上都有相同数目的黑色节点
- 这就表明了没有路径能多于其他任何路径两倍长

## 三、红黑树的三种变化

插入一个新节点时，有可能树不再平衡，可以通过三种方式的变换使树保持平衡：

- **变色**
- **左旋转**
- **右旋转**

### 3.1 变色

为了重新符合红黑树的规则，需要把**红色**节点变为**黑色**，或者把**黑色**节点变为**红色**

插入的**新节点**通常都是**红色节点**：

- 当插入的节点为**红色**的时候，大多数情况**不违反**红黑树的任何规则
- 而**插入黑色节点，**必然会导致一条路径上多了一个**黑色节点**，这是很难调整的
- 红色节点虽然可能导致**红红相连**的情况，但是这种情况可以通过**颜色调换和旋转**来调整

### 3.2 左旋转

以节点 X 为根**逆时针**旋转二叉搜索树，使得父节点原来的位置被自己的右子节点替代，左子节点的位置被父节点替代

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141419854.png" style="max-width:100%" />
</div>

**旋转过程详解：**

如上图所示，左旋转之后：

- 节点 X 取代了节点 a 原来的位置
- 节点 Y 取代了节点 X 原来的位置
- 节点 X 的**左子树** a 仍然是节点 X 的**左子树**（这里 X 的左子树只有一个节点，有多个节点时同样适用，以下同理）
- 节点 Y 的**右子树** c 仍然是节点 Y 的**右子树**
- 节点 Y 的**左子树** b 向**左平移**成为了节点 X 的**右子树**

除此之外，二叉搜索树左旋转之后仍为二叉搜索树：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141420560.png" style="max-width:100%" />
</div>

### 3.3 右旋转

以节点 X 为根**顺时针**旋转二叉搜索树，使得父节点原来的位置被自己的左子节点替代，右子节点的位置被父节点替代

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141420707.png" style="max-width:100%" />
</div>

旋转过程详解：

如上图所示，右旋转之后：

- 节点 X 取代了节点 a 原来的位置
- 节点 Y 取代了节点 X 原来的位置
- 节点 X 的**右子树** a 仍然是节点 X 的**右子树**（这里 X 的右子树虽然只有一个节点，但是多个节点时同样适用，以下同理）
- 节点 Y 的**左子树** b 仍然是节点 Y 的**左子树**
- 节点 Y 的**右子树** c 向**右平移**成为了**节点 X**的**左子树**

除此之外，二叉搜索树右旋转之后仍为二叉搜索树：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141422134.png" style="max-width:100%" />
</div>

## 四、红黑树的插入操作

首先需要明确，在保证满足红黑树 5 条规则的情况下，新插入的节点必然是**红色节点**。

为了方便说明，规定以下四个节点：新插入节点为**N**（Node），N 的父节点为**P**（Parent），P 的兄弟节点为**U**（Uncle），U 的父节点为**G**（Grandpa），如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141423233.png" style="max-width:100%" />
</div>

### 情况 1

当插入的新节点 N 位于树的根上时，没有父节点。

这种情况下，只需要将**红色**节点**变为黑色**节点即可满足规则 2 。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141424707.png" style="max-width:100%" />
</div>

### 情况 2

新节点 N 的父节点 P 为黑色节点，此时不需要任何变化。此时既满足规则 4 也满足规则 5。

尽管新节点是红色的，但是新节点 N 有两个黑色节点 NIL，所以通向它的路径上黑色节点的个数依然相等，因此满足规则 5 。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141427609.png" style="max-width:100%" />
</div>

### 情况 3

节点 P 为红色，节点 U 也为红色，此时节点 G 必为黑色，即**父红 叔红 祖黑**。在这种情况下需要：

- 先将父节点 P 变为黑色
- 再将叔叔节点 U 变为黑色
- 最后将祖父节点 G 变为红色

即变为**父黑叔黑祖红**，如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141430398.png" style="max-width:100%" />
</div>

可能出现的问题：

- N 的 **祖父节点 G** 的 **父节点** 也可能是 **红色**，这就违反了规则 4，此时可以通过**递归调整节点颜色**
- 当递归**调整到根节点时**就需要**旋转**了，如下图**节点 A 和节点 B**所示，具体情况后面会介绍

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141430174.png" style="max-width:100%" />
</div>

### 情况 4

节点 P 是红色节点，节点 U 是黑色节点，并且节点 N 为节点 P 的**左子节点**，此时节点 G 一定是黑色节点，即**父红叔黑祖黑**。

在这种情况下需要：

- **先变色**：将父节点 P 变为黑色，将祖父节点 G 变为红色，即**父黑祖红**
- **后旋转**：以**祖父节点 G 为根**进行**右旋转**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141432836.png" style="max-width:100%" />
</div>

### 情况 5

节点 P 是红色节点，节点 U 是黑色节点，并且节点 N 为节点 P 的**右子节点**，此时节点 G 一定是黑色节点，即**父红叔黑祖黑**。

在这种情况下需要：

- 先以**节点 P 为根进行左旋转，** 旋转后如图 b 所示
- 随后将**红色节点 P 和黑色节点 B**看成一个整体的**红色节点 N1**，将**新插入的红色节点 N** 看成 **红色节点 P1** 如图 c 所示。此时整体就转换为了情况 4。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141435146.png" style="max-width:100%" />
</div>

然后可以按照情况 4 进行处理：

- 先变色：将 N1 节点的父节点 P1 变为黑色，将祖父节点 G 变为红色
- 后旋转：以祖父节点 G 为根进行右旋转，旋转后如图 e 所示
- 最后将节点 N1 和 P1 变换回来，完成节点 N 的插入，如图 f 所示

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141441596.png" style="max-width:100%" />
</div>

## 五、实际插入案例

在二叉树中依次插入节点：10，9，8，7，6，5，4，3，2，1 。

如果直接采用普通的二叉搜索树，节点全部插入后是这样的：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141442070.png" style="max-width:100%" />
</div>

是一个严重的**不平衡树**，相当于一个链表，不能体现出二叉搜索树的高效率。而按照红黑树的五条规则插入节点就能最大程度保证搜索二叉树是一棵**平衡树**。

以下为在红黑树中实际插入 10，9，9....1 过程的详解，**为了方便解释省略了部分红黑树的叶子节点（NIL）**

### 插入 10

符合**情况 1**：

- 插入节点 10
- 将节点 10 的颜色变为黑色

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141444461.png" style="max-width:100%" />
</div>

### 插入 9

符合**情况 2**：

- 不需要任何变化

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141445259.png" style="max-width:100%" />
</div>

### 插入 8

我们快速判断属于情况 3 还是情况 4 的方法：

从新插入的**节点 N**出发，按图示箭头经过的四个节点，若为**红红黑红** 三个红色节点则为情况 3，若为**红红黑黑**两个红色节点则为情况 4

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141447088.png" style="max-width:100%" />
</div>

经过判断，我们插入 8 时符合**情况 4**，所以需要以下操作：

- 父节点 9 变成黑，祖父节点 10 变为红
- 以祖父节点为根进行右旋转

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141449351.png" style="max-width:100%" />
</div>

### 插入 7

符合**情况 3**：

- 父节点 8 和叔节点 10 变为黑，祖父节点 9 变为红
- 此时会出现问题：不符合规则 2，即根节点不为黑，此时可以把以 9 为根节点的二叉搜索树当作一个整体作为一个新插入的节点 N，而此时又符合情况 1，只需要把 9 变回黑色即可

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141449135.png" style="max-width:100%" />
</div>

### 插入 6

符合**情况 4**：

- 父节点 7 变为黑，祖父节点 8 变为红
- 以祖父节点 8 为根进行右旋转

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141450244.png" style="max-width:100%" />
</div>

### 插入 5

符合**情况 3**：

- 父节点 6 和叔节点 8 变为黑，祖父节点 7 变为红

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141451601.png" style="max-width:100%" />
</div>

### 插入 4

符合**情况 4**：

- 父节点 5 变为黑，祖父节点 6 变为红
- 以祖父节点 6 为根进行右旋转

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141451896.png" style="max-width:100%" />
</div>

### 插入 3

**第一次变换**：符合**情况 3**：

- 父节点 4 和叔节点 6 变为黑，祖父节点 5 变为红

变换之后发现 5 和 7 为相连的两个红色节点，于是把以 5 为根的整个子树看成一个新插入的节点 N1，再进行第二次变换。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141452123.png" style="max-width:100%" />
</div>

**第二次变换**：符合**情况 4**：

- 父节点 7 变为黑，祖父节点 9 变为红
- 以祖父节点 9 为根进行右旋转

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141452539.png" style="max-width:100%" />
</div>

最后复原 N1 得到变换后的红黑树：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141452629.png" style="max-width:100%" />
</div>

### 插入 2

符合**情况 4**：

- 父节点 3 变为黑，祖父节点 4 变为红
- 以祖父节点 4 为根进行右旋转

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141453449.png" style="max-width:100%" />
</div>

### 插入 1

**第一次变换**：符合**情况 3**：

- 父节点 2 和叔节点 4 变为黑，祖父节点 3 变为红

变换之后发现 3 和 5 为相连的两个红色节点，于是把以 3 为根的整个子树看成一个新插入的节点 N1，再进行第二次变换

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141453166.png" style="max-width:100%" />
</div>

**第二次变换**：符合**情况 3**：

- **父节点 5 和叔节点 9 变为黑**，**祖父节点 7 变为红**

变换之后发现根节点 7 为红色不符合规则 2，所以把以 7 为根节点的红黑树看成一个新插入的节点 N2，再进行第三次变换

**第三次变换**：符合**情况 1**：

- 直接将根节点 7 变为黑色即可

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141456103.png" style="max-width:100%" />
</div>

由此，完成了 1~10 节点的插入，虽然没有遇到情况 5，不过情况 5 经过左旋转的操作便可转换为情况 4，原理一样。如下图所示，将这棵红黑树的叶子节点 NIL 补全之后，经检验满足红黑树的五条规则，并且基本属于**平衡树**，效率较高。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201141456809.png" style="max-width:100%" />
</div>
