 const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const cheerio = require('cheerio');
const urlencode = require('urlencode');

const token = '561994620:AAFMgAMrZZHB9B0zkg3prFpE1Ni6aS9KxxY';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  //console.log(msg.text);
  var hi = /hi|hello|반갑다|반갑습니다|안녕|안녕하세요|ㅎㅇ|ㅅㅇㄹ/;
  var aa = /(?=(의)(\s|)(날씨)|(에)(\s|)(는날씨))|날씨/;
  var bb = /(?=(은|는)(\s|)(어디))/;
  var a = /(의|에)/;
  var c = /(은|는)/;
  var length = "";
  var lan;
  var lng;
    //console.log(url);
  //console.log(html);
  if(hi.exec(msg.text)) {
    bot.sendMessage(chatId, '안녕 \n반갑다.');
  }
  //var weather;
  if(aa.exec(msg.text)) {
    var b = a.exec(msg.text);
    for(i = 0; i < b.index; i++) {
      length = length + b.input[i];
    }
    var url ='http://maps.google.com/maps/api/geocode/json?address='+urlencode(length);
    request(url, function(error, res, html) {
      var obj = JSON.parse(html);
      lat = obj.results[0].geometry.location.lat;
      lng = obj.results[0].geometry.location.lng;
      url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=66fd1d85f8d4d1c628c756aa705d410e';
      request(url, function(error, res, html) {
        obj = JSON.parse(html);
        var weather = obj.main.temp_max - obj.main.temp_min;
        bot.sendMessage(chatId, length + "의 온도 : " +weather +"도\n" + length + "의 날씨 : " + obj.weather[0].main + " : " + obj.weather[0].description);
      });
    });
  }
  if(bb.exec(msg.text)) {
    var f = c.exec(msg.text);
    for(i = 0; i < f.index; i++) {
      length = length + f.input[i];
    }
    var url ='http://maps.google.com/maps/api/geocode/json?address='+urlencode(length);
  //console.log(url);
    request(url, function(error, res, html) {
      var obj = JSON.parse(html);
      lat = obj.results[0].geometry.location.lat;
      lng = obj.results[0].geometry.location.lng;
      bot.sendLocation(chatId, lat,lng);
    });
  }
  if(msg.text === '급식') {
    url = 'https://stu.sen.go.kr/sts_sci_md00_001.do?schulCode=B100000662&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=1';
    requrest(url, function(error, res, html) {
      
    })
  }
  // send a message to the chat acknowledging receipt of their message
});