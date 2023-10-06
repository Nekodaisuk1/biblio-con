import React from 'react';

const DummyUserPanels = ({ numUsers }) => {
  return (
    <div>
      {Array.from({ length: numUsers }).map((_, index) => (
        <div key={index} style={{ width: '200px', height: '150px', backgroundColor: getRandomColor(), margin: '10px' }}>
          Dummy User {index + 1}
        </div>
      ))}
    </div>
  );
};

const getRandomColor = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default DummyUserPanels;