import React from 'react';

const DummyUserPanels = ({ dummyUsers }) => {
  return (
    <div>
      {dummyUsers.map((user, index) => (
        <div key={index} style={{ width: '200px', height: '150px', backgroundColor: getRandomColor(), margin: '10px', padding: '10px' }}>
          <p>Name: {user.userId}</p>
          <p>Interested Genre: {user.interestedGenreLarge}, {user.interestedGenreSmall}</p>
          <p>Introducing Work Genre: {user.introducingWorkGenreLarge}, {user.introducingWorkGenreSmall}</p>
          <p>Disliked Genre: {user.dislikedGenreLarge}, {user.dislikedGenreSmall}</p>
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