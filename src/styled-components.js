import styled from 'styled-components';

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 100vh;
  width: 100vw;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
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
