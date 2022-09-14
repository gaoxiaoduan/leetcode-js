/*
 * @lc app=leetcode.cn id=703 lang=javascript
 *
 * [703] 数据流中的第 K 大元素
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.minHeap = new MinHeap();
  for (const item of nums) {
    this.minHeap.insert(item);
    if (this.minHeap.size() > this.k) {
      this.minHeap.pop();
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

// 构建一个最小堆
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getPartentIndex(i) {
    return (i - 1) >> 1;
  }

  getLeftIndex(i) {
    return i * 2 + 1;
  }

  getRightIndex(i) {
    return i * 2 + 2;
  }

  swap(i, j) {
    let temp = this.heap[j];
    this.heap[j] = this.heap[i];
    this.heap[i] = temp;
  }

  shiftUp(index) {
    if (index === 0) return;
    let partentIndex = this.getPartentIndex(index);
    if (this.heap[partentIndex] > this.heap[index]) {
      this.swap(partentIndex, index);
      this.shiftUp(partentIndex);
    }
  }

  shiftDown(index) {
    let leftIndex = this.getLeftIndex(index);
    let rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.shiftUp(this.heap.length - 1);
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end
