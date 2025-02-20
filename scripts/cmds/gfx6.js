const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
	config: {
		name: "gfx6",
    aliases: ["gfxs6"],
    version: "1.0",
		author: "Samir",
		countDown: 35,
		role: 0,
		shortDescription: "Make A gfx logo",
		longDescription: "Make A gfx logo",
		category: "gfx",
		guide: {
      en: "{p}{n} name",
    }
	},

	onStart: async function ({ message, args }) {
		const text = args.join(" ");
		if (!text) {
			return message.reply(`𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝘁𝗲𝗿 𝗔 𝗧𝗲𝘅𝘁..`);
		} else {
			const img = `https://tanjiro-api.onrender.com/gfx6?name=${encodeURIComponent(text)}&api_key=tanjiro`;		
      
                 const form = {
				body: `𝗛𝗲𝗿𝗲 𝗬𝗼𝘂𝗿 𝗚𝗳𝘅 𝗟𝗼𝗴𝗼..`
			};
				form.attachment = []
				form.attachment[0] = await global.utils.getStreamFromURL(img);
			message.reply(form);
			  }
}};
