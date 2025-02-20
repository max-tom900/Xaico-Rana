const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "avatar4",
		version: "1.0",
		author: "Samir",
		countDown: 10,
		role: 0,
		shortDescription: "Create fb avatar",
		longDescription: "",
		category: "avt & banners",
		guide: {
			en: "{p}{n} Characterame or code | text | Text",
		}
	},

  

	onStart: async function ({ message, args, event, api }) {
 
    const info = args.join(" ");
		if (!info){
			return message.reply(`𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝘁𝗲𝗿 𝗜𝗻 𝗧𝗵𝗲 𝗙𝗼𝗿𝗺𝗮𝘁𝗲:\n→avatar4 Characterame or code | text | Text`);
      
      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const juswa = msg[2];

        

       if (isNaN(id)) { // If input is not a number
          await message.reply("𝗣𝗿𝗼𝗰𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗔𝘃𝗮𝘁𝗮𝗿......");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu5?id=${id1}&tenchinh=${name}&tenphu=${juswa}&apikey=zrAM6vv6`)			
                 const form = {
				body: `𝗦𝗶𝗿 𝗬𝗼𝘂𝗿 𝗔𝘃𝗮𝘁𝗮𝗿 𝗜𝘀 𝗛𝗮𝗿𝗲 🙀`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
         
      

       }else  { 
       await message.reply("𝗣𝗿𝗼𝗰𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗔𝘃𝗮𝘁𝗮𝗿.....");
         
         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu5?id=${id}&tenchinh=${name}&tenphu=${juswa}&apikey=zrAM6vv6`)			
                 const form = {
				body: `𝗦𝗶𝗿 𝗬𝗼𝘂𝗿 𝗔𝘃𝗮𝘁𝗮𝗿 𝗜𝘀 𝗛𝗮𝗿𝗲 🙀`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
        }
      }
    }
   };