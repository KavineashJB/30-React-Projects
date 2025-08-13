import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [displayMessage, setDisplayMessage] = useState<string>();
  const [countDown, setCountDown] = useState<number>(delay);

  useEffect(() => {
    setCountDown(delay);
  }, [delay]);

  const handleSendWithDelay = () => {
    setIsSending(true);
    let runningCountDown = countDown;

    let countDownId = setInterval(() => {
      if (runningCountDown === 0) {
        clearInterval(countDownId);
        setDisplayMessage(message);
        setMessage("");
        setDelay(0);
        setIsSending(false);
      }

      runningCountDown--;

      setCountDown(runningCountDown);
    }, 1000);

    setTimerId(countDownId);
  };

  const handleCancel = () => {
    if (timerId) {
      setCountDown(delay);
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
      <div className="max-w-sm flex justify-between gap-1">
        <Input
          className="w-10/12 "
          onChange={(e) => setDelay(Number(e.target.value))}
          value={delay}
        />
        <Input
          className="w-2/12 text-center text-gray-400"
          value={countDown}
          readOnly
        />
      </div>

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
