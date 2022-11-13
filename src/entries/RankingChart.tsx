import React, { useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import { COUNTRY_KEY } from '../constants';
import { EChartsOption } from 'echarts';

interface IOwnProps {
  id: COUNTRY_KEY;
  // data: number[];
}
export const RankingChart = React.memo(function RankingChart(props: IOwnProps) {
  const chartId = useMemo(() => `${props.id}-ranking-chard`, [props.id]);
  const option = useMemo(() => {
    const _o: EChartsOption = {
      backgroundColor: '#444',
      legend: {
        data: [props.id],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    return _o;
  }, [props.id]);

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) return;
    const chart = echarts.init(chartDom, 'dark');
    option && chart.setOption(option);
  }, []);

  return (
    <div
      id={chartId}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
});
