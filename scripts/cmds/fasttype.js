const axios = require("axios");

module.exports = {
  config: {
    name: "fasttype",
    aliases: ["typing", "speedtype"],
    version: "1.0",
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    longDescription: { en: "⌨️🔥 Test your typing speed with this fun challenge! ⚡" },
    category: "🎮 Games",
    guide: { en: "🚀 Use {p}{n} to start the typing challenge!" },
  },

  onStart: async function ({ message, event }) {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      const sentence = response.data.content;
      
      message.reply(`⌨️ **𝗙𝗮𝘀𝘁 𝗧𝘆𝗽𝗶𝗻𝗴 𝗖𝗵𝗮𝗹𝗹𝗲𝗻𝗴𝗲!** 🏆\n\n📝 **𝗧𝘆𝗽𝗲 𝗧𝗵𝗲 𝗙𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴 𝗔𝘀 𝗙𝗮𝘀𝘁 𝗔𝘀 𝗬𝗼𝘂 𝗖𝗮𝗻:**\n\n💬 **${sentence}**\n\n⏳ 𝗬𝗼𝘂 𝗛𝗮𝘃𝗲 **𝟯𝟬 𝗦𝗲𝗰𝗼𝗻𝗱'𝘀!** 🕒`,
        (err, info) => {
          if (!err) {
            const timeout = setTimeout(() => {
              if (global.Bot.onReply.has(info.messageID)) {
                message.unsend(info.messageID);
                global.Bot.onReply.delete(info.messageID);
                message.reply("⏳ **𝗧𝗶𝗺𝗲'𝘀 𝗨𝗽!** ❌ 𝗕𝗲𝘁𝘁𝗲𝗿 𝗟𝘂𝗰𝗸 𝗡𝗲𝘅𝘁 𝗧𝗶𝗺𝗲 ! 🍀");
              }
            }, 30000);

            global.Bot.onReply.set(info.messageID, {
              commandName: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              correctText: sentence,
              timeout: timeout,
            });
          }
        }
      );
    } catch (error) {
      console.error("🚨 Error fetching sentence:", error.message);
      message.reply("❌ Oops! Something went wrong! 😢");
    }
  },

  onReply: async function ({ message, event }) {
    try {
      const userText = event.body.trim();
      const replyData = global.Bot.onReply.get(event.messageReply.messageID);

      if (!replyData || replyData.author !== event.senderID) return;

      message.unsend(event.messageReply.messageID);

      if (userText === replyData.correctText) {
        message.reply("🎉 **𝗣𝗲𝗿𝗳𝗲𝗰𝘁!** 🏆 𝗬𝗼𝘂 𝗧𝘆𝗽𝗲𝗱 𝗜𝘁 𝗖𝗼𝗿𝗿𝗲𝗰𝘁𝗹𝘆 ! 🎊");
      } else {
        message.reply("❌ **𝗜𝗻𝗰𝗼𝗿𝗿𝗲𝗰𝘁!** 😔 𝗧𝗿𝘆 𝗔𝗴𝗮𝗶𝗻 𝗡𝗲𝘅𝘁 𝗧𝗶𝗺𝗲 . 🔄");
      }

      global.Bot.onReply.delete(event.messageReply.messageID);
    } catch (error) {
      console.error("⚠️ Error checking typing:", error.message);
      message.reply("⚠️ **Error!** Something went wrong! ❌");
    }
  },
};


আমি "Fast Typing Challenge" গেমের স্ক্রিপ্টটি সুন্দরভাবে ইমোজি দিয়ে বানিয়েছি 🚀😊

