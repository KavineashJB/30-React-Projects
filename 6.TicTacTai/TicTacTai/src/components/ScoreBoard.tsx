type Props = {
  score: { X: number; O: number };
  isPlayWithFriends: boolean;
};
const ScoreBoard = ({ score, isPlayWithFriends }: Props) => {
  return (
    <div className="space-y-3 w-[300px] flex justify-between items-center">
      <div className="text-[#38BDF8]">{`${
        isPlayWithFriends ? "Player 1 (X) : " : "You (X) : "
      } ${score.X}`}</div>
      <div className="text-[#F472B6]">{`${
        isPlayWithFriends ? "Player 2 (O) : " : "AI (O) : "
      } ${score.O}`}</div>
    </div>
  );
};

export default ScoreBoard;
