// src/components/TimeSeriesChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';  

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
          autoScaleYaxis: true,  
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
            return value.toFixed(0); 
          },
        },
        min: 0,
        forceNiceScale: true,  
      },
      stroke: { 
        curve: 'smooth',
      },
    },
  };

  return <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />;
};

export default TimeSeriesChart;
