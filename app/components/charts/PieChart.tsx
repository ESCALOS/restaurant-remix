import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title: string;
}

export function PieChart({ data, title }: PieChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["#d2c087", "#a89a6c", "#7e7351"],
        borderColor: ["#f6f2e7", "#f6f2e7", "#f6f2e7"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-primary-800 mb-4">{title}</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
}
