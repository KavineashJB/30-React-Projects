import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion";

type Props = {
  allQuotes: {
    _id: string;
    text: string;
    createdAt: string;
  }[];
  isEditable: boolean;
  loading: boolean;
  deleteQuote: (val: string) => void;
  setIsEditable: (val: boolean) => void;
  putQuote: (id: string, editableText: string) => void;
};

const QuoteList = ({
  allQuotes,
  isEditable,
  loading,
  deleteQuote,
  setIsEditable,
  putQuote,
}: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [editableText, setEditableText] = useState<string>("");
  const inputRef = useRef<{ [id: string]: HTMLInputElement | null }>({
    id: null,
  });

  useEffect(() => {
    if (isEditable && id) {
      inputRef.current[id]?.focus();
      inputRef.current[id]?.setSelectionRange(0, 0);
    }
  }, [isEditable, id]);

  async function handleCopyToClipboard(_id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setId(_id);
      setTimeout(() => {
        setId("");
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Failed to Copy:", error);
      console.log(isCopied);
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const item: any = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  function calculateTimesAgo(createdAt: string) {
    const now: Date = new Date();
    const past: Date = new Date(createdAt);
    const seconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);

    // check for years ago
    let interval: number = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    // check for month ago
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    // check for week ago
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + " weeks ago";

    // check for day ago
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    // check for hour ago
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    // check for minute ago
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    // check within a minute
    return "just now";
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
      key={allQuotes.length}
    >
      {loading ? (
        <motion.p
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Loading...
        </motion.p>
      ) : allQuotes.length ? (
        allQuotes.map((quote) => (
          <motion.div
            variants={item}
            key={quote._id}
            className={`w-full flex flex-col space-y-2 p-1 rounded-md shadow-lg hover:shadow-xl dark:shadow-gray-700 dark:shadow-md dark:hover:shadow-lg px-2 ${
              quote._id !== id && isEditable && "pointer-events-none opacity-30"
            }`}
          >
            <div className="flex justify-between">
              <Input
                ref={(el) => {
                  inputRef.current[quote._id] = el;
                }}
                value={
                  isEditable && quote._id == id
                    ? editableText
                    : quote.text.length > 25
                    ? quote.text.substring(0, 25) + "..."
                    : quote.text
                }
                onChange={(e) => setEditableText(e.target.value)}
                className={`border-0 text-gray-600 font-semibold focus-visible:ring-0 dark:bg-transparent ${
                  isEditable && quote._id == id ? "border-1" : "cursor-default"
                }`}
                readOnly={!isEditable}
              />
              <div className="flex gap-1 items-center">
                <div>
                  {isEditable && quote._id == id ? (
                    ""
                  ) : quote._id !== id ? (
                    <MdContentCopy
                      onClick={() =>
                        handleCopyToClipboard(quote._id, quote.text)
                      }
                      className="cursor-pointer text-gray-400"
                      title="Copy Quote"
                    />
                  ) : (
                    <FaCheck title="Quote Copied!" />
                  )}
                </div>
                <Button
                  className="h-7 w-15 cursor-pointer bg-blue-700 hover:bg-blue-800 dark:text-white"
                  onClick={() => {
                    if (isEditable) {
                      putQuote(quote._id, editableText);
                      setId("");
                      setIsEditable(false);
                      setEditableText("");
                    } else {
                      setIsEditable(true);
                      setId(quote._id);
                      setEditableText(quote.text);
                    }
                  }}
                  title={isEditable ? "Update Quote" : "Edit Quote"}
                >
                  {isEditable && quote._id === id ? "Update" : "Edit"}
                </Button>
                <Button
                  className="h-7 w-15 cursor-pointer dark:bg-red-600 dark:hover:bg-red-700"
                  variant={"destructive"}
                  onClick={() => {
                    if (isEditable) {
                      setIsEditable(false);
                      setId("");
                    } else {
                      const choice = confirm("Do You want to Delete");
                      if (choice) deleteQuote(quote._id);
                    }
                  }}
                  title={isEditable ? "Cancel Editing Quote" : "Delete Quote"}
                >
                  {isEditable && quote._id === id ? "Cancel" : "Delete"}
                </Button>
              </div>
            </div>
            <hr />
            <div className="text-gray-600 text-sm pl-1 pb-1">
              created {calculateTimesAgo(quote.createdAt)}
            </div>
          </motion.div>
        ))
      ) : (
        <motion.p
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          No Quotes Found
        </motion.p>
      )}
    </motion.div>
  );
};

export default QuoteList;
