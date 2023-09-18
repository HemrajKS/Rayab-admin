import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({ url }) => {
  return (
    <div className="h-[408px] items-center flex justify-center">
      {url ? (
        <ReactPlayer
          url={url}
          playing
          width={'100%'}
          height={'100%'}
          controls
        />
      ) : (
        <div className="text-[26px] text-[#e47e52]">No Video Added..!</div>
      )}
    </div>
  );
};

export default Video;
