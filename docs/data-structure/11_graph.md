---
nav:
  title: 数据结构
  order: 1
group:
  title: 常见数据结构
  order: 1
order: 11
---

# 图(Graph)

## 一、图的介绍

### 1. 什么是图？

- **图结构**是一种与**树结构**有些相似的数据结构
- **图论**是数学的一个分支，并且，在数学中，树是图的一种
- 图论以图为研究对象，研究**顶点**和**边**组成的**图形**的数学理论和方法
- 主要的研究目的为：**事物之间的联系**，**顶点**代表**事物**，**边**代表两个事物间的**关系**

### 2.图的特点

- **一组顶点**：通常用 **V** （Vertex）表示顶点的集合
- 一组边：通常用 E（Edge）表示边的集合
  - 边是顶点和顶点之间的连线
  - 边可以是有向的，也可以是无向的。比如 A----B 表示无向，A ---> B 表示有向

### 3. 图的常用术语：

- **顶点：**表示图中的一个**节点**
- **边：**表示**顶点和顶点**给之间的**连线**
- **相邻顶点：**由一条边连接在一起的顶点称为**相邻顶点**
- **度：**一个顶点的**度**是**相邻顶点的数量**
- **路径：**
  - **简单路径：** 简单路径要求不包含重复的顶点
  - **回路：** 第一个顶点和最后一个顶点**相同**的路径称为回路
- **无向图：** 图中的所有边都是**没有**方向的
- **有向图：** 图中的所有边都是**有**方向的
- **无权图：** 无权图中的边没有任何权重意义
- **带权图：** 带权图中的边有一定的权重含义

### 4. 图的表示

#### 4.1 邻接矩阵

表示图的常用方式为：**邻接矩阵**，如下图所示

- 可以使用二维数组来表示邻接矩阵
- 邻接矩阵让**每个节点和一个整数相关联**，该**整数作为数组的下标值**
- 使用一个**二维数组**来表示顶点之间的**连接**

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171341874.png" style="max-width:100%" />
</div>

邻接矩阵表示法示例，如上图所示：

- 二维数组中的**0**表示**没有连线**，**1**表示**有连线**
  - 如：A[ 0 ] [ 3 ] = 1，表示 A 和 C 之间有连接
- 邻接矩阵的对角线上的值都为 0，表示 A - A ，B - B，等**自回路都没有连接**（自己与自己之间没有连接）
- 若为无向图，则邻接矩阵应为对角线上元素全为 0 的对称矩阵

##### 邻接矩阵存在的问题：

- 如果图是一个**稀疏图**，那么邻接矩阵中将存在**大量的 0**，造成**存储空间的浪费**

#### 4.2 邻接表

另外一种表示图的常用方式为：**邻接表**，如下图所示

- 邻接表由图中**每个顶点**以及**和顶点相邻的顶点列表**组成
- 这个列表可用多种方式存储，比如：**数组/链表/字典（哈希表）** 等都可以

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171345893.png" style="max-width:100%" />
</div>

如上图所示：

- 图中可清楚看到**A 与 B、C、D 相邻**，假如要表示这些与 A 顶点相邻的顶点（边），可以通过将它们作为 A 的值（value）存入到对应的**数组/链表/字典**中
- 之后，通过键（key）A，可以十分方便地取出对应的数据

##### 邻接表的问题：

- 邻接表可以简单地得出**出度**，即**某一顶点指向其他顶点的个数**；
- 但是，邻接表计算**入度**（指向某一顶点的其他顶点的个数称为该顶点的入度）十分困难，此时需要构造**逆邻接表**才能有效计算入度

## 二、图结构的封装

这里我们采用**邻接表**的方式进行封装，使用之前封装过的**字典结构**（也可以理解为 Map）来**存储临近表**

### 2.1 图类的创建

```js
function Graph() {
  this.vertexes = []; // 存放顶点
  this.adList = new Dictionary(); // 使用字典结构存放 边 信息
}
```

### 2.2 添加顶点和边

