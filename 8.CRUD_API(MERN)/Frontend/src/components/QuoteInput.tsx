import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MdOutlineClear, MdFilterAlt, MdFilterAltOff } from "react-icons/md";

type Props = {
  text: string;
  isEditable: boolean;
  isFilter: boolean;
  filter: string;
  setText: (val: string) => void;
  getFilteredQuotes: () => void;
  postAQuote: () => void;
  handleFilterChange: () => void;
  setIsFilter: (val: boolean) => void;
  setFilter: (val: string) => void;
};

const QuoteInput = ({
  text,
  isEditable,
  isFilter,
  filter,
  setText,
  getFilteredQuotes,
  postAQuote,
  handleFilterChange,
  setIsFilter,
  setFilter,
}: Props) => {
  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isFilter) {
      const newValue = e.target.value;
      if (newValue.length <= 60) {
        setText(newValue);
      }
    } else {
      setFilter(e.target.value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (text.length >= 60) {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ];
      const isPrintable =
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey;
      if (isPrintable) {
        e.preventDefault();
        alert("Too Long Input...");
      } else if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex relative">
            <Input
              className="w-full pr-7 border-gray-400 focus-visible:border-purple-500 focus-visible:ring-0"
              placeholder="Enter Text..."
              value={isFilter ? filter : text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              disabled={isEditable}
            />
            <MdOutlineClear
              className={`absolute right-2 top-1 translate-y-1/2 cursor-pointer ${
                text.length == 0 && "invisible"
              }`}
              title="Clear"
              onClick={() => setText("")}
            />
          </div>
          <div
            className="border-1 cursor-pointer border-black dark:border-white p-2 rounded-full"
            onClick={() => [setIsFilter(!isFilter), handleFilterChange()]}
          >
            {isFilter ? (
              <MdFilterAltOff className="text-lg" />
            ) : (
              <MdFilterAlt className="text-lg" />
            )}
          </div>
        </div>
        <div className="text-[10px] mt-1 ml-1 text-gray-600 font-semibold">
          {text.length}/60
        </div>
        <Button
          className="cursor-pointer w-full bg-gradient-to-r from-purple-500 to-pink-500 dark:text-white"
          onClick={isFilter ? getFilteredQuotes : postAQuote}
          disabled={isEditable || isFilter}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default QuoteInput;
