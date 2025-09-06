import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  data: { activity: string; hrs: number }[];
  addData: (activity: string, hrs: number, isUpdate: number) => void;
};

const TimeTracker = ({ data, addData }: Props) => {
  const [activity, setActivity] = useState<string>("");
  const [hrs, setHrs] = useState<string>();
  const [totalHrs, setTotalHrs] = useState<number>(0); // not to exceed 24hrs

  function handleAddActivity() {
    if (!activity.trim()) {
      alert(`Type some Activity`);
      return;
    }
    if (!hrs) {
      alert(`Type Hours to ${activity}`);
      return;
    }

    const act: number = data.findIndex(
      (act) => act.activity === activity.toLowerCase()
    );

    // activity not in the data then add

    if (act === -1) {
      if (totalHrs + Number(hrs) > 24) {
        alert(`You Exceed 24 Hrs😲, Time left ${24 - totalHrs} Hrs`);
        return;
      }
      addData(activity.toLowerCase(), Number(hrs), -1);
      setTotalHrs((prev) => prev + Number(hrs));
    }

    // if activity already present in the data ask user that they need to update??
    else {
      let choice: boolean = confirm(
        "Activity already Added!\nDo you want to update the time?"
      );

      // If yes then update the corresponding data.hrs and also update the totalHrs
      if (choice) {
        // check after remove the respective activity's hrs and add the new hr then check totalHrs exceed 24hrs
        let value: number = totalHrs - data[act].hrs + Number(hrs);

        if (value > 24) {
          alert(`You Exceed 24 Hrs😲, Time left ${24 - totalHrs} Hrs`);
          setActivity("");
          setHrs("");
          return;
        }
        setTotalHrs((prev) => prev - data[act].hrs + Number(hrs));
        addData(activity, Number(hrs), act);
      }
    }
    setActivity("");
    setHrs("");
  }

  return (
    <div className="max-w-sm border rounded-sm p-6 space-y-3">
      <Input
        placeholder="Activity (eg. Code)"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <div className="flex justify-between gap-5">
        <Input
          className="w-9/12"
          type="number"
          placeholder="Hours (eg. 5)"
          value={hrs}
          onChange={(e) => setHrs(e.target.value)}
        />
        <Input
          className="w-3/12 text-center font-semibold text-gray-500"
          value={totalHrs}
          onChange={(e) => setTotalHrs(Number(e.target.value))}
          type="number"
          readOnly
        />
      </div>
      <Button onClick={handleAddActivity} className="w-full cursor-pointer">
        Add Activity
      </Button>
    </div>
  );
};

export default TimeTracker;
