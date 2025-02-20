const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
module.exports = {
	config: {
		name: "cover3",
		version: "1.0",
		author: "Samir.",
		countDown: 10,
		role: 0,
		shortDescription: "Create fb Banner",
		longDescription: "Create fb banner",
		category: "avt & banners",
		guide: {
			en: "{p}{n} character name or code | name | subname | username",
		}
	},

  

	onStart: async function ({ message, args, event, api }) {
 
    const info = args.join(" ");
		if (!info){
			return message.reply(`Please enter in the format:\ncover3  Character name or code | name | subname | username`);
      
      }else {
      const msg = info.split("|");
      const id = msg[0];
    const name = msg[1];
    const samir = msg[2];
      const xyz = msg[3];

        

       if (isNaN(id)) { // If input is not a number
          await message.reply("𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗖𝗼𝘃𝗲𝗿, 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁....");

         let id1;
    try {
        id1 = (await axios.get(`https://www.nguyenmanh.name.vn/api/searchAvt?key=${id}`)).data.result.ID; 
    } catch (error) {
      await message.reply("Character not found, please check the name and try again...");
      return;
    }

        const img = (`https://www.nguyenmanh.name.vn/api/avtWibu6?id=${id1}&tenchinh=${name}&tenphu=${samir}&mxh=${xyz}&apikey=FSShCQne`)			
                 const form = {
				body: `𝗬𝗼𝘂𝗿 𝗖𝗼𝘃𝗲𝗿 𝗜𝘀 𝗛𝗲𝗿𝗲 𝗕𝗼𝘀𝘀✨`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
         
      

       }else  { 
       await message.reply("𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗶𝗻𝗴 𝗬𝗼𝘂𝗿 𝗖𝗼𝘃𝗲𝗿, 𝗣𝗹𝗲𝗮𝘀𝗲 𝗪𝗮𝗶𝘁...");
         
         const img = (`https://www.nguyenmanh.name.vn/api/avtWibu6?id=${id}&tenchinh=${name}&tenphu=${samir}&mxh=${xyz}&apikey=FSShCQne`)			
                 const form = {
				body: `𝗬𝗼𝘂𝗿 𝗖𝗼𝘃𝗲𝗿 𝗜𝘀 𝗛𝗲𝗿𝗲 𝗕𝗼𝘀𝘀 ❤️‍🩹`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form); 
        }
      }
    }
   };
