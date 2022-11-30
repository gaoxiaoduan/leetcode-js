### [剑指 Offer 22. 链表中倒数第 k 个节点](https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/) <Badge type="success">easy</Badge>

时间复杂度 O(N)
空间复杂度 O(1)

- 思路
- 最初想到的是先遍历整个链表，得出链表长度 n
- 然后从头开始再遍历一次，第 n-k 的位置就是倒数 k 的节点
- 但是这样需要遍历两次链表
- 其实遍历一次也可以找出来
- 先声明一个指针 p1，先让 p1 向前走 k 步
- 然后再声明一个 p2，指向 head，再让两个指针同时向前走，当 p1 走到尽头，p2 指的那个就是倒数第 k 个节点

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let p1 = head;
  for (let i = 0; i < k; i++) {
    // 先让p1走k步
    p1 = p1.next;
  }
  // 此时声明p2指向头节点，p1,p2之间相差k距离
  let p2 = head;
  // p1,p2共同前进,当p1走到尾节点时，p2正好指向倒数第k个节点
  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p2;
};
```
