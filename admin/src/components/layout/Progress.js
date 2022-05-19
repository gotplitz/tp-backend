import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
  return (
    <div className='slider slider-horizontal'>
      <div className='slider-track'>
        <div
          className='slider-track-low'
          style={{ left: 0, width: '0%' }}
        ></div>
        <div
          className='slider-selection'
          style={{ left: 0, width: `${percentage}%` }}
        ></div>
        <div
          className='slider-track-high'
          style={{ right: 0, width: 'auto' }}
        ></div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
