export const checkWinner = (board: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  // check if
  // 1. There's something in board[a] (not null)
  // 2. board[a]===board[b]
  // 3. board[a]===board[c]

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  // All cells are filled but no winner, Then it's a draw

  if (board.every((cell) => cell !== null)) {
    return { winner: "Draw", line: [] };
  }

  // All cells are not filled yet, return null -> Game Continuous...
  return null;
};
