// src/components/ColumnChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';  // Importing ApexOptions for type safety

type ColumnChartProps = {
  data: { country: string; visitors: number }[];
};

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const chartData: { series: { name: string; data: number[] }[]; options: ApexOptions } = {
    series: [
      {
        name: 'Visitors',
        data: data.map(d => d.visitors),
      },
    ],
    options: {
      chart: {
        type: 'bar',  // This is now strictly typed as 'bar', which ApexOptions expects.
      },
      xaxis: {
        categories: data.map(d => d.country),  // List of country names on X-axis
      },
      dataLabels: {
        enabled: true,  // Show data labels on the bars
      },
      title: {
        text: 'Visitors by Country',  // Title of the chart
        align: 'left',  // Align the title in the center
        style: {
          fontSize: '20px',  // Customize the font size if needed
          fontWeight: 'bold',  // Make it bold
        },
      },
    },
  };

  return <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />;
};

export default ColumnChart;
