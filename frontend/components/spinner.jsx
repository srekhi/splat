import React from 'react';
import MDSpinner from "react-md-spinner";

const Spinner = () => {
  return (
    <div className='loading-container'>
      <img
        className='loading-logo'
        src="https://cloudinary.com/console/media_library#/dialog/image/upload/slack_zawidf"
      />
      <h1>Loading Splat...</h1>
      <MDSpinner size={60} />
    </div>
  );
};

export default Spinner;