- 我们需要创建一个数组对象 vertexes 存储图的顶点

- 创建一个字典对象 edges，来存储图的边，其中 key 为顶点值，value 为存储 key 顶点**相邻顶点的数组**
- 如下图所示

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171357972.png" style="max-width:100%" />
</div>

```js
// 1.添加顶点
Graph.prototype.addVertex = function (val) {
  this.vertexes.push(val); // 添加顶点
  this.adList.set(val, []); // 初始化顶点对应的边
};

// 2.添加边
Graph.prototype.addEdge = function (val1, val2) {
  // 因为边是相互存在的，所以需要存储关联两个顶点的信息
  // 这里实现的是无向图，所以不考虑方向的问题
  this.adList.get(val1).push(val2);
  this.adList.get(val2).push(val1);
};
```

### 2.3 实现 toString()方法

为图类 Graph 添加 toString 方法，实现以邻接表的形式输出图中各顶点

```js
// 3.toString方法
Graph.prototype.toString = function () {
  var resString = '';
  for (var i = 0; i < this.vertexes.length; i++) {
    resString += this.vertexes[i] + '->';
    var adList = this.adList.get(this.vertexes[i]);
    for (var j = 0; j < adList.length; j++) {
      resString += adList[j] + ' ';
    }
    resString += '\n';
  }
  return resString;
};
```

#### 测试代码

```js
// 测试代码
let graph = new Graph();

// 添加顶点
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertexes.length; i++) {
  graph.addVertex(myVertexes[i]);
}

// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());
// A->B C D
// B->A E F
// C->A D G
// D->A C G H
// E->B I
// F->B
// G->C D
// H->D
// I->E
```

### 2.4 图的遍历方式

##### 图的遍历思想：

- 图的遍历思想与树的遍历思想一样，意味着需要将图中**所有的顶点**都访问一遍，并且不能有**重复的访问**（上面的 toString 方法会重复访问）

##### 遍历图的两种算法：

- 广度优先搜索（Breadth - First Search，简称**BFS**）
- 深度优先搜索（Depth - First Search，简称**DFS**）
- 两种遍历算法都需要指定**第一个被访问的顶点**

为了记录顶点是否被访问过，这里使用**三种颜色**来表示它们的状态

- **白色**：表示该顶点还没有被访问过
- **灰色**：表示该顶点被访问过，但其相邻顶点并未完全被访问过
- **黑色**：表示该顶点被访问过，且其所有相邻顶点都被访问过

首先封装 initializeColor 方法将图中的所有顶点初始化为白色，代码实现如下：

```js
/**
 * 4.初始化顶点颜色
 * 白色表示该顶点还没有被访问.
 * 灰色表示该顶点被访问过, 但并未被探索过.
 * 黑色表示该顶点被访问过且被完全探索过.
 */
Graph.prototype._initColors = function () {
  var colors = [];
  for (var i = 0; i < this.vertexes.length; i++) {
    colors[this.vertexes[i]] = 'white';
  }
  return colors;
};
```

### 2.5 广度优先搜索(BFS)

#### 思路：

- 广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻顶点，就像一次访问图的一层
- 也可以说是**先宽后深**地遍历图中的各个顶点

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171410836.png" style="max-width:100%" />
</div>

#### **实现思路：**

基于**队列**可以简单地实现广度优先搜索算法：

- 首先创建一个队列 Q（尾部进，首部出）
- 调用封装的 initializeColor 方法将所有顶点初始化为白色
- 指定第一个顶点 A，将 A 标注为**灰色**（被访问过的节点），并将 A 放入队列 Q 中
- 循环遍历队列中的元素，只要队列 Q 非空，就执行以下操作
  - 先将灰色的 A 从 Q 的首部取出
  - 取出 A 后，将 A 的所有未被访问过（白色）的相邻顶点依次从队列 Q 的尾部加入队列，并变为灰色。以此保证，灰色的相邻顶点不重复加入队列
  - A 的全部相邻节点加入 Q 后，A 变为黑色，在下一次循环中被移除 Q 外

