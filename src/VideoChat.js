import React, { useEffect, useRef, useState } from 'react';
import Peer from 'skyway-js';
import { SKYWAY_API_KEY, getUsername } from './firebaseConfig';

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
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline className="video"></video>
      {remoteStreams.map((stream, index) => (
        <div key={index}>
          <video srcObject={stream} autoPlay playsInline className="video"></video>
          <p>相手: {remoteUsernames[index]} ({stream.peerId})</p>
        </div>
      ))}
    </div>
  );
};

export default VideoChat;