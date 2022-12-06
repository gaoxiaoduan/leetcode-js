## [剑指 Offer 41. 数据流中的中位数](https://leetcode.cn/problems/shu-ju-liu-zhong-de-zhong-wei-shu-lcof/) <Badge type="error">hard</Badge>

时间复杂度O(N\*logN)
空间复杂度O(1)

- 思路
- 使用优先级队列，构造小顶堆和大顶堆
- 由于小顶堆(MinPriorityQueue)的顶是最小的元素，所以底部是较大的元素，命名为large
- 大顶堆(MaxPriorityQueue)，顶部元素大，底部元素小，命名small
- 在addNum的时候，要`维护两个堆的size不超过1`，还要`维护large的堆定元素大于等于small的堆顶`
```js
MedianFinder.prototype.addNum = function (num) {
    if (this.small.size() >= this.large.size()) {
        this.small.enqueue(num);
        this.large.enqueue(this.small.dequeue()?.element);
    } else {
        this.large.enqueue(num);
        this.small.enqueue(this.large.dequeue()?.element);
    }
};
```
- 简单的说，如果**要向large插入num，要先把num插入到small中，然后将small的堆顶元素插入large**，插入small时也一样
- 这样可以保证两个堆定的元素差小于等于1
- 最后根据奇偶性去返回中位数即可
- 如果是奇数，就将长度多的那个堆的堆顶元素返回
- 如果是偶数，说明两个堆的元素相等，返回两个堆顶元素的平均值即可
- 跟[295. 数据流的中位数](/js-logs/heap#295-数据流的中位数)相同

```js
/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
    // 优先级队列，leetcode内置了MaxPriorityQueue和MinPriorityQueue
    // https://github.com/datastructures-js/priority-queue
    this.large = new MinPriorityQueue(); // large解释：底部放大的，顶部是小的，说一使用小顶堆
    this.small = new MaxPriorityQueue();// small解释：底部放最小，顶部是大的，所以使用大顶堆
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    if (this.small.size() >= this.large.size()) {
        this.small.enqueue(num);
        this.large.enqueue(this.small.dequeue()?.element);
    } else {
        this.large.enqueue(num);
        this.small.enqueue(this.large.dequeue()?.element);
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    const largeElement = this.large.front()?.element,
        smallElement = this.small.front()?.element;
    if (this.large.size() > this.small.size()) {
        // 如果large的数量多，返回large的堆顶元素
        return largeElement;
    } else if (this.large.size() < this.small.size()) {
        // 如果small的数量多，返回small的堆顶元素
        return smallElement
    } else {
        // 如果是偶数，large和small的数量相等，各取堆顶元素，求平均值
        return (largeElement + smallElement) / 2.0
    }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
```
