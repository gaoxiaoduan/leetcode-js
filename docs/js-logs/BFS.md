---
nav: JavaScript题解
group:
  title: 基础算法
  order: 1
order: 3
toc: content
---

# BFS

BFS 的核心思想应该不难理解的，就是把一些问题抽象成图，从一个点开始，向四周开始扩散。一般来说，我们写 BFS 算法都是用「队列」这种数据结构，每次将一个节点周围的所有节点加入队列。

BFS 相对 DFS 的最主要的区别是：BFS 找到的路径一定是最短的，但代价就是空间复杂度可能比 DFS 大很多

<embed src="@/example/二叉树/111.二叉树的最小深度.md"></embed>

<embed src="@/example/BFS/752.打开转盘锁.md"></embed>
