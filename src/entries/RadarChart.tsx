import React, { useEffect, useMemo, useCallback, useState } from 'react';
// import { IconButton, mergeStyles, Modal } from '@fluentui/react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { indicators } from '../data/gii';
import {
  COUNTRIES,
  COUNTRY_KEY,
  COUNTRY_ZOOM_IN,
  ISO_COUNTRY_MAP,
} from '../constants';
// import { DetailContent } from './DetailContent';
// import { ZoomModal } from '../components/ZoomModal';
import { MapBoxStoryTelling } from '../components/MapBox.util';
import { RankingChart } from './RankingChart';

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

  const [showDetail, setShowDetail] = useState<boolean>(false);

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    if (!chartDom) return;
    const chart = echarts.init(chartDom, 'dark');
    option && chart.setOption(option);
  }, []);

  const handleDigIntoDetails = useCallback(() => {
    setShowDetail(!showDetail);
    MapBoxStoryTelling.instance().hightlightCountry(
      ISO_COUNTRY_MAP[props.id],
      COUNTRY_ZOOM_IN[props.id]
    );
  }, [showDetail, props.id]);

  return (
    <div
      style={{
        position: 'relative',
        height: '32vw',
        width: '30vw',
        maxHeight: 400,
        maxWidth: 550,
      }}
      onClick={handleDigIntoDetails}
    >
      <div
        id={chartId}
        className="echarts-container"
        style={{
          opacity: showDetail ? 0 : 1,
          transition: 'opacity 1s',
          position: 'absolute',
          height: '32vw',
          width: '30vw',
          maxHeight: 400,
          maxWidth: 550,
          cursor: 'pointer',
        }}
      ></div>
      <div
        style={{
          opacity: showDetail ? 1 : 0,
          transition: 'opacity 1s',
          position: 'absolute',
          height: '32vw',
          width: '30vw',
          maxHeight: 400,
          maxWidth: 550,
          cursor: 'pointer',
        }}
      >
        {showDetail && <RankingChart id={props.id} />}
      </div>
    </div>
  );
});
