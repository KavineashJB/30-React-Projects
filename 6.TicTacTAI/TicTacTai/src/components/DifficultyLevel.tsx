type Props = {
  isPlayWithFriends: boolean;
  isEasyMode: boolean;
  setScore: (val: { X: number; O: number }) => void;
  setIsPlayWithFriends: (val: boolean) => void;
  setIsEasyMode: (val: boolean) => void;
  restartGame: () => void;
};

const DifficultyLevel = ({
  isPlayWithFriends,
  isEasyMode,
  setScore,
  setIsPlayWithFriends,
  setIsEasyMode,
  restartGame,
}: Props) => {
  function handlePlayWithFriends(e: React.ChangeEvent<HTMLInputElement>) {
    setIsPlayWithFriends(e.target.checked);
    restartGame();
    setScore({ X: 0, O: 0 });
  }
  return (
    <div className="w-[300px] space-y-3 flex justify-between">
      <label
        htmlFor="hard"
        className={`cursor-pointer ${
          isPlayWithFriends && "opacity-20 cursor-not-allowed"
        }  text-red-400`}
      >
        <input
          type="radio"
          className={`cursor-pointer disabled:cursor-not-allowed ${
            isPlayWithFriends && "opacity-20"
          }  mr-1 accent-red-400 opacity-40 checked:opacity-100`}
          name="difficulty"
          id="hard"
          disabled={isPlayWithFriends}
          checked={!isEasyMode}
          onChange={() => {
            setIsEasyMode(false);
            restartGame();
          }}
        />
        Hard
      </label>
      <label
        htmlFor="easy"
        className={`cursor-pointer ${
          isPlayWithFriends && "opacity-20 cursor-not-allowed"
        }  text-green-400`}
      >
        <input
          type="radio"
          className={`cursor-pointer disabled:cursor-not-allowed ${
            isPlayWithFriends && "opacity-20"
          }  mr-1 accent-green-400 opacity-40 checked:opacity-100`}
          name="difficulty"
          id="easy"
          disabled={isPlayWithFriends}
          checked={isEasyMode}
          onChange={() => {
            setIsEasyMode(true);
            restartGame();
          }}
        />
        Easy
      </label>

      <label
        htmlFor="playWithFriends"
        className="text-orange-400 cursor-pointer"
      >
        <input
          type="checkbox"
          className="cursor-pointer mr-1 accent-orange-400 opacity-40 checked:opacity-100"
          name=""
          id="playWithFriends"
          checked={isPlayWithFriends}
          onChange={(e) => handlePlayWithFriends(e)}
        />
        Play with Friends
      </label>
    </div>
  );
};

export default DifficultyLevel;
