require('dotenv').config();
const http = require('http');
const ical = require('ical-generator');
const moment = require('moment');

const chinachu = require('./chinachuApi.js');

const LISTEN_PORT = process.env.LISTEN_PORT ? process.env.LISTEN_PORT : 3000;

const createReservesIcal = function(res) {
  const cal = ical({
    domain: process.env.HOST,
    name: 'chunachu reserved'
  });

  chinachu
    .getReserves()
    .then(reserves => {
      reserves.data.forEach(reserve => {
        if (reserve.isSkip === true) return;
        cal.createEvent({
          start: moment(reserve.start),
          end: moment(reserve.end),
          summary: reserve.fullTitle,
          description: reserve.detail,
          location: reserve.channel.name,
          url: process.env.CHINACHU_WUI_HOST + '/#!/program/view/id=' + reserve.id
        });
      });
      cal.serve(res);
    })
    .catch(err => {
      res.statusCode = 500;
      res.end('Error.');
      console.error('API Error: ' + err.message);
    });
};

const createRecordedIcal = function(res) {
  const cal = ical({
    domain: process.env.HOST,
    name: 'chunachu recorded'
  });

  chinachu
    .getRecorded()
    .then(reserves => {
      reserves.data.forEach(reserve => {
        cal.createEvent({
          start: moment(reserve.start),
          end: moment(reserve.end),
          summary: reserve.fullTitle,
          description: reserve.detail,
          location: reserve.channel.name,
          url: process.env.CHINACHU_WUI_HOST + '/#!/program/view/id=' + reserve.id
        });
      });
      cal.serve(res);
    })
    .catch(err => {
      res.statusCode = 500;
      res.end('Error.');
      console.error('API Error: ' + err.message);
    });
};

http
  .createServer(function(req, res) {
    switch (req.url) {
      case '/reserves.ics':
        createReservesIcal(res);
        break;
      case '/recorded.ics':
        createRecordedIcal(res);
        break;
      default:
        res.statusCode = 404;
        res.end('Not found.');
    }
  })
  .listen(LISTEN_PORT, function() {
    console.log('Server running.');
  });
