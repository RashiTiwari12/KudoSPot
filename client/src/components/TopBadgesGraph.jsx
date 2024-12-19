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

// Register the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopBadgesGraph = ({ topBadges }) => {
  // Prepare data for the bar chart
  const data = {
    labels: topBadges.map((item) => item.badge), // Badge names as labels
    datasets: [
      {
        label: "Badge Count",
        data: topBadges.map((item) => item.count), // Badge counts as data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Bar border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Top 4 Badges",
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Count: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Badges",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-1/2">
      <h2>Top 4 Badges</h2>
      {topBadges.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No badges found.</p>
      )}
    </div>
  );
};

export default TopBadgesGraph;
