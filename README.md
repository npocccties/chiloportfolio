# 動作環境
- OS: Unix 系（Windows では WSL 等をお使いください）
- Node.js: v16.20.1
- Docker
- Docker Compose (v2)

# setup
git clone実行後、ルートディレクトリで以下のコマンドを実行します。
```
script/setup.sh
```

# 開発
makeコマンドがインストールされていない場合は、適宜インストールしてください。

コンテナのビルド
```
make build-local
```

コンテナ起動
```
make up-local
# make up-d-localの場合はdaemonで起動
```

appコンテナ内に移動
```
script/inapp.sh
```

コンテナのdown
```
make down-local
```

アプリケーションの移動（appコンテナ内）
```
npm run dev
```

## Visual Studio CodeでdevContainerを使用する場合
1. Docker および Docker Compose をインストール
2. Visual Studio Code に拡張機能「Dev - Containers」をインストール
3. 当READMEのsetupを実行
4. コマンドパレット で「Remote-Containers: Open Folder in Container...」を選択し、chiloportfolioディレクトリを選択

## デバッグ方法
上記のdevContainerを起動し、VSCodeの左側にあるデバッグから起動ボタンを押して実行してください。

# 開発サーバー（または本番サーバー）

1. 下記をインストール
   * Docker
   * Docker Compose (v2)
   * Git  
1. 適当なディレクトリへ移動
   ```
   cd /work
   ```
1. chiloportfolio のソースを取得
   ```
   git clone https://github.com/npocccties/chiloportfolio.git
   ```
   * 既にディレクトリが存在するならば `sudo rm -rf chiloportfolio` にて削除してください
1. chiloportfolio へ移動
   ```
   cd chiloportfolio
   ```
1. `*.sh` に権限付与
   ```
   sudo chmod 755 *.sh
   ```
1. 環境変数を定義した `.env` をルートディレクトリに配置
   * 開発サーバー：
      * ルートディレクトリで、`script/setup.sh` を実行する

1. デプロイ
  - 開発サーバー
    ```
    make build-dev
    ```
  - 停止（開発サーバー）
    ```
    make down-dev
    ```


# 環境変数

## ビルド時用
.env
| 変数名                               | 説明                                        | デフォルト値         |
| :----------------------------------- | :------------------------------------------ | :------------------- |
|-|-|-|

## Next.jsアプリケーション用
Next.jsアプリケーションでは、環境毎に以下のパターンで.envファイルを参照します。

| ファイル名 |	読み込まれるタイミング
| :--------- | :--------- | 
|.env.local |	毎回
|.env.development |	next dev 時のみ
|.env.production	| next start 時のみ

https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

以下の2つの環境変数の値を記述します。

.env.development

.env.production

| 変数名                               | 説明                                        | デフォルト値         |
| :----------------------------------- | :------------------------------------------ | :------------------- |
|NEXT_PUBLIC_SERVICE_NAME|サービス名|e-ポートフォリオ|
|NEXT_PUBLIC_SERVICE_DESCRIPTION|サービスの説明<br>metaタグに設定される説明です。|e-ポートフォリオは、教育指標毎のオープンバッジの取得状況を確認するサイトです。|
|NEXT_PUBLIC_OKUTEP_BASE_URL|OKUTEPのURL|-|
|NEXT_PUBLIC_WALLET_BASE_URL|バッジウォレットのURL|-|
|NEXT_PUBLIC_COPYRIGHT_LINK|フッターに表示するコピーライトのリンク|-|
|NEXT_PUBLIC_COPYRIGHT|フッターに表示するコピーライト|-|
|NEXT_PUBLIC_CSV_FILE_NAME|CSVダウンロードで指定するファイル名|e-Portfolio|
|NEXT_PUBLIC_HELP_LINK|ヘルプのリンク|-|
|NEXT_PUBLIC_LOGOUT_LINK|オルトロスのログアウトのリンク|-|
|PASSWORD|e-ポートフォリオのアクティベーション画面で入力する利用キー<br>※複数指定時はカンマ区切り|-|
|SESSION_MAX_AGE_HOUR|ログインセッションの有効時間（単位：時）|-|
|LOG_LEVEL|ログレベル<br>'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'|-|
|LOG_MAX_SIZE|ログファイルサイズ<br>単位には k / m / g のいずれか指定|100m|
|LOG_MAX_FILE|ログファイルの世代数|7|
|orthros_login_key_base64|Orthrosから発行されるJWTの署名に対応した公開鍵のbase64エンコード形式|-|
|BCRYPT_SALT|アクティベーションの利用キーのハッシュ値のソルト<br>※$の直前にはバックスラッシュを付与してエスケープすること|-|
