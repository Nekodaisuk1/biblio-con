import React, { useEffect, useRef, useState } from 'react';
import Peer, { MeshRoom } from 'skyway-js';
import { SKYWAY_API_KEY, getUsername } from './firebaseConfig';

const VideoChat = ({ myId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [remoteUsername, setRemoteUsername] = useState('');

  // ランダムな文字列を生成する関数
  function generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  useEffect(() => {
    peerRef.current = new Peer({ key: SKYWAY_API_KEY });

    peerRef.current.on('open', () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        // ランダムなルーム名を生成
        const roomName = generateRandomString(15);
        const room = peerRef.current.joinRoom(roomName, {
          mode: 'mesh',
          stream: localStream
        });

        room.on('stream', stream => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
          // 送信者のユーザー名を取得
          getUsername(stream.peerId).then(name => {
            setRemoteUsername(name);
          });
        });
      });
    });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
      {remoteUsername && <p>相手: {remoteUsername}</p>}
    </div>
  );
};

export default VideoChat;
