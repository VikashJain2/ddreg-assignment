import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

const Charts = ({ priorityData, dayWiseCompletionData, formatDate }) => {
  const totalTasks = priorityData.totalTasks

  const pieChartData = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        data: [priorityData.highPriority, priorityData.mediumPriority, priorityData.lowPriority],
        backgroundColor: ['#FF5733', '#FFC107', '#4CAF50'],
        hoverBackgroundColor: ['#FF7043', '#FFD54F', '#66BB6A'],
      },
    ],
  };

  const lineChartData = {
    labels: dayWiseCompletionData.map((item) => formatDate(item.day)),
    datasets: [
      {
        label: 'Completion Percentage',
        data: dayWiseCompletionData.map((item) => item.completionPercentage),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
      {/* Pie Chart */}
      <div className="bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">Task Priority Distribution</h3>
        <div className="h-48 sm:h-64 flex items-center justify-center">
          <Pie
            data={pieChartData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: '#fff',
                  },
                },
              },
            }}
          />
        </div>
        <div className="mt-4 text-center text-gray-300">
          <span className="font-semibold">Total Tasks:</span> {totalTasks}
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700/50">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-200">Task Completion Over Time</h3>
        <div className="h-48 sm:h-64">
          <Line
            data={lineChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#4A5568',
                  },
                  ticks: {
                    color: '#fff',
                  },
                },
                x: {
                  grid: {
                    color: '#4A5568',
                  },
                  ticks: {
                    color: '#fff',
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const data = dayWiseCompletionData[context.dataIndex];
                      return `Created: ${data.totalTasks}, Completed: ${data.completedTasks}, Percentage: ${data.completionPercentage}%`;
                    },
                  },
                },
                legend: {
                  labels: {
                    color: '#fff',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;