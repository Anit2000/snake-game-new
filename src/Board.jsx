import { useState, useRef, useEffect } from "react";
import Snake from "./Snake";
import "./Board.css";

const Board = () => {
  let boardSize = 14;
  const direction = useRef("ArrowRight");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({
    row: 8,
    col: 8,
  });
  const [snake, setSnake] = useState([
    { row: 4, col: 8 },
    { row: 4, col: 7 },
    { row: 4, col: 6 },
  ]);
  const [canvas, setCanvas] = useState(
    Array(boardSize)
      .fill(1)
      .map((el, ind) =>
        Array(boardSize)
          .fill(ind + 1)
          .map((el, ind) => ({
            row: el,
            col: ind + 1,
          }))
      )
      .flat()
  );
  function generateRandomNumbers() {
    let foodRow = Math.floor(Math.random() * boardSize + 1);
    let foodCol = Math.floor(Math.random() * boardSize + 1);
    return {
      row: foodRow,
      col: foodCol,
    };
  }
  function generateFoodPos() {
    let foodRandomPos = generateRandomNumbers();
    while (
      snake.some(
        (el) => el.row == foodRandomPos.row && el.col == foodRandomPos.col
      )
    ) {
      foodRandomPos = generateFoodPos();
    }
    console.log(foodRandomPos);
    setFood((prev) => foodRandomPos);
  }
  function moveSnake() {
    if (gameOver) return;
    let newSnake = [...snake];
    newSnake.unshift({
      row:
        (direction.current == "ArrowDown" && snake[0].row + 1) ||
        (direction.current == "ArrowUp" && snake[0].row - 1) ||
        snake[0].row,
      col:
        (direction.current == "ArrowRight" && snake[0].col + 1) ||
        (direction.current == "ArrowLeft" && snake[0].col - 1) ||
        snake[0].col,
    });
    if (food.col == newSnake[0].col && food.row == newSnake[0].row) {
      setScore((prev) => prev + 1);
      generateFoodPos();
    } else {
      newSnake.pop();
    }
    let snakeCollapse = newSnake.find(
      (el, ind) =>
        ind != 0 && el.row == newSnake[0].row && el.col == newSnake[0].col
    );
    snakeCollapse ? setGameOver((prev) => true) : "";
    setSnake((prev) => newSnake);
  }
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (
        e.code == "ArrowRight" ||
        e.code == "ArrowLeft" ||
        e.code == "ArrowDown" ||
        e.code == "ArrowUp"
      ) {
        direction.current = e.code;
      }
    });
    let interval = setInterval(moveSnake, 250);
    return () => clearInterval(interval);
  }, [snake]);
  return (
    <>
      {gameOver && <h4>Gameover</h4>}
      <h3>Score {score}</h3>
      <div className="board">
        {canvas.map((el, ind) => {
          let foodBlock =
            el.row == food.row && el.col == food.col ? " food" : "";
          return (
            <span
              className={
                snake.find((cord) => cord.row == el.row && cord.col == el.col)
                  ? "snake cell" + foodBlock
                  : "cell" + foodBlock
              }
              key={"cell-" + ind}
            >
              {ind}
            </span>
          );
        })}
      </div>
    </>
  );
};
export default Board;
