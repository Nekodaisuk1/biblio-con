import { getFirestore, setDoc, doc } from 'firebase/firestore';

const db = getFirestore();

const genreLargeOptions = [
  "ゲーム", "本", "視聴関連", "音楽関連", "アート関連", "演劇関連"
];

const genreSmallOptions = {
  "ゲーム": ["PCゲーム", "コンソールゲーム", "モバイルゲーム", "アーケードゲーム", "ボードゲーム", "カードゲーム", "テーブルトークRPG", "オンラインゲーム"],
  "本": ["小説", "電子書籍", "マンガ", "ライトノベル", "雑誌", "新聞", "オーディオブック"],
  // ... [他の大ジャンルに対する小ジャンルのオプション]
};

const getRandomItem = (array) => {
    if (!array || array.length === 0) {
      console.error("Invalid array:", array);
      return null; // または適切なデフォルト値
    }
    return array[Math.floor(Math.random() * array.length)];
};

export const createDummyUsers = async (numUsers) => {
  try {
    for (let i = 0; i < numUsers; i++) {
      const interestedGenreLarge = getRandomItem(genreLargeOptions);
      const introducingWorkGenreLarge = getRandomItem(genreLargeOptions);

      const interestedGenreSmall = genreSmallOptions[interestedGenreLarge] 
        ? getRandomItem(genreSmallOptions[interestedGenreLarge]) 
        : "[なし]";
      const introducingWorkGenreSmall = genreSmallOptions[introducingWorkGenreLarge] 
        ? getRandomItem(genreSmallOptions[introducingWorkGenreLarge]) 
        : "[なし]";

      const dislikedGenreLarge = getRandomItem(genreLargeOptions);
      const dislikedGenreSmallOptions = genreSmallOptions[dislikedGenreLarge];
      const dislikedGenreSmall = dislikedGenreSmallOptions 
        ? getRandomItem(dislikedGenreSmallOptions) 
        : "[なし]";

      // ユーザーIDを生成
      const userId = generateUserId();

      const dummyUserSettings = {
        userId,  // ここでuserIdを追加
        interestedGenreLarge,
        interestedGenreSmall,
        introducingWorkGenreLarge,
        introducingWorkGenreSmall,
        dislikedGenreLarge,
        dislikedGenreSmall,
        isWaitingForMatching: true, // マッチング待機状態に設定
      };

      // ダミーユーザーを 'matchingSettings' コレクションに追加
      await setDoc(doc(db, 'matchingSettings', userId), dummyUserSettings);

      // ダミーユーザーを 'waitingUsers' コレクションにも追加
      await setDoc(doc(db, 'waitingUsers', userId), dummyUserSettings);
    }
    console.log(`${numUsers}人のダミーユーザーが作成されました`);
  } catch (error) {
    console.error("ダミーユーザー作成エラー:", error);
  }
};

// ユーザーIDを生成する関数
const generateUserId = () => {
  return "user_" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
};
