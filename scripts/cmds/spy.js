const { GoatWrapper } = require("fca-liane-utils");

module.exports = {
  config: {
    name: "spy",
    version: "1.0",
    role: 0,
    author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    description: "Get user information and profile photo",
    category: "information",
    countDown: 10,
  },

  onStart: async function ({ event, message, usersData, api, args }) {
    let uid;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];

    if (args[0]) {
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) uid = match[1];
      }
    }

    if (!uid) {
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) return message.reply("❌ | ইউজার ইনফরমেশন আনতে ব্যর্থ!");

      const avatarUrl = await usersData.getAvatarUrl(uid);
      const money = (await usersData.get(uid)).money;
      const allUser = await usersData.getAll();
      
      const rank = allUser.sort((a, b) => b.exp - a.exp).findIndex(user => user.userID === uid) + 1;
      const moneyRank = allUser.sort((a, b) => b.money - a.money).findIndex(user => user.userID === uid) + 1;
      
      // Gender Mapping
      const genderText = userInfo[uid].gender === 1 ? "👧 𝗚𝗶𝗿𝗹" : userInfo[uid].gender === 2 ? "👦 𝗕𝗼𝘆" : "🏳️‍🌈 𝗢𝘁𝗵𝗲𝗿";

      const userInfoMessage = `
━━━━━━━━━━━━━━━━
🔥 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢 🔥
━━━━━━━━━━━━━━━━
👤 𝗡𝗮𝗺𝗲: ${userInfo[uid].name}
🆔 𝗨𝗜𝗗: ${uid}
🚻 𝗚𝗲𝗻𝗱𝗲𝗿: ${genderText}
🔗 𝗣𝗿𝗼𝗳𝗶𝗹𝗲 𝗨𝗥𝗟: ${userInfo[uid].profileUrl}
🎂 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆: ${userInfo[uid].isBirthday !== false ? userInfo[uid].isBirthday : "🔒 Private"}
🎭 𝗡𝗶𝗰𝗸𝗡𝗮𝗺𝗲: ${userInfo[uid].alternateName || "❌ None"}
💰 𝗠𝗼𝗻𝗲𝘆: $${formatMoney(money)}
🏆 𝗥𝗮𝗻𝗸: #${rank}/${allUser.length}
💸 𝗠𝗼𝗻𝗲𝘆 𝗥𝗮𝗻𝗸: #${moneyRank}/${allUser.length}
━━━━━━━━━━━━━━━━
🙌 𝗘𝗻𝗷𝗼𝘆 𝗥𝗔𝗡 𝗕𝗢𝗧 ❤️‍🩹
━━━━━━━━━━━━━━━━`;

      message.reply({
        body: userInfoMessage,
        attachment: await global.utils.getStreamFromURL(avatarUrl),
      });
    });
  }
};

function formatMoney(num) {
  const units = ["", "K", "M", "B", "T", "Q", "Qi", "Sx", "Sp", "Oc", "N", "D"];
  let unit = 0;
  while (num >= 1000 && ++unit < units.length) num /= 1000;
  return num.toFixed(1).replace(/\.0$/, "") + units[unit];
}

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
