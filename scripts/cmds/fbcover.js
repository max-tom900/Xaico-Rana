const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "fbcover",
    version: "1.0",
    author: "munem | Rana", //updated
    countDown: 5,
    role: 0,
    shortDescription: "Create fb Cover photo",
    longDescription: "Create fb Cover photo",
    category: "Cover",
    guide: {
      en: "{pn} name | subname | address | phone | email | color",
    }
  },

  onStart: async function ({ message, args, event, api }) {
    const info = args.join(" ");
    if (!info) {
      return message.reply(`𝗣𝗹𝗲𝗮𝘀𝗲 𝗜𝗻 𝗧𝗵𝗲 𝗙𝗼𝗿𝗺𝗮𝘁𝗲:\n\n.𝗙𝗯𝗰𝗼𝘃𝗲𝗿 | 𝗦𝘂𝗯𝗻𝗮𝗺𝗲 | 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 | 𝗣𝗵𝗼𝗻𝗲 | 𝗘𝗺𝗮𝗶𝗹 | 𝗖𝗼𝗹𝗼𝗿`);
    } else {
      const msg = info.split("|");
      if (msg.length < 6) {
        return message.reply(`Invalid number of parameters\n\nPlease provide all required information\n\nExample ➠ .fbcover Rana | anonymous | bangladesh | 01818181810 | rana@gmail.com | green`);
      }
      
      const name = msg[0].trim();
      const subname = msg[1].trim();
      const address = msg[2].trim();
      const phone = msg[3].trim();
      const email = msg[4].trim();
      const color = msg[5].trim();
      
      const completionMessage = await message.reply(`
▹ 𝗦𝗶𝗿 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁 𝗔 𝗠𝗼𝗺𝗲𝗻𝘁 ◃
                         ♛         
〨 𝗜'𝗺 𝗖𝗿𝗲𝗮𝘁𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗖𝗼𝘃𝗲𝗿 〨`);
   
      const img = `https://www.nguyenmanh.name.vn/api/fbcover1?name=${name}&uid=${event.senderID}&address=${address}&email=${email}&subname=${subname}&sdt=${phone}&color=${color}&apikey=sr7dxQss`;
      
      const form = {
        body: `
   ​​​​​ ≛⋯𝗛𝗲𝘆 𝗦𝗶𝗿⋯≛ 
    
⍣⊷ 𝗧𝗮𝗸𝗲 𝗬𝗼𝘂𝗿 𝗖𝗼𝘃𝗲𝗿 ⊶⍣`
      };
      
      try {
        form.attachment = [];
        form.attachment[0] = await global.utils.getStreamFromURL(img);
        await api.sendMessage(form, event.threadID);
        await api.unsendMessage(completionMessage.messageID);
      } catch (error) {
        await message.reply(`An error occurred while fetching the image. Please try again later.`);
      }
    }
  }
};
