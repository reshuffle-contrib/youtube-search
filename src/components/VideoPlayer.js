import React from 'react';

const VideoPlayer = ({ video, apiMissingErr }) => {
  if (!video) {
    return (
      <div>
        {!apiMissingErr && !video && (
          <div className=' d-flex justify-content-center align-items-center'>
            Loading video player...
          </div>
        )}
        {apiMissingErr && (
          <div
            className=' d-flex justify-content-center align-items-center'
            style={{ color: 'red' }}
          >
            Enter a valid Youtube API key in .env
          </div>
        )}
      </div>
    );
  }
  const videoId = video.id.videoId;
  const url = `https://youtube.com/embed/${videoId}`;

  return (
    <div className='video-detail'>
      <div className='embed-responsive embed-responsive-16by9'>
        <iframe
          className='embed-responsive-item'
          title='videoPlayer'
          src={url}
        ></iframe>
      </div>
      <div className='details'>
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  );
};

export default VideoPlayer;