#### 代码实现：

```js
// 5.广度优先遍历
Graph.prototype.bfs = function (initV, handler) {
  var colors = this._initColors();
  var queue = new Queue();

  // 将定点放入队列
  queue.enqueue(initV);

  while (!queue.isEmpty()) {
    var qVal = queue.dequeue(); // 拿到队头的顶点
    var qAdj = this.adList.get(qVal); // 拿到队头对应的边
    // 将队头设置正在探索中 灰色
    colors[qVal] = 'gray';

    // 将队头顶点相邻的边 全部拿出来遍历一遍，并加入到队列中
    for (var i = 0; i < qAdj.length; i++) {
      var vertexValue = qAdj[i]; // 取出相邻顶点
      // 如果这个顶点是白色，说明没有被访问过
      if (colors[vertexValue] === 'white') {
        // 正在访问
        colors[vertexValue] = 'gray';
        // 将相邻顶点入队
        queue.enqueue(vertexValue);
      }
    }

    // 代表该定点已经探索完毕，设置为黑色
    colors[qVal] = 'black';

    // 输出
    handler && handler(qVal);
  }
};
```

##### 测试代码

```js
graph.bfs(graph.vertexes[0], function (value) {
  console.log(value); // A,B,C,D,E,F,G,H,I,
});
```

#### 过程详解

下为指定的第一个顶点为 A 时的遍历过程：

- 如 a 图所示，将在字典 edges 中取出的与 A 相邻的且未被访问过的白色顶点 B、C、D 放入队列 que 中并变为灰色，随后将 A 变为黑色并移出队列
- 接着，如图 b 所示，将在字典 edges 中取出的与 B 相邻的且未被访问过的白色顶点 E、F 放入队列 que 中并变为灰色，随后将 B 变为黑色并移出队列

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171430137.png" style="max-width:100%" />
</div>

- 如 c 图所示，将在字典 edges 中取出的与 C 相邻的且未被访问过的白色顶点 G（A，D 也相邻不过已变为灰色，所以不加入队列）放入队列 que 中并变为灰色，随后将 C 变为黑色并移出队列
- 接着，如图 d 所示，将在字典 edges 中取出的与 D 相邻的且未被访问过的白色顶点 H 放入队列 que 中并变为灰色，随后将 D 变为黑色并移出队列

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171430755.png" style="max-width:100%" />
</div>

如此循环直到队列中元素为 0，即所有顶点都变黑并移出队列后才停止，此时图中顶点已被全部遍历

为了更好的理解 BFS，这里提供一份简版 BFS，核心思路都是一样的

#### 简版 BFS

```js
const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3],
};

const bfs = (root) => {
  const visited = new Set(); // 用来存储，节点是否访问过
  visited.add(root);
  const q = [root]; //新建队列，根结点入队

  while (q.length) {
    let n = q.shift(); // 队列节点出队，拿到队头
    console.log(n); // 访问节点
    // 访问相邻节点，并入队
    graph[n]?.forEach((item) => {
      if (!visited.has(item)) {
        // 若没被访问过
        q.push(item); // 入队
        visited.add(item); // 表示已经访问过
      }
    });
  }
};

bfs(2); // 2 0 3 1
```

### 2.6 深度优先搜索(DFS)

#### 思路：

- 深度优先搜索算法将会从指定的第一个顶点开始遍历图，沿着一条路径遍历直到该路径的最后一个顶点都被访问过为止
- 接着沿原来路径回退并探索下一条路径，即**先深后宽**地遍历图中的各个顶点

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171434796.png" style="max-width:100%" />
</div>

#### 实现思路：

- 可以使用**栈**结构来实现深度优先搜索算法
- 深度优先搜索算法的遍历顺序与二叉搜索树中的先序遍历较为相似，同样可以使用**递归**来实现（递归的本质就是**函数栈**的调用）

基于递归实现深度优先搜索算法：定义 dfs 方法用于调用递归方法 dfsVisit，定义 dfsVisit 方法用于递归访问图中的各个顶点。

