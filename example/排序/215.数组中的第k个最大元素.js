/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start

// 快速搜索

// - 首先，针对已经排好序的数组，第k大，就是nums\[len-k\]位置上的元素，后序称为k'
// - 在快排分区时，其实已经为p找到自己在数组中正确对应的位置
// - 若k' > p,说明要找的元素在p的右半部分，也就是lo=p+1
// - 若k' < p,说明要找的元素在p的左半部分，也就是hi=p-1
// - 然后递归，直到p的位置刚好是k'，直接返回这个位置上的元素即可

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var findKthLargest = function (nums, k) {
    let lo = 0, hi = nums.length - 1, targetIndex = nums.length - k;

    while (lo <= hi) {
        const p = partition(nums, lo, hi);
        if (targetIndex > p) {
            lo = p + 1;
        } else if (targetIndex < p) {
            hi = p - 1;
        } else {
            return nums[p];
        }
    }

    return -1;
};

const partition = (nums, lo, hi) => {
    let p = nums[lo];
    let i = lo + 1, j = hi;
    while (i <= j) {
        while (i < hi && nums[i] <= p) {
            i++;
        }
        while (j > lo && nums[j] > p) {
            j--;
        }
        if (i >= j) {
            break;
        }
        swap(nums, i, j);
    }
    swap(nums, lo, j);
    return j;
}

const swap = (nums, i, j) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}



// -----------------最小堆解法----------------------
// var findKthLargest = function (nums, k) {
//   const heap = new MinHeap();
//   nums.forEach((item) => {
//     heap.insert(item);
//     if (heap.size() > k) {
//       heap.pop();
//     }
//   });
//   return heap.peek();
// };

// class MinHeap {
//   constructor() {
//     this.heap = [];
//   }

//   getParentIndex(i) {
//     return (i - 1) >> 1;
//   }

//   getLeftIndex(i) {
//     return i * 2 + 1;
//   }

//   getRightIndex(i) {
//     return i * 2 + 2;
//   }

//   swap(i, j) {
//     let temp = this.heap[j];
//     this.heap[j] = this.heap[i];
//     this.heap[i] = temp;
//   }

//   shiftUp(index) {
//     if (index === 0) return;
//     let parentIndex = this.getParentIndex(index);
//     if (this.heap[parentIndex] > this.heap[index]) {
//       this.swap(parentIndex, index);
//       this.shiftUp(parentIndex);
//     }
//   }

//   shiftDown(index) {
//     let leftIndex = this.getLeftIndex(index);
//     let rightIndex = this.getRightIndex(index);
//     if (this.heap[leftIndex] < this.heap[index]) {
//       this.swap(leftIndex, index);
//       this.shiftDown(leftIndex);
//     }
//     if (this.heap[rightIndex] < this.heap[index]) {
//       this.swap(rightIndex, index);
//       this.shiftDown(rightIndex);
//     }
//   }

//   insert(val) {
//     this.heap.push(val);
//     this.shiftUp(this.heap.length - 1);
//   }

//   pop() {
//     this.heap[0] = this.heap.pop();
//     this.shiftDown(0);
//   }

//   size() {
//     return this.heap.length;
//   }

//   peek() {
//     return this.heap[0];
//   }
// }
// @lc code=end
