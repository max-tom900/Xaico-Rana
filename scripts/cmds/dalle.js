const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "dalle",
    author: "NZ R",
    version: "1.0",
    countDown: 10,
    category: "ai-generated",
    guide: {
      en: "-dalle <prompt>\n\n[DALL-E Model Image Generations]"
    },
  },
  onStart: async ({ message: { reply: r, unsend }, args: a }) => {
    if (a.length === 0) return r("DALL-E GENERATOR USAGE\n\n" + module.exports.config.guide.en);

    let pr = a.join(" ");
    if (!pr) return r("⛔ | Please provide a query for image generation.");

    const waitingMessage = await r("🔀 | 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚒𝚗𝚐 𝙸𝚖𝚐... 𝙿𝚕𝚎𝚊𝚜𝚎 𝚆𝚊𝚒𝚝...");

    try {
      const imageResponse = await axios.get(`https://dalle-v1-by-nzr.onrender.com/dalle?prompt=${encodeURIComponent(pr)}`, {
        responseType: 'arraybuffer'
      });

      const tempFilePath = path.join(__dirname, `temp_${Date.now()}.jpg`);
      fs.writeFileSync(tempFilePath, Buffer.from(imageResponse.data));

      await unsend(waitingMessage.messageID);

      await r({
        body: "✅ | 𝚈𝚘𝚞𝚛 𝙶𝚎𝚗𝚎𝚛𝚊𝚝𝚎𝚍 𝙸𝚖𝚐.",
        attachment: fs.createReadStream(tempFilePath)
      });

      fs.unlinkSync(tempFilePath);

    } catch (err) {
      await unsend(waitingMessage.messageID);
      return r(`❌ | Error: ${err.message}`);
    }
  }
};
