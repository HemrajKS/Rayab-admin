import React from 'react';
import ReactImageGallery from 'react-image-gallery';

const ImageGallery = ({ images }) => {
  return (
    <div>
      <ReactImageGallery
        items={images}
        lazyLoad
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
      />
    </div>
  );
};

export default ImageGallery;
