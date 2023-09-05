const Gameover = (props) => {
  return (
    <div className="gameOver">
      <p>Game Over</p>
      <button onClick={props.newGame}>New Game</button>
    </div>
  );
};
export default Gameover;
