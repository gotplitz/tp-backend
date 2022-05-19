import * as React from 'react';

function SpinnerSVG(props) {
  return (
    <svg
      style={{
        margin: 'auto',
        background: '#f1f2f3',
      }}
      width={200}
      height={200}
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
      display='block'
      {...props}
    >
      <circle
        cx={50}
        cy={50}
        r={32}
        strokeWidth={8}
        stroke='#1933fd'
        strokeDasharray='50.26548245743669 50.26548245743669'
        fill='none'
        strokeLinecap='round'
        transform='rotate(251.97 50 50)'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          dur='1s'
          repeatCount='indefinite'
          keyTimes='0;1'
          values='0 50 50;360 50 50'
        />
      </circle>
      <circle
        cx={50}
        cy={50}
        r={23}
        strokeWidth={8}
        stroke='#a7d4ec'
        strokeDasharray='36.12831551628262 36.12831551628262'
        strokeDashoffset={36.128}
        fill='none'
        strokeLinecap='round'
        transform='rotate(-251.97 50 50)'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          dur='1s'
          repeatCount='indefinite'
          keyTimes='0;1'
          values='0 50 50;-360 50 50'
        />
      </circle>
    </svg>
  );
}

export default SpinnerSVG;
