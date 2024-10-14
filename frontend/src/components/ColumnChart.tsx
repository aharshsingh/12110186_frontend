import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

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
        type: 'bar',
      },
      xaxis: {
        categories: data.map(d => d.country),
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: 'Visitors by Country',
        align: 'left',
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
    },
  };

  return <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />;
};

export default ColumnChart;
