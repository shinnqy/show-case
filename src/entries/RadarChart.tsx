import React, { useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { indicators } from '../data/gii';

interface IOwnProps {
  id: string;
  data: number[];
}
export const RadarChart = React.memo(function RadarChart(props: IOwnProps) {
  const chartId = useMemo(() => `${props.id}-chard`, [props.id]);
  const option = useMemo(() => {
    const _o: EChartsOption = {
      title: {
        // text: 'Basic Radar Chart',
      },
      backgroundColor: '#444',
      legend: {
        data: ['Top 10', 'High income', props.id],
      },
      radar: {
        // shape: 'circle',
        indicator: indicators,
      },
      series: [
        {
          // name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [90, 90, 90, 90, 90, 90, 90],
              name: 'Top 10',
            },
            {
              value: [80, 80, 80, 80, 80, 80, 80],
              name: 'High income',
            },
            {
              value: props.data,
              name: props.id,
            },
          ],
        },
      ],
    };
    return _o;
  }, [props.id, props.data]);

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    const chart = echarts.init(chartDom, 'dark');
    option && chart.setOption(option);
  }, []);

  return (
    <div>
      <div
        id={chartId}
        style={{ height: 400, width: 550 }}
      ></div>
    </div>
  );
});
