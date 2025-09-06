import { Pie } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

chartjs.register(ArcElement, Tooltip, Legend);

type Props = {
  data: { activity: string; hrs: number }[];
};

const TimeChart = ({ data }: Props) => {
  const [colors, setColors] = useState<string[]>([]);

  // If there is any change in the data (new activity added) then generate a random color for that activity
  useEffect(() => {
    const color: string = `#${Math.floor(Math.random() * 16777215).toString(
      16
    )}`;
    setColors([...colors, color]);
  }, [data]);

  const chartData = {
    labels: data.map(
      (d) => d.activity.at(0)?.toUpperCase() + d.activity.slice(1)
    ),
    datasets: [
      {
        label: "Hours",
        data: data.map((d) => d.hrs),
        backgroundColor: [...colors],
        borderWidth: 1,
      },
    ],
  };

  // key property used to reload the Pie if there is any change in the data
  return <Pie key={JSON.stringify(data)} data={chartData} />;
};

export default TimeChart;
