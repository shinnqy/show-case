import React, { useLayoutEffect, useMemo, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
// import 'react-medium-image-zoom/dist/styles.css';

const CustomZoomContent = ({
  buttonUnzoom, // default unzoom button
  modalState, // current state of the zoom modal: UNLOADED, LOADING, LOADED, UNLOADING
  img, // your image, prepped for zooming
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useLayoutEffect(() => {
    if (modalState === 'LOADED') {
      setIsLoaded(true);
    } else if (modalState === 'UNLOADING') {
      setIsLoaded(false);
    }
  }, [modalState]);

  const classCaption = isLoaded
    ? 'zoom-caption zoom-caption--loaded'
    : 'zoom-caption';

  const style = img?.props?.style;
  const content = useMemo(() => {
    switch (modalState) {
      case 'LOADED':
      case 'LOADING':
      case 'UNLOADING':
        return <div style={style}>sss</div>;
      case 'UNLOADED':
        return img;
      default:
        return null;
    }
  }, [modalState]);

  return (
    <>
      {/* {content} */}
      {img}
      {buttonUnzoom}
    </>
    // <>
    //   {buttonUnzoom}
    //   <figure>
    //     {img}
    //     <figcaption className={classCaption}>
    //       That Wanaka Tree, also known as the Wanaka Willow, is a willow tree
    //       located at the southern end of Lake Wānaka in the Otago region of New
    //       Zealand.
    //       <cite className="zoom-caption-cite">
    //         Wikipedia,{' '}
    //         <a
    //           className="zoom-caption-link"
    //           href="https://en.wikipedia.org/wiki/That_Wanaka_Tree"
    //         >
    //           That Wanaka Tree
    //         </a>
    //       </cite>
    //     </figcaption>
    //   </figure>
    // </>
  );
};

export const ZoomModal = React.memo(function ZoomModal() {
  return (
    <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            <div>Example text</div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );

  return (
    <Zoom ZoomContent={CustomZoomContent}>
      {/* <div
        aria-label="That Wanaka Tree, New Zealand by Laura Smetsers"
        role="img"
        style={{
          backgroundColor: '#fff',
          backgroundImage: `url("https://rpearce.github.io/react-medium-image-zoom/static/media/glenorchy-lagoon.272d443f.jpg")`,
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '0',
          paddingBottom: '56%',
          width: '100%',
        }}
      /> */}
      <div>ssss</div>
    </Zoom>
  );
});
