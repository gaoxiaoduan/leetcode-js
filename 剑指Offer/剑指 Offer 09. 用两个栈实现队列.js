// 此题目跟232.用栈实现队列相同 https://leetcode.cn/problems/implement-queue-using-stacks/
var CQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if (this.stack2.length === 0) {
    while (this.stack1.length) {
      const item = this.stack1.pop();
      this.stack2.push(item);
    }
  }
  const res = this.stack2.pop();
  return res === undefined ? -1 : res;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
