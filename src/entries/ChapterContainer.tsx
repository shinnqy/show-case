import React, { useCallback, useState } from 'react';
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
        height: '32vw',
        width: '30vw',
        maxHeight: 400,
        maxWidth: 550,
      }}
      onClick={handleDigIntoDetails}
    >
      <div
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
      >
        <RadarChart
          id={props.id}
          data={giiData[props.id]}
        />
      </div>
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
