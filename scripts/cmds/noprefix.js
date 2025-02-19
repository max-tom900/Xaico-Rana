const fs = require('fs');

module.exports = {
  config: {
    name: "noprefix2",
    version: "1.1",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    countDown: 5,
    role: 0,
    shortDescription: "no prefix2",
    longDescription: "no prefix2",
    category: "fun",
  },

  onStart: async function() {},

  onChat: async function({ event, message, api }) {
    if (event.body) {
      const word = event.body.toLowerCase();
      
      const responses = {
        "i love you": [
          "হুম আমার বস রানা ও তোমাকে ভালোবাসে! 🥰",
          "ভালোবাসা একটু বেশি হয়ে গেলো মনে হচ্ছে! 😜"
        ],
        "miss you": [
          "আমি তোমাকে রাইতে মিস করি, দিনে করি না? 😹",
          "আমি তো ২৪/৭ তোমাকে মিস করি! 🤖"
        ],
        "😘": [
          "এইটা কী করলি! মুখে গন্ধ আসতেছে!! 🤢",
          "আবার দে দেখি 😏"
        ],
        "👍": [
          "আবাল, ভালো লাগলো নাকি? 🐸🤣",
          "এইটা আবার কী? লাইকার গোষ্ঠী! 😤"
        ],
        "hi": [
          "Assala-Mualaikum 🥀🖤",
          "Hello Boss! কেমন আছো? 😎"
        ],
        "chagol": [
          "সেম টু ইউ! 😾",
          "তুই কি ছাগল জাতির সদস্য নাকি? 🤣"
        ],
        "chup": [
          "তুই চুপ, তোর ১৪ গুষ্টি চুপ! 😼",
          "আমি চুপ থাকবো না, তুই থাক! 😏"
        ],
        "kire": [
          "সরি বস, আর ভুল হবে না! 🥺",
          "তুই ঠিক আছিস তো? 😵‍💫"
        ],
        "kiss me": [
          "তুমি পঁচা, তোমাকে কিস দিবো না! 🤭",
          "আগে দাঁত ব্রাশ কর, তারপর কথা! 🪥😆"
        ],
        "hmm": [
          "সব কিছুর জবাব দেওয়া যায়, কিন্তু হুম এর জবাব কিভাবে দিবো? 😅💔",
          "হুম মানে কী? প্রেম নাকি রাগ? 🤨"
        ],
        "morning": [
          "GOOD MORNING! দাঁত ব্রাশ করছো তো? 😚",
          "সুপ্রভাত! আজকের দিন শুভ হোক! 🌞"
        ],
        "bal": [
          "তোমার বাল উঠে নাই নাকি? 🤖😾",
          "এই নাম কোথা থেকে আনলি? 😵‍💫"
        ],
        "ceo": [
          "𝗢𝘄𝗻𝗲𝗿: 𝗠𝗼𝗵𝗮𝗺𝗺𝗮𝗱 𝗥𝗮𝗻𝗮 🖤❤️‍🩹",
          "আমার বস রানা, তার অনুমতি ছাড়া কিছু হয় না! 😎"
        ],
        "tor boss ke": [
          "আমার ক্রিয়েটর 𝗠𝗼𝗵𝗮𝗺𝗺𝗮𝗱 𝗥𝗮𝗻𝗮 ❤️",
          "আমি একটাই কথা জানি, বস মানে রানা! 🔥"
        ],
        "admin": [
          "╭──✦ 𝗔𝗗𝗠𝗜𝗡  𝗜𝗡𝗙𝗢 ✦──╮\n├‣ 𝙽𝙰𝙼𝙴: 𝙼𝙾𝙷𝙰𝙼𝙼𝙰𝙳 𝚁𝙰𝙽𝙰\n├‣ 𝙰𝙶𝙴: 𝟷𝟾+\n├‣ 𝙶𝙴𝙽𝙳𝙴𝚁: 𝙼𝙰𝙻𝙴\n├‣ 𝚆𝙾𝚁𝙺: 𝚂𝚃𝚄𝙳𝙴𝙽𝚃\n├‣ 𝙵𝙱: https://facebook.com/XAICO.RANA\n╰────────────────♡彡",
          "𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗡𝗧𝗔𝗖𝗧: 𝟬𝟭𝟵𝟴𝟴𝟲𝟴𝟲𝟰𝟬𝟲 📞"
        ]
      };

      if (responses[word]) {
        const randomResponse = responses[word][Math.floor(Math.random() * responses[word].length)];
        message.reply({ body: randomResponse });

        // ইমোজি রিয়্যাকশন (যদি দরকার হয়)
        const emojiReactions = {
          "i love you": "😘",
          "miss you": "🥱",
          "😘": "😾",
          "👍": "👊",
          "hi": "💐",
          "hmm": "🤣",
          "morning": "💐",
          "bal": "😆",
          "ceo": "😘",
          "tor boss ke": "💐",
          "admin": "😘"
        };

        if (emojiReactions[word]) {
          await api.setMessageReaction(emojiReactions[word], event.messageID, event.threadID, api);
        }
      }
    }
  }
};
