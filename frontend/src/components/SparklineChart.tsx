import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 

const SparklineChart: React.FC<{ data: number[]; label: string }> = ({ data, label }) => {
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true },
      toolbar: { show: true }, 
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
      curve: 'smooth' as const, 
      width: 2, 
      colors: ['#008FFB'], 
    },
    xaxis: {
      categories: data.map((_, index) => index + 1), 
      labels: { show: false }, 
      tooltip: { enabled: false }, 
    },
    yaxis: {
      show: false, 
    },
    grid: {
      show: false, 
    },
  };

  const series = [{ name: label, data }];
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
