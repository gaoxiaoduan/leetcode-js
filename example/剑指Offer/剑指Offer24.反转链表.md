## [剑指 Offer 24. 反转链表](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/) <Badge type="success">easy</Badge>

- 递归
- 利用递归栈
- 跟[206.反转链表](/js-logs/linked-list#206反转链表)相同

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const last = reverseList(head.next);
  // 4 --> 5 --> null 原来
  // 4 --> 5
  // 4 <-- 5
  head.next.next = head;

  // 4 -x-> 5
  // 4 <--- 5
  head.next = null;
  return last;
};
```
