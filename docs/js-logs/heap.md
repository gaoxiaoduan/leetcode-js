---
nav: 刷题记录-js
group: 基础数据结构
order: 100
---

# 堆

## 703.数据流中的第 K 大元素 <Badge type="success">easy</Badge>

完全二叉树计算公式

- 根据子节点获取 根节点-> `(index -1) /2`
- 有根节点或者左右节点 ->
  - 左：`（index * 2）+1`
  - 右：左+1 `（index * 2）+2`

```js
// 构建最小堆
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    // return Math.floor((index - 1) / 2);
    return (index - 1) >> 1;
  }

  getLeftIndex(index) {
    return index * 2 + 1;
  }

  getRightIndex(index) {
    return this.getLeftIndex(index) + 1;
  }

  swap(i, j) {
    [this.heap[j], this.heap[i]] = [this.heap[i], this.heap[j]];
  }

  insert(val) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }

  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.getParentIndex(index);
    if (this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.shiftUp(parentIndex);
    }
  }

  pop() {
    const last = this.heap.pop();
    // 若heap只有一个元素，直接pop即可
    if (this.heap.length !== 0) {
      // 若heap还有内容
      this.heap[0] = last; // 使用last元素直接替换掉heap[0]相当于删除
      this.shiftDown(0);
    }
  }

  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[index] > this.heap[leftIndex]) {
      this.swap(index, leftIndex);
      this.shiftDown(leftIndex);
    }

    if (this.heap[index] > this.heap[rightIndex]) {
      this.swap(index, rightIndex);
      this.shiftDown(rightIndex);
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}
/**
 * @param {number} k
 * @param {number[]} nums
 */
// 可以理解为找出世界上第k厉害的人
var KthLargest = function (k, nums) {
  this.k = k;
  this.minHeap = new MinHeap();

  for (const item of nums) {
    this.minHeap.insert(item); // 插入元素，最小堆内会排序
    if (this.minHeap.size() > this.k) {
      // 堆内元素多于k
      this.minHeap.pop(); // 将最小的元素移除
    }
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.minHeap.insert(val);
  if (this.minHeap.size() > this.k) {
    this.minHeap.pop();
  }
  return this.minHeap.peek();
};
```
