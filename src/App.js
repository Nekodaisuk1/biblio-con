import React, { useState, useEffect } from 'react';
import VideoChat from './VideoChat';
import { getCurrentUserId, findMatchingUsers, googleLogin, logout, saveMatchingSettings, saveUserProfile, auth, getUsername } from './firebaseConfig';

function App() {
  const [myId, setMyId] = useState(null);
  const [remoteId, setRemoteId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMatchingStarted, setIsMatchingStarted] = useState(false);
  const [isMatchingWaiting, setIsMatchingWaiting] = useState(false);
  const [matchingSettings, setMatchingSettings] = useState({
    interestedGenre: '',
    dislikedGenre: '',
    introducingWorkGenre: ''
  });
  const [username, setUsername] = useState('');

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
        setRemoteId(null);
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
    const matchedUsers = await findMatchingUsers(myId, matchingSettings);
    if (matchedUsers.length > 0) {
      const matchedUserId = matchedUsers[0].userId;
      setRemoteId(matchedUserId);
      setIsMatchingWaiting(false);
      setIsMatchingStarted(true);
    }
  };

  const cancelMatching = () => {
    setIsMatchingWaiting(false);
  };

  return (
    <div className="App">
      <div>
        <strong>デバッグ情報:</strong>
        <ul>
          <li>ログイン状態: {isLoggedIn ? "ログイン済み" : "未ログイン"}</li>
          <li>マッチング状態: {remoteId ? "マッチング済み" : "未マッチング"}</li>
          <li>ビデオ通話状態: {myId && remoteId ? "ビデオ通話可能" : "ビデオ通話不可"}</li>
        </ul>
      </div>
      {isMatchingStarted ? (
        <VideoChat myId={myId} remoteId={remoteId} />
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
                <input
                  type="text"
                  name="interestedGenre"
                  value={matchingSettings.interestedGenre}
                  onChange={handleInputChange}
                  placeholder="興味のあるジャンル"
                />
                <input
                  type="text"
                  name="dislikedGenre"
                  value={matchingSettings.dislikedGenre}
                  onChange={handleInputChange}
                  placeholder="苦手なジャンル"
                />
                <input
                  type="text"
                  name="introducingWorkGenre"
                  value={matchingSettings.introducingWorkGenre}
                  onChange={handleInputChange}
                  placeholder="紹介する作品のジャンル"
                />
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
