import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
type Props = {
  mood: string;
  setMood: (val: string) => void;
  onGenerate: () => void;
  disabled: boolean;
};

const MoodInput = ({ mood, setMood, onGenerate, disabled }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <div className="space-y-4">
      <Input
        ref={inputRef}
        placeholder="Hey! What's your mood today..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        disabled={disabled}
      />
      <Button
        className="w-full cursor-pointer"
        disabled={disabled}
        onClick={onGenerate}>
        Generate Email Template
      </Button>
    </div>
  );
};

export default MoodInput;
