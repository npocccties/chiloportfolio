const JwtError = () => {
  if (typeof window !== 'undefined') {
    window.alert('ユーザー情報の取得に失敗しました。タブを閉じます。\n※ 直接URL入力してe-ポートフォリオを開いた場合は手動でタブを閉じてください。')
    window.close()
  }
  return null
};

export default JwtError;
