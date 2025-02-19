module.exports = {
  config: {
    name: "welcomeAdmin",
    aliases: ["adminWelcome", "specialWelcome"],
    version: "1.0",
    author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
    description: "Send a special welcome message when the bot admin joins the group.",
    category: "Admins",
  },

  onStart: async function ({ api, event, message }) {
    const { threadID, senderID } = event;
    const botID = api.getCurrentUserID();
    const adminID = "100063487970328"; // Replace with the bot admin's user ID
    
    // Check if the user who joined is the bot admin
    if (senderID === adminID) {
      // Send a special welcome message to the bot admin
      const welcomeMessage = `🎉🎉 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗥𝗮𝗻𝗮 𝗕𝗼𝘀𝘀 🎉🎉\n\n𝗬𝗼𝘂 𝗔𝗿𝗲 𝗡𝗼𝘄 𝗣𝗮𝗿𝘁 𝗢𝗳 𝗧𝗵𝗶𝘀 𝗚𝗿𝗼𝘂𝗽! ⚡️`;
      return api.sendMessage(welcomeMessage, threadID);
    }
  },
};
