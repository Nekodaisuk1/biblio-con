import React from "react";
import styled from "styled-components";
import VideoComponent from "./VideoComponent";

function VideoChatUI({ localStream, remoteStreams }) {
  return (
    <Container>
      <VideoComponent stream={localStream} style={videoStyle} />
      {remoteStreams.map((stream, index) => (
        <VideoComponent key={index} stream={stream} style={videoStyle} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  background-color: #f0f1e0;
`;

const videoStyle = {
  flex: "1 1 50%",
  objectFit: "cover",
};

export default VideoChatUI;
