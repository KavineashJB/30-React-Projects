import { Pie } from "react-chartjs-2";
import { Chart as chartjs, ArcElement, Tooltip, Legend } from "chart.js";

chartjs.register(ArcElement, Tooltip, Legend);

type Props = {
  data: { activity: string; hrs: number }[];
};

const TimeChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((d) => d.activity),
    datasets: [
      {
        label: "Hours",
        data: data.map((d) => d.hrs),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#34D399",
          "#A7BBFA",
          "#A788FA",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default TimeChart;