这里实现 dfs 时，实现一个辅助函数 dfsVisit，方便递归实现 DFS。

在 dfs 方法中：

- 首先，调用 initializeColor 方法将所有顶点初始化为白色
- 然后，调用 dfsVisit 方法遍历图的顶点

在 dfsVisit 方法中：

- 首先，将传入的指定节点 v 标注为**灰色**
- 接着，处理顶点 V
- 然后，访问 V 的相邻顶点
- 最后，将顶点 v 标注为黑色

#### 代码实现：

```js
// 6.深度优先遍历
Graph.prototype.dfs = function (initValue, handler) {
  var colors = this._initColors(); // 初始化顶点颜色
  this.dfsVisit(initValue, colors, handler); // 遍历
};

Graph.prototype.dfsVisit = function (v, colors, handler) {
  colors[v] = 'gray'; // 访问中

  handler && handler(v); // 访问该顶点

  var vList = this.adList.get(v); // 获取相邻顶点
  for (var i = 0; i < vList.length; i++) {
    if (colors[vList[i]] === 'white') {
      this.dfsVisit(vList[i], colors, handler); // 递归访问
    }
  }

  colors[v] = 'black'; // 访问结束
};
```

##### 测试代码

```js
graph.dfs(graph.vertexes[0], function (value) {
  console.log(value); // A,B,E,I,F,C,D,G,H
});
```

#### 过程详解

这里主要解释一下代码中的第 3 步操作：访问指定顶点的相邻顶点。

- 以指定顶点 A 为例，先从储存顶点及其对应相邻顶点的字典对象 edges 中取出由顶点 A 的相邻顶点组成的数组

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171440889.png" style="max-width:100%" />
</div>

- **第一步**：A 顶点变为灰色，随后进入第一个 for 循环，遍历 A 白色的相邻顶点：B、C、D；在该 for 循环的第 1 次循环中（执行 B），B 顶点满足：colors == "white"，触发递归，重新调用该方法
- **第二步**：B 顶点变为灰色，随后进入第二个 for 循环，遍历 B 白色的相邻顶点：E、F；在该 for 循环的第 1 次循环中（执行 E），E 顶点满足：colors == "white"，触发递归，重新调用该方法
- **第三步**：E 顶点变为灰色，随后进入第三个 for 循环，遍历 E 白色的相邻顶点：I；在该 for 循环的第 1 次循环中（执行 I），I 顶点满足：colors == "white"，触发递归，重新调用该方法
- **第四步**：I 顶点变为灰色，随后进入第四个 for 循环，由于顶点 I 的相邻顶点 E 不满足：colors == "white"，停止递归调用。过程如下图所示：

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171441364.png" style="max-width:100%" />
</div>

- **第五步**：递归结束后一路向上返回，首先回到第三个 for 循环中继续执行其中的第 2、3...次循环，每次循环的执行过程与上面的同理，直到递归再次结束后，再返回到第二个 for 循环中继续执行其中的第 2、3...次循环....以此类推直到将图的所有顶点访问完为止。

下图为遍历图中各顶点的完整过程：

- **发现**表示访问了该顶点，状态变为**灰色**；
- **探索**表示既访问了该顶点，也访问了该顶点的全部相邻顶点，状态变为**黑色**；
- 由于在顶点变为灰色后就调用了处理函数 handler，所以 handler 方法的输出顺序为发现顶点的顺序即：A、B、E、I、F、C、D、G、H 。

<div align=center>
  <img src="https://cdn.jsdelivr.net/gh/gaoxiaoduan/picGoImg@main/images/202201171441521.png" style="max-width:100%" />
</div>

为了更好的理解 DFS，这里也提供一份简版 DFS

#### 简版 DFS

```js
const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3],
};

let set = new Set();
const dfs = (n) => {
  console.log(n);
  set.add(n);
  graph[n]?.forEach((item) => {
    if (!set.has(item)) {
      dfs(item);
    }
  });
};

dfs(2); // 2 0 1 3
```

