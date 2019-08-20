require('dotenv').config();
const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.CHINACHU_WUI_HOST + '/api/'
});

if (process.env.CHINACHU_WUI_USER && process.env.CHINACHU_WUI_PASSWORD) {
  instance.defaults.auth = {
    username: process.env.CHINACHU_WUI_USER,
    password: process.env.CHINACHU_WUI_PASSWORD
  };
}

/**
 * ジャンルリスト
 */
const CATEGORY = [
  'anime',
  'information',
  'news',
  'sports',
  'variety',
  'documentary',
  'drama',
  'music',
  'cinema',
  'theater',
  'hobby',
  'welfare',
  'etc'
];

const functions = {
  /**
   * ジャンル一覧を取得
   * @return {Array} ジャンル一覧
   */
  getCategorys() {
    return CATEGORY;
  },
  /**
   * 予約ルールを取得
   * - 空の場合は400エラーが返ります
   */
  getRules: param => {
    return instance
      .get('rules.json')
      .then(success)
      .catch(failed);
  },
  /**
   * 番組表のヘッダを取得
   */
  getSchedulesHeader: param => {
    return instance
      .head('schedule.json')
      .then(success)
      .catch(failed);
  },
  /**
   * 番組表を取得
   */
  getSchedules: param => {
    return instance
      .get('schedule.json')
      .then(success)
      .catch(failed);
  },
  /**
   * 予約済プログラムリストを取得
   */
  getReserves: param => {
    return instance
      .get('reserves.json')
      .then(success)
      .catch(failed);
  },
  /**
   * 録画中一覧を取得
   */
  getRecording: param => {
    return instance
      .get('recording.json')
      .then(success)
      .catch(failed);
  },
  /**
   * 録画済プログラム情報を取得
   */
  getRecorded: param => {
    return instance
      .get('recorded.json')
      .then(success)
      .catch(failed);
  }
};

const success = response => {
  return Promise.resolve({ data: response.data, date: response.headers.date });
};

const failed = error => {
  return Promise.reject(error);
};

module.exports = functions;
