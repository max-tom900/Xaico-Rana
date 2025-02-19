const moment = require('moment-timezone');

module.exports.config = {
  name: "interactive",
  version: "1.0.0",
  role: 1,  // Only admins can activate the system
  author: "RANA",//Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
  description: "A bot that replies randomly when a user messages, activated by an admin tagging a user.",
  category: "Interactive",
  countDown: 3
};

module.exports.onLoad = async ({ api, event, threadsData }) => {
  const { senderID, threadID, messageID, body } = event;

  const randomReplies = [
    "😆 'ভাই আপনে আর মেসেজ দিয়েন নাতো 🙄 !'",
    "😂 'তুই চুপ থাকতে পারোস না 🙄 !'",
    "🤣 'তোমার মেসেজ সবার জন্য একটা কমেডি শো থেকে কম নয় 🙄 !'",
    "😜 'দ্বারাও সোনা তোমাকে suspand করার ব্যবস্থা করতেছি 😾'",
    "😂 ' আমি আর কিছু বলব না! কারণ পাগল ভালো হবার নয় 🙄'"
  ];

  // Random response when someone sends a message
  if (body && !body.startsWith("@")) {
    const randomResponse = randomReplies[Math.floor(Math.random() * randomReplies.length)];
    api.sendMessage(randomResponse, threadID, messageID);
  }

  // Check if the admin tagged someone and activate the system
  if (body && body.includes('@')) {
    const mentionedUser = body.match(/@([^\s]+)/); // Match the @user
    if (mentionedUser) {
      const mentionedUserID = mentionedUser[1]; // Extract the tagged user's ID
      const adminID = senderID;

      // Ensure only admins can activate the system
      const isAdmin = await isUserAdmin(adminID, threadID, api);
      if (isAdmin) {
        api.sendMessage(`⚡  𝗧𝗵𝗲 𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝘀 𝗢𝗻! @${mentionedUserID}, 𝗡𝗼𝘄 𝗧𝗵𝗲 𝗨𝘀𝗲𝗿 𝗚𝗲𝘁𝘁𝗶𝗻𝗴 𝗥𝗮𝗻𝗱𝗼𝗺 𝗥𝗲𝗽𝗹𝘆.. 😉`, threadID, messageID);
      } else {
        api.sendMessage(" 📌সোনা এই কমান্ড তোমার জন্য নাগো 🙂👍 !", threadID, messageID);
      }
    }
  }
};

// Function to check if a user is an admin in the group
async function isUserAdmin(userID, threadID, api) {
  try {
    const threadInfo = await api.getThreadInfo(threadID);
    return threadInfo.adminIDs.some(admin => admin.userID == userID);
  } catch (error) {
    console.error("Error checking admin:", error);
    return false;
  }
}

module.exports.onStart = () => {};
