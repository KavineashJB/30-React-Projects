import Square from "./Square";

type Props = {
  board: (string | null)[];
  handleClick: (index: number) => void;
};

const GameBoard = ({ board, handleClick }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-[300px]">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          index={index}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
