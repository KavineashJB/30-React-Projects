import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [displayMessage, setDisplayMessage] = useState<string>();

  const handleSendWithDelay = () => {
    setIsSending(true);

    let id = setTimeout(() => {
      setDisplayMessage(message);
      setMessage("");
      setDelay(0);
      setIsSending(false);
    }, delay * 1000);

    setTimerId(id);
  };

  const handleCancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-sm p-6 border rounded-lg shadow-sm bg-white space-y-4">
      <h2 className="text-center text-2xl font-bold text-gray-800">DM Delay</h2>
      <Textarea
        placeholder="Type Something..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        required={true}
      />
      <Input onChange={(e) => setDelay(Number(e.target.value))} value={delay} />
      {!isSending ? (
        <Button className="w-full cursor-pointer" onClick={handleSendWithDelay}>
          Send with Delay
        </Button>
      ) : (
        <Button
          className="w-full cursor-pointer"
          variant={"destructive"}
          onClick={handleCancel}>
          Cancel Sending...
        </Button>
      )}

      {displayMessage && (
        <div className="bg-green-100 border rounded p-3 text-green-700 font-semibold">
          <p>Message Sent Successfully 🥳:</p>
          <p>{displayMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MessageForm;
