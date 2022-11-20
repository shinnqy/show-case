import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pivot, PivotItem, mergeStyles } from '@fluentui/react';
import cx from 'classnames';
import { MapBoxStoryTelling } from '../components/MapBox.util';
import { COUNTRY_KEY, COUNTRY_ZOOM_IN, ISO_COUNTRY_MAP } from '../constants';
import { giiData } from '../data/gii';
import { RadarChart } from './RadarChart';
import { RankingChart } from './RankingChart';
import { canvasAnimation, CanvasBackground } from '../canvas/animation';
import { alignments, config, IChapter } from '../config';
import { RaceChart } from './RaceChart';

const classNames = {
  canvas: mergeStyles({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
};

interface IOwnProps {
  id: COUNTRY_KEY;
  chapter: IChapter;
  index: number;
}
export const ChapterContainer = React.memo(function ChapterContainer(
  props: IOwnProps
) {
  const { chapter: c, index: idx } = props;
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const containerId = useMemo(() => `${props.id}-container`, [props.id]);
  const bgCanvasId = useMemo(() => `${props.id}-bg-canvas`, [props.id]);

  useEffect(() => {
    // new CanvasBackground(`${c.id}-chapter`, bgCanvasId);
    canvasAnimation(`${c.id}-chapter`, bgCanvasId);
  }, [props.chapter.id, bgCanvasId]);

  const handleDigIntoDetails = useCallback(() => {
    setShowDetail(!showDetail);
    MapBoxStoryTelling.instance().hightlightCountry(
      ISO_COUNTRY_MAP[props.id],
      COUNTRY_ZOOM_IN[props.id]
    );
  }, [showDetail, props.id]);

  return (
    <div
      id={c.id}
      key={c.id}
      className={cx('step', {
        active: idx === 0,
        [alignments[c.alignment]]: !!c.alignment,
        centered: !c.alignment,
        hidden: c.hidden,
      })}
    >
      <div
        id={`${c.id}-chapter`}
        className={config.theme}
        style={{ position: 'relative' }}
      >
        <canvas
          id={bgCanvasId}
          className={classNames.canvas}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        ></canvas>
        <h3>{c.title}</h3>
        {/* <img src={c?.immage} alt="" /> */}
        <div
          id={containerId}
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
                {/* <RankingChart id={props.id} /> */}
                <RaceChart id={props.id} />
              </div>
            </PivotItem>
          </Pivot>
        </div>
      </div>
    </div>
  );
});
