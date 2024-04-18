import React from 'react';

const Food = ({ food }) => {
  const foodStyle = {
    left: `${food[0] * 20}px`,
    top: `${food[1] * 20}px`,
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: 'red',
  };

  return <div className="food" style={foodStyle}></div>;
};

export default Food;