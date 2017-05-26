import React from 'react';
const VideoBackground = () => {
  return (
    <div>
       <video id="background-video" loop autoPlay muted>
      <source src={'https://res.cloudinary.com/dbbzpmyvc/video/upload/v1494882565/background_video_mrwna2.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
