import TimeTracker from "@/components/TimeTracker";
import { useEffect, useState } from "react";
import TimeChart from "@/components/TimeChart";

const Home = () => {
  const [data, setData] = useState<{ activity: string; hrs: number }[]>([]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  function handleAdd(activity: string, hrs: number) {
    setData([...data, { activity, hrs }]);
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-2">
        ⏰ Time Tracker
      </h2>
      <TimeTracker addData={handleAdd} />
      <TimeChart data={data} />
    </div>
  );
};

export default Home;
