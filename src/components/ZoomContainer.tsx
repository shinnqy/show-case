import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export const ZoomContainer = React.memo(function ZoomContainer(props) {
  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          {/* <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div> */}
          <TransformComponent>{props.children};</TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
});
