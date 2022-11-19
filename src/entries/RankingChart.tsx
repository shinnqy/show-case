import React, { useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import { COUNTRIES, COUNTRY_KEY } from '../constants';
import { EChartsOption } from 'echarts';
import { rankingSeries } from '../data/ranking';

interface IOwnProps {
  id: COUNTRY_KEY;
  // data: number[];
}
export const RankingChart = React.memo(function RankingChart(props: IOwnProps) {
  const chartId = useMemo(() => `${props.id}-ranking-chard`, [props.id]);
  const option = useMemo(() => {
    const series = rankingSeries.filter((s) => {
      const currentName = COUNTRIES[props.id].label;
      return currentName !== s.name;
    });

    const _o: EChartsOption = {
      backgroundColor: '#444',
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [
          '智利',
          '阿尔及利亚',
          '芬兰',
          '澳大利亚',
          '印度',
          '美国',
          '中国',
        ],
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
        data: ['2019', '2020', '2021', '2022'],
      },
      yAxis: {
        type: 'value',
        inverse: true,
      },
      series: series as any,
    };
    return _o;
  }, [props.id]);

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) return;
    const chart = echarts.init(chartDom, 'dark');
    option && chart.setOption(option);

    setTimeout(() => {
      option.series = rankingSeries as any;
      chart.setOption(option);
    }, 1000);
  }, []);

  return (
    <div
      id={chartId}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
});
