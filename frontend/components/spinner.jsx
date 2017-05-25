import React from 'react';
import MDSpinner from "react-md-spinner";

const Spinner = () => {
  return (
    <div className='loading-container'>
      <img
        className='loading-logo'
        src="http://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,h_100,w_100/v1495672697/slack_evh6h9.png"
      />
      <h1>Loading Splat...</h1>
      <MDSpinner size={60} />
    </div>
  );
};

export default Spinner;
