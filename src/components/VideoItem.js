import React from 'react';

const VideoItem = ({ video, onVideoSelect }) => {
  const imgUrl = video.snippet.thumbnails.default.url;

  return (
    <li
      className='list-group-item'
      onClick={() => {
        onVideoSelect(video);
      }}
    >
      <div className='video-list media'>
        <div className='media-left'>
          <img className='media-object' alt='Video Thumbnail' src={imgUrl} />
        </div>
        <div className='media-body pl-2'>
          <div className='media-heading'>{video.snippet.title}</div>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
