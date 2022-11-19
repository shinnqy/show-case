import React, { useEffect, useRef } from 'react';
import { ThemeProvider, mergeStyles } from '@fluentui/react';
import { config } from './config';
import { MapBox } from './components/MapBox';
import { ChapterContainer } from './entries/ChapterContainer';
import { darkTheme } from './theme';
import { canvasAnimation, CanvasBackground } from './canvas/animation';

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
    // new CanvasBackground(HEADER_ID, HEADER_CANVAS_ID);
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
          {/* {config.subtitle && <h2>{config.subtitle}</h2>} */}
          <h2 style={{ textAlign: 'left' }}>
            <div>
              全球创新地图是动态捕捉全球创新发展趋势的三维实时观察基站，并实时更新和帮助用户跟踪全球的创新进展：包括全球独角兽估值动态、最新的领域论文、最新的科技类投资、最新实验室的动态等。
            </div>
            {/* <ul>
              <li>Institutions</li>
              <li>Creative outputs</li>
              <li>Knowledge amd technology outputs</li>
              <li>Business sophistication</li>
              <li>Market sophistication</li>
              <li>Infrastructure</li>
              <li>Human capital and research</li>
            </ul>
            <div>七个维度来评价全球各国创新发展。</div> */}
          </h2>
          <p>{config.byline}</p>
          <canvas
            id={HEADER_CANVAS_ID}
            className={classNames.canvas}
          ></canvas>
        </div>
        <div id="features">
          {config.chapters.map((c, idx) => {
            return (
              <ThemeProvider
                theme={darkTheme}
                key={idx}
              >
                <ChapterContainer
                  id={c.id}
                  chapter={c}
                  index={idx}
                />
              </ThemeProvider>
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
