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
      * .envの`ALLOWED_HOSTS`に記載されているドメインを、デプロイ先のドメインに設定する

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

## DB, ビルド時用
.env
| 変数名                               | 説明                                        | デフォルト値         |
| :----------------------------------- | :------------------------------------------ | :------------------- |
|SSL_CERTS_DIR|サーバー証明書の配置ディレクトリ|・ディレクトリの末尾には `/` は付与しないこと<br>・本番環境では下記の命名でファイルを配置しておくこと<br>　`signed.crt`: サーバー証明書<br>　`domain.key`: サーバー証明書の秘密鍵|
|ALLOWED_HOSTS|公開ホスト名|本番リリースする際は本番サーバーのホスト名を設定してください|

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
|baseURL|アプリケーション起動時のURL|http://localhost:3000|
|clientName|アプリケーションの名称|chiloportfolio|
|vcApp_client_id|AzureクライアントID|-|
|vcApp_azTenantId|AzureテナントID|-|
|vcApp_client_secret|Azureクライアントシークレット|-|
|vcApp_scope|AzureへVC発行要求するためのスコープ配列|-|
