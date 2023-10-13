import React, { useEffect, useRef, useState } from 'react';
import Peer from 'skyway-js';
import { SKYWAY_API_KEY, getUsername } from './firebaseConfig';
import styled from 'styled-components';
import DummyUser from './DummyUser';

const VideoContainer = styled.div`
  background-color: #f0f1e0;
  display: grid;
  grid-template-columns: repeat(2, 10fr);
  grid-template-rows: repeat(2, 10fr);
  height: 1q0vh;
  width: 90vw;
  align-items: center;  /* 垂直方向に中央揃え */
  justify-content: center;  /* 水平方向に中央揃え */
  grid-gap: 0;
  position: fixed;  // 追加
  top: 10;  // 追加
  left: 0;  // 追加
  z-index 0;
`;

const dummyUsernames = ["Dummy 1", "Dummy 2", "Dummy 3"];

const VideoElement = styled.video`
  width: 85;
  height: 70%;
  object-fit: cover;
  margin-bottom: 20%;
`;

const Username = styled.p`
  position: absolute;
  bottom: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  font-size: 16px;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  display: flex;  // 追加
  align-items: flex-end;  // 追加
  justify-content: flex-end;  // 追加
`;

const VideoChat = ({ myId, roomId }) => {
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const peerRef = useRef(null);
  const [remoteUsernames, setRemoteUsernames] = useState([]);

  useEffect(() => {
    const peerId = `${myId}-${Date.now()}`;
    console.log("Generated PeerId:", peerId);
  
    const peer = new Peer(peerId, { key: SKYWAY_API_KEY });
  
    if (!peer) {
      console.error("Failed to create Peer object. Check your API key.");
      return;
    }
  
    peerRef.current = peer;
  
    const onOpen = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
  
        const room = peer.joinRoom(roomId, {
          mode: 'sfu',
          stream: localStream
        });
  
        room.on('stream', stream => {
          setRemoteStreams(prev => [...prev, stream]);
          getUsername(stream.peerId)
            .then(name => {
              setRemoteUsernames(prev => [...prev, { peerId: stream.peerId, name }]);
            })
            .catch(error => {
              console.error("Error getting username:", error);
              setRemoteUsernames(prev => [...prev, { peerId: stream.peerId, name: "Unknown User" }]);
            });
        });
      }).catch(error => {
        console.error("Error accessing media devices:", error);
      });
    };
  
    const onError = (err) => {
      console.error(err);
      alert(`An error occurred: ${err.message}`);
    };
  
    peer.on('open', onOpen);
    peer.on('error', onError);
  
    return () => {
      peer.off('open', onOpen);
      peer.off('error', onError);
      peer.destroy();
      peerRef.current = null;
    };
  }, [myId, roomId]);
  

  return (
    <VideoContainer>
      <VideoWrapper>
        <VideoElement ref={localVideoRef} autoPlay muted playsInline />
        <Username>Your Username</Username>
      </VideoWrapper>
      {remoteStreams.map((stream, index) => (
        <VideoWrapper key={index}>
          <VideoElement srcObject={stream} autoPlay playsInline />
          <Username>
            {remoteUsernames[index] ? remoteUsernames[index].name : 'Loading...'} ({stream.peerId})
          </Username>
        </VideoWrapper>
      ))}
      {dummyUsernames.map((name, index) => (
        <DummyUser key={index} username={name} />
      ))}
    </VideoContainer>
  );
};

export default VideoChat;
