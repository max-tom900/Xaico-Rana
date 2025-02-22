module.exports = {
  config: {
    name: "age",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    category: "write",
    shortDescription: {
      en: "mention your friend and write something to post✍️",
    },
  },

  onStart: async function ({ api, event, args }) {
    const birthday = args[0];

    if (!birthday) {
      return api.sendMessage("𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗬𝗼𝘂𝗿 𝗕𝗶𝗿𝘁𝗱𝗮𝘆 𝗜𝗻 𝗬𝗲𝗮𝗿-𝗠𝗼𝗻𝘁𝗵-𝗗𝗮𝘁𝗲 𝗙𝗼𝗿𝗺𝗮𝘁𝗲.. ❤️‍🩹.", event.threadID);
    }

    const currentDate = new Date();
    const birthDate = new Date(birthday);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    birthDate.setFullYear(currentDate.getFullYear());
    const isBeforeBirthday = currentDate < birthDate;

    const finalAge = isBeforeBirthday ? age - 1 : age;

    api.sendMessage(`𝗬𝗼𝘂𝗿 𝗔𝗴𝗲 𝗜𝘀 ${finalAge} 𝗔𝗺 𝗜 𝗥𝗶𝗴𝗵𝘁..?`, event.threadID);
  },
};
