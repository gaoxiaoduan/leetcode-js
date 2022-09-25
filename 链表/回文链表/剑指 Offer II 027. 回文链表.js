/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let left = head;

  var traverse = function (right) {
    if (right === null) return true;
    let res = traverse(right.next);

    res = res && right.val === left.val;
    left = left.next;
    return res;
  };

  return traverse(head);
};
