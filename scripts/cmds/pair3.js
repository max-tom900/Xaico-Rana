const { getStreamFromURL } = global.utils;
module.exports = {
  config: {
    name: "pair3",
    version: "1.0",
    author: "Rulex-al LOUFI",
    shortDescription: {
      en: "pair Girls 😗",
      vi: ""
    },
    category: "love",
    guide: "{prefix}random-female"
  },

  onStart: async function({ event, threadsData, message, usersData }) {
    const uidI = event.senderID;
    const avatarUrl1 = await usersData.getAvatarUrl(uidI);
    const name1 = await usersData.getName(uidI);
    const threadData = await threadsData.get(event.threadID);
    const members = threadData.members.filter(member => member.gender === "FEMALE" && member.inGroup);

    
    const randomIndex = Math.floor(Math.random() * members.length);
    const randomMember = members[randomIndex];
    const name2 = await usersData.getName(`${randomMember.userID}`);
    const avatarUrl2 = await usersData.getAvatarUrl(`${randomMember.userID}`);
    const randomNumber1 = Math.floor(Math.random() * 36) + 65;
    const randomNumber2 = Math.floor(Math.random() * 36) + 65;
    if (!randomMember) return message.reply('mention han');

    message.reply({body:`•𝗘𝘃𝗿𝘆𝗼𝗻𝗲 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀 𝗧𝗵𝗲 𝗡𝗲𝘄 𝗛𝘂𝘀𝗯𝗮𝗻𝗱 𝗔𝗻𝗱 𝗪𝗶𝗳𝗲 :
    ❤️${name1}💕${name2}❤️
𝗟𝗼𝘃𝗲 𝗣𝗲𝗿𝗰𝗲𝗻𝘁𝗮𝗴𝗲: "${randomNumber1} % 🤭"
𝗖𝗼𝗺𝗽𝗮𝘁𝗶𝗯𝗶𝗹𝗶𝘁𝘆 𝗥𝗮𝘁𝗶𝗼: "${randomNumber2} % 💕"

𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀 🥳`, attachment: [
				await getStreamFromURL(`${avatarUrl1}`),
				await getStreamFromURL(`${avatarUrl2}`)
			]})
  }
};
