import React from 'react';
import ReactImageGallery from 'react-image-gallery';

const ImageGallery = () => {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
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
