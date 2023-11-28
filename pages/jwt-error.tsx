const JwtError = () => {
  if (typeof window !== 'undefined') {
    window.alert('ユーザー情報の取得に失敗しました。タブを閉じます。')
    window.close()
  }
  return null
};

export default JwtError;
