# chinachu-ical

Chinachu APIから取得可能な番組情報をiCalendar形式に変換

## Usage

```bash
# install dependencies
npm install

# running server
npm start
```

## Provide calendar

### `/reserves.ical`

予約済みのスケジュール

### `/recorded.ical`

録画済みのスケジュール

## Configuration

環境変数 or `.env`ファイルで指定

| require | key | description | example |
| :--: | :--: | :--: | :--: |
| ✔ | CHINACHU_WUI_HOST | chinachu が稼働しているホスト | `http://localhost:10772` |
| | CHINACHU_WUI_USER | Basic 認証のユーザ名 | `user` |
| | CHINACHU_WUI_PASSWORD | Basic 認証のパスワード | `password` |
| ✔ | HOST | 稼働ホスト名 | `localhost` |
| | LISTEN_PORT | 稼働ポート | `3000` |
