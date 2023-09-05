import { useState } from "react";
const Snake = () => {
  class SnakeNode {
    constructor(data) {
      (this.data = data), (this.next = null);
    }
  }
  class SnakeList {
    constructor(head = null) {
      this.head = head;
    }
    getTail() {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      return current;
    }
    addNode(node) {
      if (!this.head) {
        this.head = node;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
    }
  }
  let [snake, setSnake] = useState(
    new SnakeList(new SnakeNode({ row: 4, col: 6 }))
  );
  snake.addNode(
    new SnakeNode({
      row: snake.getTail().data.row + 1,
      col: snake.getTail().data.col,
    })
  );
  snake.addNode(
    new SnakeNode({
      row: snake.getTail().data.row + 1,
      col: snake.getTail().data.col,
    })
  );
  let array = [snake.head.data];
  let current = snake.head;
  while (current.next) {
    array.push(current.data);
    current = current.next;
  }
  return <>snake</>;
};
export default Snake;
