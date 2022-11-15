import React, { useCallback, useState } from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { MapBoxStoryTelling } from '../components/MapBox.util';
import { COUNTRY_KEY, COUNTRY_ZOOM_IN, ISO_COUNTRY_MAP } from '../constants';
import { giiData } from '../data/gii';
import { RadarChart } from './RadarChart';
import { RankingChart } from './RankingChart';

interface IOwnProps {
  id: COUNTRY_KEY;
}
export const ChapterContainer = React.memo(function ChapterContainer(
  props: IOwnProps
) {
  const [showDetail, setShowDetail] = useState<boolean>(false);

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
        height: '55vh',
        width: '30vw',
        // maxHeight: 400,
        maxWidth: 550,
      }}
      onClick={handleDigIntoDetails}
    >
      <Pivot>
        <PivotItem
          headerText="创新图表"
          key="1"
        >
          <div
            style={{
              // opacity: showDetail ? 0 : 1,
              transition: 'opacity 1s',
              position: 'absolute',
              height: '32vw',
              width: '30vw',
              maxHeight: 400,
              maxWidth: 550,
              cursor: 'pointer',
            }}
          >
            <RadarChart
              id={props.id}
              data={giiData[props.id]}
            />
          </div>
        </PivotItem>
        <PivotItem
          headerText="创新指数排名"
          key="2"
        >
          <div
            style={{
              // opacity: showDetail ? 1 : 0,
              transition: 'opacity 1s',
              position: 'absolute',
              height: '32vw',
              width: '30vw',
              maxHeight: 400,
              maxWidth: 550,
              cursor: 'pointer',
            }}
          >
            <RankingChart id={props.id} />
          </div>
        </PivotItem>
      </Pivot>
    </div>
  );
});
