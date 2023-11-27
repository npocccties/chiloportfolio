const JwtError = () => {
  if (process.browser) {
    window.alert('ユーザー情報の取得に失敗しました。タブを閉じます。')
    window.close()
  }
};

export default JwtError;