### 2.7 完整代码

```js
const Dictionary = require('./dict');
const Queue = require('../03-队列结构/01-queue');

function Graph() {
  this.vertexes = []; // 存放顶点
  this.adList = new Dictionary(); // 使用字典结构存放 边 信息

  // 1.添加顶点
  Graph.prototype.addVertex = function (val) {
    this.vertexes.push(val); // 添加顶点
    this.adList.set(val, []); // 初始化顶点对应的边
  };

  // 2.添加边
  Graph.prototype.addEdge = function (val1, val2) {
    // 因为边是相互存在的，所以需要存储关联两个顶点的信息
    // 这里实现的是无向图，所以不考虑方向的问题
    this.adList.get(val1).push(val2);
    this.adList.get(val2).push(val1);
  };

  // 3.toString方法
  Graph.prototype.toString = function () {
    var resString = '';
    for (var i = 0; i < this.vertexes.length; i++) {
      resString += this.vertexes[i] + '->';
      var adList = this.adList.get(this.vertexes[i]);
      for (var j = 0; j < adList.length; j++) {
        resString += adList[j] + ' ';
      }
      resString += '\n';
    }
    return resString;
  };

  /**
   * 4.初始化顶点颜色
   * 白色表示该顶点还没有被访问.
   * 灰色表示该顶点被访问过, 但并未被探索过.
   * 黑色表示该顶点被访问过且被完全探索过.
   */
  Graph.prototype._initColors = function () {
    var colors = [];
    for (var i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = 'white';
    }
    return colors;
  };

  // 5.广度优先遍历
  Graph.prototype.bfs = function (initV, handler) {
    var colors = this._initColors();
    var queue = new Queue();

    // 将定点放入队列
    queue.enqueue(initV);

    while (!queue.isEmpty()) {
      var qVal = queue.dequeue(); // 拿到队头的顶点
      var qAdj = this.adList.get(qVal); // 拿到队头对应的边
      // 将队头设置正在探索中 灰色
      colors[qVal] = 'gray';

      // 将队头顶点相邻的边 全部拿出来遍历一遍，并加入到队列中
      for (var i = 0; i < qAdj.length; i++) {
        var vertexeValue = qAdj[i]; // 取出相邻顶点
        // 如果这个顶点是白色，说明没有被访问过
        if (colors[vertexeValue] === 'white') {
          // 正在访问
          colors[vertexeValue] = 'gray';
          // 将相邻顶点入队
          queue.enqueue(vertexeValue);
        }
      }

      // 代表该定点已经探索完毕，设置为黑色
      colors[qVal] = 'black';

      // 输出
      handler && handler(qVal);
    }
  };

  // 6.深度优先遍历
  Graph.prototype.dfs = function (initValue, handler) {
    var colors = this._initColors(); // 初始化顶点颜色
    this.dfsVisit(initValue, colors, handler); // 遍历
  };

  Graph.prototype.dfsVisit = function (v, colors, handler) {
    colors[v] = 'gray'; // 访问中

    handler && handler(v); // 访问该顶点

    var vList = this.adList.get(v); // 获取相邻顶点
    for (var i = 0; i < vList.length; i++) {
      if (colors[vList[i]] === 'white') {
        this.dfsVisit(vList[i], colors, handler); // 递归访问
      }
    }

    colors[v] = 'black'; // 访问结束
  };
}

// 测试代码
let graph = new Graph();

// 添加顶点
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertexes.length; i++) {
  graph.addVertex(myVertexes[i]);
}

// 添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());
// A->B C D
// B->A E F
// C->A D G
// D->A C G H
// E->B I
// F->B
// G->C D
// H->D
// I->E

graph.bfs(graph.vertexes[0], function (value) {
  console.log(value); // A,B,C,D,E,F,G,H,I,
});

graph.dfs(graph.vertexes[0], function (value) {
  console.log(value); // A,B,E,I,F,C,D,G,H
});
```
