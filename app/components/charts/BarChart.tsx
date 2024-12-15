import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    values: number[];
  };
  title: string;
}

export function BarChart({ data, title }: BarChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Ventas",
        data: data.values,
        backgroundColor: "#d2c087",
        borderColor: "#a89a6c",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-primary-800 mb-6">{title}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
