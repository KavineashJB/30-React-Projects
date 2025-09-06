import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import getAIMoveFromOpenRouter from "./utils/aiOpenRouter";
import { checkWinner } from "./utils/winner";
import DifficultyLevel from "./components/DifficultyLevel";

const App = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [isPlayWithFriends, setIsPlayWithFriends] = useState<boolean>(false);
  const [isEasyMode, setIsEasyMode] = useState<boolean>(true);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState<boolean>(true);

  function handleClick(index: number) {
    if (!isPlayerTurn || board[index] || winner) return;

    const newBoard: (string | null)[] = [...board];
    if (isPlayWithFriends) {
      if (isPlayer1Turn) {
        newBoard[index] = "X";
        setIsPlayer1Turn(false);
      } else {
        newBoard[index] = "O";
        setIsPlayer1Turn(true);
      }
      setBoard(newBoard);
    } else {
      newBoard[index] = "X";
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  }

  useEffect(() => {
    // If already winner setted then don't set again
    // Avoiding double scoring because this useEffect executed for both board and winner updates.
    // For finding winners both board and winner changes.
    if (winner) return;

    const winnerResult = checkWinner(board);

    if (winnerResult?.winner) {
      setWinner(winnerResult.winner);
      setScore((prev) => ({
        ...prev,
        [winnerResult.winner]: prev[winnerResult.winner as "X" | "O"] + 1, // Type Assertion
      }));

      return;
    }

    if (!isPlayWithFriends && !isPlayerTurn && !winner) {
      const aiTurn = async () => {
        const move: number | null = await getAIMoveFromOpenRouter(
          board,
          isEasyMode
        );

        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      };

      const timeout = setTimeout(aiTurn, 600);

      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, winner]);

  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setIsPlayer1Turn(true);
    setWinner(null);
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">Tic Tac TAI 🤖</h1>
      <DifficultyLevel
        isPlayWithFriends={isPlayWithFriends}
        isEasyMode={isEasyMode}
        setScore={setScore}
        setIsPlayWithFriends={setIsPlayWithFriends}
        setIsEasyMode={setIsEasyMode}
        restartGame={restartGame}
      />
      <ScoreBoard score={score} isPlayWithFriends={isPlayWithFriends} />
      <GameBoard board={board} handleClick={handleClick} />
      {winner ? (
        <div className="mt-4 text-xl">
          {winner === "Draw" ? "It's a Draw" : winner + " wins!"}
          <button
            className="cursor-pointer ml-4 px-4 py-2 bg-[#3BBDFB] text-black rounded hover:bg-[#0EA5E9]"
            onClick={restartGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="text-xl mt-3">
          {isPlayWithFriends
            ? isPlayer1Turn
              ? "It's Player 1 Turn - X"
              : "It's Player 2 Turn - O"
            : isPlayerTurn
            ? "It's your Turn"
            : "AI Thinking..."}
        </div>
      )}
    </div>
  );
};

export default App;
