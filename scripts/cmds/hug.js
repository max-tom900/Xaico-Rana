const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")


module.exports = {
    config: {
        name: "hug",
        aliases: ["hug"],
        version: "1.0",
        author: "MR.AYAN",
        countDown: 5,
        role: 0,
        shortDescription: "mention someone",
        longDescription: "mention your love",
        category: "love",
        guide: "{pn}"
    },



    onStart: async function ({ message, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length == 0) return message.reply("𝗣𝗹𝗲𝗮𝘀𝗲 𝗠𝗲𝗻𝘁𝗶𝗼𝗻 𝗦𝗼𝗺𝗲𝗼𝗻𝗲❗");
        else {
            const one = event.senderID, two = mention[0];
            bal(one, two).then(ptth => { message.reply({ body: "𝗬𝗼𝘂 𝗔𝗿𝗲 𝗧𝗵𝗲 𝗕𝗲𝘀𝘁 🥰", attachment: fs.createReadStream(ptth) }) })
        }
    }


};

async function bal(one, two) {

    let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=66262`)
    avone.circle()
    let avtw8568379%7Cc1e620fa708a1d5696fb991c1bde56o = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
    avtwo.circle()
    let pth = "hug.png"
    let img = await jimp.read("https://i.ibb.co/YB2HGZP/FB-IMG-16843164044100469-removebg-preview.png")

    img.resize(752, 708).composite(avone.resize(130, 130), 350, 380).composite(avtwo.resize(130, 130), 330, 140);

    await img.writeAsync(pth)
    return pth
} 
