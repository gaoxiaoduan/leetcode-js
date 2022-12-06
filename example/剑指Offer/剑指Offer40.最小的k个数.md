## [剑指 Offer 40. 最小的k个数](https://leetcode.cn/problems/zui-xiao-de-kge-shu-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N*logN)
空间复杂度 O(1)

- 思路
- 先对arr进行sort排序
- 然后使用slice取前k个元素返回


```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
    arr.sort((a, b) => a - b);
    return arr.slice(0, k);
};
```

- 使用最小堆进行排序
- 然后从最小堆中弹出k个元素返回即可

```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
    const minHeap = new MinHeap();
    for (const item of arr) {
        minHeap.insert(item);
    }
    let res = new Array(k);
    for (let i = 0; i < k; i++) {
        res[i] = minHeap.pop();
    }
    return res;
};

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
        let head = this.peek();
        const last = this.heap.pop();
        // 若heap只有一个元素，直接pop即可
        if (this.heap.length !== 0) {
            // 若heap还有内容
            this.heap[0] = last; // 使用last元素直接替换掉heap[0]相当于删除
            this.shiftDown(0);
        }
        return head;
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
```
