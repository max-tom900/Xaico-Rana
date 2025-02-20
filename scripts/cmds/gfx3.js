const axios = require('axios');

module.exports = {
  config: {
    name: "gfx3",
    version: "1.0",
    author: "Samir.",
    countDown: 10,
    role: 0,
    shortDescription: "Make A gfx logo",
    longDescription: "Make A gfx logo",
    category: "gfx",
    guide: {
      en: "{p}{n} name | subname",
    }
  },

  onStart: async function ({ message, event, api }) {
    const info = event.body.slice(event.body.indexOf(' ') + 1);
    if (!info) {
      return message.reply("𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝘁𝗲𝗿 𝗜𝗻 𝗧𝗵𝗲 𝗙𝗼𝗿𝗺𝗮𝘁𝗲 :\ngfx3  name | subname");
    }

    const [text, text1] = info.split("|").map((item) => item.trim());

    await message.reply("𝗣𝗿𝗼𝘀𝗲𝘀𝘀𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁...");

    const img = `https://tanjiro-api.onrender.com/gfx3?text=${text}&text2=${text1}&api_key=tanjiro`;
    const form = {
      body: "𝗛𝗲𝗿𝗲 𝗬𝗼𝘂𝗿 𝗚𝗳𝘅 𝗟𝗼𝗴𝗼✨",
      attachment: [await global.utils.getStreamFromURL(img)]
    };

    message.reply(form);
    }
 };

