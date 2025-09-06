import TimeTracker from "@/components/TimeTracker";
import { useState } from "react";
import TimeChart from "@/components/TimeChart";

type Props = {
  activity: string;
  hrs: number;
};

const Home = () => {
  const [data, setData] = useState<Props[]>([]);

  function handleAddActivity(activity: string, hrs: number, isUpdate: number) {
    // If the activity is not present in the data then we need to add it when isUpdate!==-1
    // otherwise update the data.hrs for the respective activity
    if (isUpdate === -1) setData([...data, { activity, hrs }]);
    else {
      const tempData = [...data];
      tempData[isUpdate] = { activity, hrs };
      setData(tempData);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-2">
        ⏰ Time Tracker
      </h2>
      <TimeTracker data={data} addData={handleAddActivity} />

      {/* Initially there is no data. So we need to display the proper message */}
      {data[0]?.activity && data[0]?.hrs ? (
        <TimeChart data={data} />
      ) : (
        <div className="text-center mt-3 text-lg text-gray-400 font-semibold">
          No Activity to Display
        </div>
      )}
    </div>
  );
};

export default Home;
