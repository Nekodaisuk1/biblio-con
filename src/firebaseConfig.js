import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAARrut72o5oitHskavSe4MwNaL5CJlGUw",
  authDomain: "biblio-connect.firebaseapp.com",
  projectId: "biblio-connect",
  storageBucket: "biblio-connect.appspot.com",
  messagingSenderId: "496237393328",
  appId: "1:496237393328:web:20978f7e2d2a1c24db5275"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const findMatchingUsers = async (userId, userSettings) => {
  let matchedUsers = [];
  try {
    const usersSnapshot = await getDocs(collection(db, 'matchingSettings'));
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      if (doc.id !== userId && userData.introducingWorkGenre !== userSettings.dislikedGenre) {
        matchedUsers.push({ userId: doc.id, ...userData });
      }
    });
    matchedUsers.sort((a, b) => {
      return a.introducingWorkGenre === userSettings.interestedGenre ? -1 : 1;
    });
    matchedUsers = matchedUsers.slice(0, 5);
  } catch (error) {
    console.error("マッチング検索エラー:", error);
  }
  return matchedUsers;
};

export const saveMatchingSettings = async (userId, settings) => {
    try {
      await setDoc(doc(db, 'matchingSettings', userId), settings);
    } catch (error) {
      console.error("マッチング設定保存エラー:", error);
    }
};

export const SKYWAY_API_KEY = '0693168e-b2e6-40ec-8bdb-c855e3c118ac';

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Googleログインエラー:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("ログアウトエラー:", error);
  }
};

export const saveUserProfile = async (userId, profile) => {
  try {
    await setDoc(doc(db, 'users', userId), profile);
  } catch (error) {
    console.error("プロフィール保存エラー:", error);
  }
};

export const getUsername = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().username;
    }
  } catch (error) {
    console.error("ユーザーネーム取得エラー:", error);
  }
  return null;
};

export const getCurrentUserId = () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export { auth };