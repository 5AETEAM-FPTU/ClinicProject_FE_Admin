import React from 'react';

interface StarIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const StarIcon: React.FC<StarIconProps> = ({
  width = 10,
  height = 10,
  fill = "#FF8058",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 8.03684L8.09 10L7.27 6.3L10 3.81053L6.405 3.48947L5 0L3.595 3.48947L0 3.81053L2.73 6.3L1.91 10L5 8.03684Z"
        fill={fill}
      />
    </svg>
  );
};

export default StarIcon;
