module.exports = {
  config: {
    name: "sicbo",
    aliases: ["sic"],
    version: "1.0",
    author: "Loid Butter",
    countDown: 10,
    role: 0,
    shortDescription: "Play Sicbo, the oldest gambling game",
    longDescription: "Play Sicbo, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <Small/Big> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["small", "big"].includes(betType)) {
      return message.reply("🙊 | 𝗖𝗵𝗼𝗼𝘀𝗲 '𝗦𝗺𝗮𝗹𝗹' 𝗼𝗿 '𝗕𝗶𝗴'.");
    }

    if (!Number.isInteger(betAmount) || betAmount < 50) {
      return message.reply("❌ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗕𝗲 𝗔𝗻 𝗔𝗺𝗼𝘂𝗻 𝗢𝗳 𝟱𝟬 𝗼𝗿 𝗠𝗼𝗿𝗲.");
    }

    if (betAmount > userData.money) {
      return message.reply("❌ | 𝗬𝗼𝘂 𝗗𝗼𝗻𝘁 𝗛𝗮𝘃𝗲 𝗘𝗻𝗼𝘂𝗴𝗵 𝗠𝗼𝗻𝗲𝘆 𝗧𝗼 𝗠𝗮𝗸𝗲 𝗧𝗵𝗮𝘁 𝗕𝗲𝘁");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 1 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n🎉 | 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀! 𝗬𝗼𝘂 𝗪𝗼𝗻 ${winAmount}!`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`(\\_/)\n( •_•)\n// >[ ${resultString} ]\n\n😿 | 𝗬𝗼𝘂 𝗟𝗼𝘀𝘁 ${betAmount}.`);
    }
  }
};
