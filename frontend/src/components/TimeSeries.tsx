// src/components/TimeSeriesChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';  // Import ApexOptions for type safety

type TimeSeriesChartProps = {
  data: { date: string; visitors: number }[];
};

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const chartData: { series: { name: string; data: { x: string; y: number }[] }[]; options: ApexOptions } = {
    series: [
      {
        name: 'Visitors',
        data: data.map(d => ({ x: d.date, y: d.visitors })),
      },
    ],
    options: {
      chart: {
        type: 'line',
        stacked: false,
        height: 550,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,  // Automatically scale the Y-axis based on data
        },
        toolbar: {
          autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: 'Visitors Over Time',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(0); // Ensure no decimals in Y-axis values if not needed
          },
        },
        min: 0,  // Ensure the minimum Y-axis value is 0
        forceNiceScale: true,  // Enables a "nice" scale on the Y-axis
      },
      stroke: { 
        curve: 'smooth',
      },
    },
  };

  return <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />;
};

export default TimeSeriesChart;
