'use client';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const Graph = ({ title, timeSeriesData, xLabel, yLabel }) => {
  const chartOptions = {
    xAxis: {
      type: 'time',
      name: xLabel,
    },
    yAxis: {
      type: 'value',
      name: yLabel,
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const xAxisValue = params[0].axisValue;
        const date = new Date(xAxisValue);
        const formattedDate = date.toLocaleDateString();
        const seriesData = params[0].data[1];
        return `${formattedDate}: ${seriesData}`;
      },
    },
    series: [
      {
        type: 'line',
        data:
          timeSeriesData &&
          timeSeriesData.map((point) => [
            new Date(point.date).toISOString(),
            point.count,
          ]),
        lineStyle: {
          color: '#e47e52',
        },
        itemStyle: {
          color: '#0b1c48',
        },
      },
    ],
    axisPointer: {
      lineStyle: {
        color: '#0b1c48ca',
        width: 1,
      },
    },
  };
  return (
    <div className="bg-white flex flex-col w-full max-w-[calc(50%-10px)] min-w-[520px] p-[16px] rounded-[14px] shadow-md gap-2">
      <div className="text-bold text-[18px] pt-[8px] pl-[28px]">{title}</div>
      <ReactECharts
        option={chartOptions}
        echarts={echarts}
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default Graph;
