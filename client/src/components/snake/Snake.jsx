import React from 'react';

const Snake = ({ snake }) => {
  const segmentStyle = (segment) => ({
    left: `${segment[0] * 20}px`,
    top: `${segment[1] * 20}px`,
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'green',
    borderRadius: '4px',
  });

  return (
    <div>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={segmentStyle(segment)}
        ></div>
      ))}
    </div>
  );
};

export default Snake;