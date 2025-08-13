import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type Props = {
  color: string;
  subject: string;
  footer: string;
  onReset: () => void;
};

const MoodOutput = ({ color, subject, footer, onReset }: Props) => {
  return (
    <div className="space-y-4 my-3">
      <div>
        <label className="block font-medium mb-1">Subject</label>
        <Input
          style={{ color: color }}
          className="font-semibold"
          value={subject}
          readOnly
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Footer Signature</label>
        <Textarea
          style={{ color: color }}
          className="font-semibold"
          value={footer}
          readOnly
        />
      </div>

      <Button
        className="w-full cursor-pointer"
        variant={"destructive"}
        onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

export default MoodOutput;
