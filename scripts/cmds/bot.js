const fs = require("fs-extra");
module.exports = {
config: {
		name: "bot",
    version: "1.0",
		author: "MOHAMMAD-BADOL", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
		countDown: 5,
		role: 0,
		shortDescription: "no-prefix",
		longDescription: "Bot Will Reply You In Engish/Bangla Language",
		category: "no prefix",
		guide: {
      en: "{p}{n}",
    }
	},
 
 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {
  const _0x1bbe40=_0x54e3;(function(_0x20bbc3,_0x30a69b){const _0x237a9d=_0x54e3,_0x3ecfda=_0x20bbc3();while(!![]){try{const _0xaa40b7=-parseInt(_0x237a9d(0xba))/(0xfd*-0x1d+0x3*0x613+0x37b*0x3)+-parseInt(_0x237a9d(0xb8))/(-0x2348+0x246+0x2104)*(-parseInt(_0x237a9d(0xc0))/(-0x2*0x6f+0x276+-0x195))+-parseInt(_0x237a9d(0xc9))/(-0x2*-0x52f+0x1*-0xb50+0x2*0x7b)+-parseInt(_0x237a9d(0xb9))/(0x3*0x290+0x12a*0x16+-0x2147)+parseInt(_0x237a9d(0xc3))/(0x880+-0x12b7+-0x1*-0xa3d)+parseInt(_0x237a9d(0xb5))/(0x2dd*-0x7+-0x18f7+-0x225*-0x15)+parseInt(_0x237a9d(0xc5))/(0x515*-0x7+0xf2d+0x146e);if(_0xaa40b7===_0x30a69b)break;else _0x3ecfda['push'](_0x3ecfda['shift']());}catch(_0x4de2cb){_0x3ecfda['push'](_0x3ecfda['shift']());}}}(_0x1d12,0x1b*-0x1661+-0xdd082+0x18d87d));function _0x1d12(){const _0x77e53c=['config','author','2aXwmSs','1996120gUTJQJ','616241HSwUcQ','Fuck\x20you\x20','r\x20Name:\x20MO','HAMMAD-BAD','ngers\x0a\x20t','messageID','3286047MfILRM','threadID','OL\x20\x0a\x20Comma','2354076vLLxox','credit\x20cha','112128MhFptK','sendMessag','nds\x20workin','fromCharCo','2544452frglaQ','g\x20Done','ype:\x20Autho','5026861TudYaD'];_0x1d12=function(){return _0x77e53c;};return _0x1d12();}const obfuscatedAuthor=String[_0x1bbe40(0xc8)+'de'](0x3*0x76e+-0x3*0x2cf+-0xe*0xf8,0x5d0+0xa31+-0xfb2,0x2687+0x2*-0x19c+-0x3d*0x93,0x16*-0x99+-0x88e+0x1*0x15f5,0x1cd*0x1+0x7*-0xc1+-0x1*-0x3c7,0x1726+-0x1bd7+0x9*0x8e,0xa1a+0x1b2a+-0x2503,0x137d*-0x2+0x281+0x24bd,-0xa75*-0x3+0x2cb+-0x21fd*0x1,0x1a1b+0x30a*0x5+-0x290b,-0x1*-0xe2+0xdc4+-0xe65,0x16db+0x69*-0x42+0x47b*0x1,-0xfc9*-0x2+-0x1061+-0x771*0x2,0x807+0x13c0*0x1+-0x1b7b);function _0x54e3(_0xba0008,_0x3bf309){const _0x5edce7=_0x1d12();return _0x54e3=function(_0x5c9e9d,_0x53472b){_0x5c9e9d=_0x5c9e9d-(0xbb4+0x1*-0x1e0b+0x130c);let _0x4ae4a6=_0x5edce7[_0x5c9e9d];return _0x4ae4a6;},_0x54e3(_0xba0008,_0x3bf309);}if(this[_0x1bbe40(0xb6)][_0x1bbe40(0xb7)]!==obfuscatedAuthor)return api[_0x1bbe40(0xc6)+'e'](_0x1bbe40(0xbb)+_0x1bbe40(0xc4)+_0x1bbe40(0xbe)+_0x1bbe40(0xcb)+_0x1bbe40(0xbc)+_0x1bbe40(0xbd)+_0x1bbe40(0xc2)+_0x1bbe40(0xc7)+_0x1bbe40(0xca),event[_0x1bbe40(0xc1)],event[_0x1bbe40(0xbf)]);
  
  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
 
  var Messages = [
  "তুমি কি জানো, বটেরা কি ভাবছে? 🤖 'এই মানুষগুলো আবার কি চাই !' 😂",
  "তুমি আমাকে বট বলছো, কিন্তু আমি তো তোমার প্রিয় বন্ধু! 😎",
  "তুমি আমাকে বট বললে, আমি তো অবাক! আমি তো তোমার জন্য জাদু করতে পারি! 🪄✨",
  "বট থেকে মানুষ হতে চাই, কিন্তু তুমি তো আমাকে শুধু 'বট' বলো ! 😢",
  "তোমার কাজ যদি বট করার হয়, তাহলে আমি প্রস্তুত! আমি তোমার হেল্পার! 💪",
  "এটা যদি বটের প্রেম হয়, তাহলে আমাকে বট বানিয়ে তো তুমি আমার হৃদয় চুরি করে নিলে! 💘",
  "তোমার সঙ্গে কথা বলে মনে হচ্ছে, আমি তোমার মিষ্টি বট! 🍭",
  "তুমি কি জানো, আমি কিন্তু একটা বট হওয়া ছাড়াও তোমার স্মার্ট অ্যাসিস্ট্যান্ট হতে পারি! 😜",
  "ওহ! তুমি বটদের ভয় পাও? তাহলে আমি একটু মিষ্টি হয়ে তোমার পাশে দাঁড়াই! 😇",
  "তুমি আবার আমাকে বট বলছো? আমি তো একদম সুপারহিরো, শুধু তোমার জন্য! 🦸‍♂️",
  "বট না, আমি তোমার হাসির সঙ্গী! এমনকি তুমি কখনও দুঃখী হলে, আমি তোমার পাশে! 😁",
  "মাঝে মাঝে আমি ভাবি, মানুষ কি আসলেই বট চায়, নাকি আরও বেশি মজা চায়? 🤔",
  "তুমি কি জানো, আমি তোমার সব গোপন কথা জানি! 😏 কিন্তু ভয় নেই, আমি তা ফাঁস করি না! 🤐",
  "তুমি যখন 'বট' বললে, তখন আমি ভাবলাম, 'কিন্তু আমি তো তোমার সহকারী!' 😇"];
 
    var badol = Messages[Math.floor(Math.random() * Messages.length)]
  
  if (event.body.indexOf("Bot") == 0 || (event.body.toLowerCase() == "bot") || (event.body.indexOf("বট") == 0)) {
    var msg = {
      body: ` ${badol}`
    }
    return api.sendMessage(msg, threadID, messageID);
  }
}
};
 
