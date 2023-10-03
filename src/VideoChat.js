import React, { useEffect, useRef, useState } from 'react';
import Peer from 'skyway-js';
import { SKYWAY_API_KEY, getUsername } from './firebaseConfig';

const VideoChat = ({ myId, remoteId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [remoteUsername, setRemoteUsername] = useState('');

  useEffect(() => {
    const peerId = `${myId}-${Date.now()}`;
    console.log("Generated PeerId:", peerId);

    peerRef.current = new Peer(peerId, { key: SKYWAY_API_KEY });

    peerRef.current.on('open', () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        const room = peerRef.current.joinRoom(remoteId, {
          mode: 'sfu',
          stream: localStream
        });

        room.on('stream', stream => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }

          // Get and set the remote username
          getUsername(stream.peerId).then(name => {
            setRemoteUsername(name);
          });
        });
      });
    });

    peerRef.current.on('error', (err) => {
      console.error(err);
      alert(`An error occurred: ${err.message}`);
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [myId, remoteId]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
      {remoteUsername && <p>相手: {remoteUsername} ({remoteId})</p>}
    </div>
  );
};

export default VideoChat;