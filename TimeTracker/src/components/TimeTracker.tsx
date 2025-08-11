import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  addData: (activity: string, hrs: number) => void;
};

const TimeTracker = ({ addData }: Props) => {
  const [activity, setActivity] = useState<string>("");
  const [hrs, setHrs] = useState<string>();

  function handleAddActivity() {
    if (!activity.trim()) {
      alert(`Type some Activity`);
      return;
    }
    if (!hrs) {
      alert(`Type Hours to ${activity}`);
      return;
    }
    addData(activity, Number(hrs));
    setActivity("");
    setHrs("");
  }

  return (
    <div className="border rounded-sm p-6 space-y-3">
      <Input
        placeholder="Activity (eg. Code)"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Hours (eg. 5)"
        value={hrs}
        onChange={(e) => setHrs(e.target.value)}
      />
      <Button onClick={handleAddActivity} className="w-full cursor-pointer">
        Add Activity
      </Button>
    </div>
  );
};

export default TimeTracker;
