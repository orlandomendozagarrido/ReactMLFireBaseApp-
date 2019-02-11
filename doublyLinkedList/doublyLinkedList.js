/*
 * Create a doubly linked list with shift, unshift, push, pop, moveToEnd and
 * moveToFront methods.
 *
 * shift, unshift, push, and pop are the regular insertion and removal from the
 * ends methods, and moveToFront and moveToEnd take a node from the list and
 * move it to either the front of the list or the end of the list. All these
 * operations should be O(1).
 *
 * A doubly linked list is made up of nodes which have pointers to *both* the
 * node before and after them. For instance:
 *
 *        node             node             node             node
 *       ______           ______           ______           ______
 *      | head |.next => |      |.next => |      |.next => | tail |
 *      |  1   |         |  2   |         |  3   |         |  4   |
 *      |______| <= prev.|______| <= prev.|______| <= prev.|______|
 *
 *  front --> --> --> --> --> --> --> --> --> --> --> --> --> --> end
 */


var List = function () {
  /* START SOLUTION */
  /* END SOLUTION */
};

var ListNode = function (prev, val, next) {
  /* START SOLUTION */
  /* END SOLUTION */
};

// Insert at the head of the list.
List.prototype.unshift = function (val) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Delete at the head of the list.
List.prototype.shift = function () {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Insert at the end of the list.
List.prototype.push = function (val) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Delete at the end of the list.
List.prototype.pop = function () {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Move a node to the front of the List
List.prototype.moveToFront = function (node) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Move a node to the end of the List
List.prototype.moveToEnd = function (node) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Convert from an array
List.fromArray = function (array) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Insert a value right after the node.
ListNode.prototype.insertAfter = function (val) {

};

// Insert a value right before the node.
ListNode.prototype.insertBefore = function (val) {

};

ListNode.prototype.delete = function () {

};

/* END SOLUTION */
