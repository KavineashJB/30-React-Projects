import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  mood: string;
  setMood: (val: string) => void;
  onGenerate: () => void;
  disabled: boolean;
};

const MoodInput = ({ mood, setMood, onGenerate, disabled }: Props) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Hey! What's your mood today..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        disabled={disabled}
      />
      <Button className="w-full" disabled={disabled} onClick={onGenerate}>
        Generate Email Template
      </Button>
    </div>
  );
};

export default MoodInput;
