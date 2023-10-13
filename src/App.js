import React, { useState, useEffect, useRef } from 'react';
import VideoChat from './VideoChat';
import Sigin from './Sigin';
import styled from 'styled-components';
import Home from './Home';
import Save from "./components/Save";
import { db } from './firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore'; 
import { getDocs, collection } from 'firebase/firestore';
import { getDummyUsers } from './firebaseConfig';
import Untitled2 from './Untitled2';

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
  startVideoCall,
  dissolveRoom,
} from './firebaseConfig';

const SessionButton = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  color: rgba(255,255,255,1);
  font-size: 70px;
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -55%);
  background-color: green;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index 5;
`;

const TimerDisplay = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255,255,255,1);
  font-size: 70px;
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -35%);
  background-color: green;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [myId, setMyId] = useState(null);
  const [remoteId, setRemoteId] = useState(null);
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
  const [dummyUserCount, setDummyUserCount] = useState(0);
  const [sessionStartCount, setSessionStartCount] = useState(0);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const sessionTimerRef = useRef(null);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [dummyUsers, setDummyUsers] = useState([]);

  useEffect(() => {
    const fetchDummyUsers = async () => {
      const users = await getDummyUsers();
      console.log("Fetched dummy users:", dummyUsers);
      setDummyUsers(users);
    };

    fetchDummyUsers();
  }, []);

  useEffect(() => {
    if (myId) {
      const settingsRef = doc(db, 'matchingSettings', myId);
  
      const unsubscribe = onSnapshot(settingsRef, (doc) => {
        if (doc.exists()) {
          console.log("Matching settings updated:", doc.data());
        } else {
          console.log("No settings found!");
        }
      });
  
      return () => unsubscribe();
    }
  }, [myId]);

  useEffect(() => {
    // ユーザーIDがセットされている場合にリスナーを設定
    if (myId) {
      // matchingSettingsコレクションの中の特定のユーザーIDのドキュメントを参照
      const settingsRef = doc(db, 'matchingSettings', myId);

      // ドキュメントの変更を監視するリスナーを設定
      const unsubscribe = onSnapshot(settingsRef, (doc) => {
        if (doc.exists()) {
          console.log("Matching settings updated:", doc.data());
        } else {
          console.log("No settings found!");
        }
      });

      // コンポーネントがアンマウントされるか、myIdが変更された場合にリスナーを解除
      return () => unsubscribe();
    }
  }, [myId]);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setMyId(user.uid); // ユーザーIDを設定
        // ユーザー名を取得
        getUsername(user.uid).then(name => {
          setUsername(name || '');
        });
        // 他のユーザー情報もここで取得できます
      } else {
        setIsLoggedIn(false);
        setMyId(null);
        setUsername('');
      }
    });
  
    return () => unsubscribe();

  }, []);

  const handleLogout = () => {
    logout(); // Firebaseのログアウト関数を呼び出します
    setIsLoggedIn(false); // ログインステータスを更新します
    console.log("User logged out");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatchingSettings(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    if (myId) {
      saveMatchingSettings(myId, matchingSettings);
      saveUserProfile(myId, { username });
      console.log("Settings saved!");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const calculateMatchingPoints = (profileA, profileB) => {
    let points = 0;
    // ここでprofileAとprofileBを比較し、ポイントを計算します。
    // 例:
    if(profileA.interestedGenreLarge === profileB.interestedGenreLarge) {
      points += 10; // 任意のポイント値
    }
    // 他の属性も同様に比較し、ポイントを加算します。
    return points;
  };

  const findBestMatches = (userId, allUsersProfiles) => {
    const userProfile = allUsersProfiles[userId];
    const pointsMap = {};
  
    // 他の全てのユーザーとのポイントを計算
    for (const otherUserId in allUsersProfiles) {
      if (userId !== otherUserId) {
        pointsMap[otherUserId] = calculateMatchingPoints(userProfile, allUsersProfiles[otherUserId]);
      }
    }
  
    // ポイントが最も高い3人のユーザーを見つける
    const bestMatches = Object.keys(pointsMap).sort((a, b) => pointsMap[b] - pointsMap[a]).slice(0, 3);
    
    return bestMatches;
  };

  const getAllUsersProfiles = async () => {
    const usersProfiles = {};
    // Firestoreからすべてのユーザープロファイルを取得
    const querySnapshot = await getDocs(collection(db, "userProfiles"));
    querySnapshot.forEach((doc) => {
      usersProfiles[doc.id] = doc.data();
    });
    return usersProfiles;
  };

  const startMatching = async () => {
    setIsMatchingWaiting(true);
    await addWaitingUser(myId, matchingSettings);
    const waitingUsers = await getWaitingUsers();

    const allUsersProfiles = await getAllUsersProfiles();
  
    // ここで全ての待機中のユーザーのプロファイルを取得します。
    // 例: const allUsersProfiles = await getAllUsersProfiles();
  
    if (waitingUsers.length >= 4) {
      // ポイントが最も高い3人のユーザーを見つける
      const bestMatches = findBestMatches(myId, allUsersProfiles);
  
      // マッチングしたユーザーのIDを取得
      const matchedUsers = bestMatches.map(userId => {
        return { userId, ...allUsersProfiles[userId] };
      });
  
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
      console.log("Matched Users:", matchedUsers);
  
      // ビデオ通話を開始
      await startVideoCall(matchedUsers);
  
      // マッチングしたユーザーを待機リストから削除
      matchedUsers.forEach(user => {
        console.log("Removing waiting user:", user);
        removeWaitingUser(user.userId);
      });
  
      setIsMatchingWaiting(false);
      setIsMatchingStarted(true);
      setDummyUserCount(3);
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
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      dummyPanels.push(
        <div key={i} style={{ width: '200px', height: '200px', backgroundColor: randomColor }}>
          Dummy User {i + 1}
        </div>
      );
    }
    return dummyPanels;
  };

  const handleSessionStartClick = () => {
    setSessionStartCount(prev => prev + 1);
    console.log("Session button clicked!"); // ボタンがクリックされたことを確認
  };

  const handleRoomDissolve = async () => {
    setRoomId(null);
    setIsSessionStarted(false);
    setSessionStartCount(0);
    setIsMatchingStarted(false);
    alert("ルームが解散しました。");
    await dissolveRoom(roomId);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const requiredStarts = 4 - dummyUserCount;
    console.log(`Session start count: ${sessionStartCount}, Required starts: ${requiredStarts}`);
    if (sessionStartCount === requiredStarts) {
      console.log("Session is starting...");
      setIsSessionStarted(true);
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (sessionStartCount === 0 && isMatchingStarted) {
      console.log("Setting timeout for session start...");
      sessionTimerRef.current = setTimeout(() => {
        if (!isSessionStarted) {
          console.log("30 seconds passed without starting the session. Dissolving the room...");
          setSessionStartCount(0);
          alert("30秒経過: セッションが開始されませんでした。ルームを解散します。");
          handleRoomDissolve();
        }
      }, 30000);
    }
  }, [sessionStartCount, dummyUserCount, isSessionStarted, isMatchingStarted]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(sessionTimerRef.current);
      handleRoomDissolve();
    }
  }, [timer]);

  return (
    <div className="App">
      <div>
        <ul>
        </ul>
      </div>
      {isMatchingStarted ? (
        <>
          <VideoChat myId={myId} roomId={roomId} />
          <Untitled2></Untitled2>
          {renderDummyUsers()}
          {!isSessionStarted ? (
            <>
              {sessionStartCount < (4 - dummyUserCount) && (
                <SessionButton onClick={handleSessionStartClick}>
                  Session!
                </SessionButton>
              )}
              <p>{sessionStartCount} / {4 - dummyUserCount} people ready</p>
            </>
          ) : (
            <TimerDisplay>
              <p>{formatTime(timer)}</p>
            </TimerDisplay>
          )}
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
              <div>
              <Home
                handleLogout={handleLogout}
                matchingSettings={matchingSettings}
                handleInputChange={handleInputChange}
                username={username}
                handleUsernameChange={handleUsernameChange}
                handleSaveSettings={handleSaveSettings}
                startMatching={startMatching}
                
              />
              </div>
            </>
          ) : (
            <Sigin onGoogleLogin={googleLogin} />
          )}
        </>
      )}
    </div>
  );
}

export default App;