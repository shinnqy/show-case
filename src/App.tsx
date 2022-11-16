import React, { useEffect, useRef } from 'react';
import { ThemeProvider, mergeStyles } from '@fluentui/react';
import cx from 'classnames';
import { config } from './config';
import { MapBox } from './components/MapBox';
import { ChapterContainer } from './entries/ChapterContainer';
import { darkTheme } from './theme';
import { canvasAnimation } from './canvas/animation';

const alignments = {
  left: 'lefty',
  center: 'centered',
  right: 'righty',
  full: 'fully',
};

const classNames = {
  canvas: mergeStyles({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
};

const HEADER_ID = 'header';
const HEADER_CANVAS_ID = 'header-canvas';

export const App = React.memo(function App() {
  useEffect(() => {
    canvasAnimation(HEADER_ID, HEADER_CANVAS_ID);
  }, []);

  return (
    <>
      <MapBox />
      <div id="story">
        <div
          id={HEADER_ID}
          className={config.theme}
          style={{ position: 'relative' }}
        >
          <h1>{config.title}</h1>
          {config.subtitle && <h2>{config.subtitle}</h2>}
          <p>{config.byline}</p>
          <canvas
            id={HEADER_CANVAS_ID}
            className={classNames.canvas}
          ></canvas>
        </div>
        <div id="features">
          {config.chapters.map((c, idx) => {
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
                >
                  <h3>{c.title}</h3>
                  {/* <img src={c?.immage} alt="" /> */}
                  <div>
                    <ThemeProvider theme={darkTheme}>
                      <ChapterContainer id={c.id} />
                    </ThemeProvider>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {config.footer && (
          <div
            id="footer"
            className={config.theme}
          >
            <p>{config.footer}</p>
          </div>
        )}
      </div>
    </>
  );
});
