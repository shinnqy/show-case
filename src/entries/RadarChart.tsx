import React, { useEffect, useMemo, useCallback, useState } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { indicators } from '../data/gii';
import { COUNTRY_KEY } from '../constants';

interface IOwnProps {
  id: COUNTRY_KEY;
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
              value: [80, 50, 55, 56, 56, 57, 57],
              name: 'Top 10',
            },
            {
              value: [74, 37, 38, 46, 44, 58, 48],
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
