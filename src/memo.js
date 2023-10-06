import React, { useState, useEffect } from 'react';
import VideoChat from './VideoChat';
import {
  googleLogin,
  logout,
  saveMatchingSettings,
  saveUserProfile,
  auth,
  getUsername,
  addWaitingUser,
  removeWaitingUser,
  getWaitingUsers,
  startVideoCall
} from './firebaseConfig';

function App() {
  const [myId, setMyId] = useState(null);
  const [roomId, setRoomId] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMatchingStarted, setIsMatchingStarted] = useState(false);
  const [isMatchingWaiting, setIsMatchingWaiting] = useState(false);
  const [matchingSettings, setMatchingSettings] = useState({
    interestedGenreLarge: '',
    interestedGenreSmall: '',
    introducingWorkGenreLarge: '',
    introducingWorkGenreSmall: '',
    dislikedGenre: ''
  });
  const [username, setUsername] = useState('');
  const [dummyUserCount, setDummyUserCount] = useState(0); // ダミーユーザーの数を管理するステート

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        const userId = user.uid + "-" + Date.now();
        setMyId(userId);
        getUsername(userId).then(name => {
          setUsername(name || '');
        });
      } else {
        setIsLoggedIn(false);
        setMyId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatchingSettings(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveSettings = () => {
    if (myId) {
      saveMatchingSettings(myId, matchingSettings);
      saveUserProfile(myId, { username });
    }
  };

  const startMatching = async () => {
    setIsMatchingWaiting(true);
    await addWaitingUser(myId, matchingSettings);
    const waitingUsers = await getWaitingUsers();
    if (waitingUsers.length >= 4) {
      const matchedUsers = waitingUsers.slice(0, 4);
      
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
      
      console.log("Matched Users:", matchedUsers);
      
      await startVideoCall(matchedUsers);
      matchedUsers.forEach(user => {
        console.log("Removing waiting user:", user);
        removeWaitingUser(user.userId);
      });
      setIsMatchingWaiting(false);
      setIsMatchingStarted(true);
      setDummyUserCount(3); // ダミーユーザーの数を設定
    } else {
      console.error("Not enough users for matching.");
      setIsMatchingWaiting(false);
    }
  };  

  const generateRoomId = () => {
    return "room_" + new Date().getTime();
  };

  const cancelMatching = () => {
    setIsMatchingWaiting(false);
    removeWaitingUser(myId);
  };

  const renderDummyUsers = () => {
    const dummyPanels = [];
    for (let i = 0; i < dummyUserCount; i++) {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // ランダムな色を生成
      dummyPanels.push(
        <div key={i} style={{ width: '200px', height: '200px', backgroundColor: randomColor }}>
          Dummy User {i + 1}
        </div>
      );
    }
    return dummyPanels;
  };

  return (
    <div className="App">
      <div>
        <strong>デバッグ情報:</strong>
        <ul>
          <li>ログイン状態: {isLoggedIn ? "ログイン済み" : "未ログイン"}</li>
          <li>ビデオ通話状態: {myId && roomId ? "ビデオ通話可能" : "ビデオ通話不可"}</li>
        </ul>
      </div>
      {isMatchingStarted ? (
        <>
          <VideoChat myId={myId} roomId={roomId} />
          {renderDummyUsers()} {/* ダミーユーザーのパネルをレンダリング */}
        </>
      ) : isMatchingWaiting ? (
        <div>
          <p>マッチング中...</p>
          <button onClick={cancelMatching}>キャンセル</button>
        </div>
      ) : (
        <>
          {isLoggedIn ? (
            <>
              <button onClick={logout}>ログアウト</button>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="ユーザーネーム"
                />
                {/* 他の入力フィールドと保存ボタンもここに配置 */}
                <button onClick={handleSaveSettings}>マッチング設定を保存</button>
                <button onClick={startMatching}>マッチングを開始</button>
              </div>
            </>
          ) : (
            <button onClick={googleLogin}>Googleでログイン</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
