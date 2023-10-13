import React from 'react';
import styled from 'styled-components';

const VideoElement = styled.video`
  width: 80%;
  height: 80%;
  object-fit: cover;
`;

const Username = styled.p`
  position: absolute;
  bottom: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  font-size: 16px;
`;

const DummyVideoWrapper = styled.div`
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        background-image: url('./assets/images/アセット 3@4x.png');
        background-size: cover;
        background-position: center;
`;

const DummyUser = ({ username }) => {
  return (
    <DummyVideoWrapper>
      <VideoElement autoPlay playsInline loop muted>
        <source src="./Asset/images/アセット 3@4x" type="img/png" />
        Your browser does not support the video tag.
      </VideoElement>
      <Username>{username}</Username>
    </DummyVideoWrapper>
  );
};

export default DummyUser;
