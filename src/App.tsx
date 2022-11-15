import React, { useRef } from 'react';
import { ThemeProvider } from '@fluentui/react';
import cx from 'classnames';
import { config } from './config';
import { MapBox } from './components/MapBox';
import { ChapterContainer } from './entries/ChapterContainer';
import { darkTheme } from './theme';

const alignments = {
  left: 'lefty',
  center: 'centered',
  right: 'righty',
  full: 'fully',
};

export const App = React.memo(function App() {
  return (
    <>
      <MapBox />
      <div id="story">
        <div
          id="header"
          className={config.theme}
        >
          <h1>{config.title}</h1>
          {config.subtitle && <h2>{config.subtitle}</h2>}
          <p>{config.byline}</p>
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
