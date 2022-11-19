import React, { useEffect, useMemo } from 'react';
import * as echarts from 'echarts';
import { COUNTRIES, COUNTRY_KEY } from '../constants';
import { EChartsOption } from 'echarts';
import { countryColors, raceData } from '../data/race';

const years = ['Year', 2018, 2019, 2020, 2021, 2022];
const startIndex = 1;
const startYear = years[startIndex];
const dimension = 0;
const updateFrequency = 2000;

interface IOwnProps {
  id: COUNTRY_KEY;
  // data: number[];
}
export const RaceChart = React.memo(function RaceChart(props: IOwnProps) {
  const chartId = useMemo(() => `${props.id}-race-chard`, [props.id]);
  const option = useMemo(() => {
    const _o: EChartsOption = {
      backgroundColor: '#444',
      grid: {
        top: 10,
        bottom: 30,
        left: 70,
        right: 80,
      },
      xAxis: {
        max: 'dataMax',
        axisLabel: {
          formatter: function (n) {
            return Math.round(n) + '';
          },
        },
      },
      dataset: {
        source: raceData.slice(1).filter(function (d) {
          return d[4] === startYear;
        }),
      },
      yAxis: {
        type: 'category',
        inverse: true,
        max: Object.keys(COUNTRIES).length - 1,
        axisLabel: {
          show: true,
          fontSize: 14,
          formatter: function (value) {
            console.log({ value });
            // return value + '{flag|' + getFlag(value) + '}';
            return value;
          },
          rich: {
            flag: {
              fontSize: 25,
              padding: 5,
            },
          },
        },
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: function (param) {
              const countryKey = param.value[3];
              if (countryKey === props.id) {
                return '#b22234';
              }
              // return countryColors[param.value[3]] || '#5470c6';
              return '#5470c6';
            },
          },
          encode: {
            x: dimension,
            y: 3,
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace',
          },
        },
      ],
      // Disable init animation.
      animationDuration: 0,
      animationDurationUpdate: updateFrequency,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      graphic: {
        elements: [
          {
            type: 'text',
            right: 10,
            bottom: 60,
            style: {
              // text: startYear + '',
              text: years[startIndex + 1] + '',
              font: 'bolder 80px monospace',
              fill: 'rgba(163, 162, 178, 0.45)',
            },
            z: 100,
          },
        ],
      },
    };
    return _o;
  }, [props.id]);

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) return;
    const chart = echarts.init(chartDom, 'dark');
    option && chart.setOption(option);

    for (let i = startIndex; i < years.length - 1; ++i) {
      (function (i) {
        setTimeout(function () {
          updateYear(years[i + 1]);
        }, (i - startIndex) * updateFrequency);
      })(i);
      // setTimeout(function () {
      //   updateYear(years[i + 1]);
      // }, (i - startIndex) * updateFrequency);
    }
    function updateYear(year) {
      let source = raceData.slice(1).filter(function (d) {
        return d[4] === year;
      });
      option.series[0].data = source;
      (option.graphic as any).elements[0].style.text = year;
      chart.setOption(option);
    }
  }, []);

  return (
    <div
      id={chartId}
      style={{ height: '100%', width: '100%' }}
    ></div>
  );
});
