import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

type Props = {
  color: string;
  subject: string;
  footer: string;
  onReset: () => void;
};

const MoodOutput = ({ color, subject, footer, onReset }: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const date = new Date();
  const fullDate =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

  function handleCopy() {
    navigator.clipboard
      .writeText(subject)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => console.error("Faied to copy ", err));
  }

  return (
    <div className="space-y-4 my-3">
      <div>
        <div className="flex justify-between items-center">
          <label className="block font-medium mb-1">Subject</label>
          <label className="bg-gray-500 text-white rounded-sm p-1 text-[12px] mb-2">
            {fullDate}
          </label>
        </div>
        <div className="relative">
          <Input
            style={{ color: color }}
            className="relative font-semibold"
            value={subject}
            readOnly
          />

          {!isCopied ? (
            <MdContentCopy
              onClick={handleCopy}
              className="absolute right-0 top-1/2 -translate-y-1/2 mx-2 cursor-pointer"
            />
          ) : (
            <FaCheck className="absolute right-0 top-1/2 -translate-y-1/2 mx-2 cursor-pointer" />
          )}
        </div>
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
