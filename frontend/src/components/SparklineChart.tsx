import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for type safety

const SparklineChart: React.FC<{ data: number[]; label: string }> = ({ data, label }) => {
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      toolbar: { show: true }, // Hide toolbar for sparklines
    },
    title: {
      text: label,
      align: 'left',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    stroke: {
      curve: 'smooth' as const, // Use 'as const' to ensure type safety
      width: 2, // Adjust stroke width
      colors: ['#008FFB'], // Customize stroke color
    },
    xaxis: {
      categories: data.map((_, index) => index + 1), // Generate category labels based on data index
      labels: { show: false }, // Hide x-axis labels for sparklines
      tooltip: { enabled: false }, // Disable x-axis tooltip
    },
    yaxis: {
      show: false, // Hide y-axis
    },
    grid: {
      show: false, // Hide gridlines
    },
  };

  const series = [{ name: label, data }];

  // Check if data is empty and render a message or the chart accordingly
  return (
    <div>
      {data.length > 0 ? (
        <Chart options={options} series={series} type="line" height={150} />
      ) : (
        <p>No data available for {label}</p>
      )}
    </div>
  );
};

export default SparklineChart;
