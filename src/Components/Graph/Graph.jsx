'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const Graph = ({ title, timeSeriesData }) => {
  const chartOptions = {
    xAxis: {
      type: 'time',
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        data:
          timeSeriesData &&
          timeSeriesData.map((point) => [
            new Date(point.date).toISOString(),
            point.count,
          ]),
      },
    ],
  };
  return (
    <div className="bg-white flex flex-col w-full max-w-[48%] min-w-[520px] p-[16px] rounded-[14px] shadow-md gap-2">
      <div className="text-bold text-[20px] ">{title}</div>
      <ReactECharts
        option={chartOptions}
        echarts={echarts}
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default Graph;
