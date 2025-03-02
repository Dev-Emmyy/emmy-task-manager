// components/TaskProgress.tsx
"use client";
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Progress {
  todo: number;
  inProgress: number;
  done: number;
}

const TaskProgress = ({ progress }: { progress: Progress }) => {
  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [progress.todo, progress.inProgress, progress.done],
        backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Task Progress Overview",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TaskProgress;