const moment = require('moment-timezone');

module.exports.config = {
  name: "ajan",
  version: "2.0.0",
  role: 0,
  author: "SIDDIK",
  description: "AutoTime for prayer notifications",
  category: "AutoTime",
  countDown: 3
};

module.exports.onLoad = async ({ api }) => {
  const arrayData = {
    "05:04:00 AM": {
      message: `
╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🌙✨ ফজরের আজান ✨🌙  ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

📿 আসসালামু আলাইকুম!🖤💫
প্রিয় মুসলিম ভাই ও বোনেরা, 
এখন ফজরের আজান দেওয়া হয়েছে। 
নামাজের জন্য প্রস্তুতি নিন।
ফজরের নামাজ কিছু সময়ের মধ্যেই শুরু হবে।✨🧡
━━━━━━━━━━━━━━━━━━━━━━━
𝐓𝐇𝐄 𝐂𝐀𝐋𝐋 𝐓𝐎 𝐏𝐑𝐀𝐘𝐄𝐑 𝐖𝐀𝐒 𝐆𝐈𝐕𝐄𝐍
`
    },
    "12:59:00 PM": {
      message: `
╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🌙✨ জোহরের আজান ✨🌙  ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

📿 আসসালামু আলাইকুম!🖤💫
প্রিয় মুসলিম ভাই ও বোনেরা, 
এখন জোহরের আজান দেওয়া হয়েছে। 
নামাজের জন্য প্রস্তুতি নিন।
জোহরের নামাজ কিছু সময়ের মধ্যেই শুরু হবে।✨🧡
━━━━━━━━━━━━━━━━━━━━━━━
𝐓𝐇𝐄 𝐂𝐀𝐋𝐋 𝐓𝐎 𝐏𝐑𝐀𝐘𝐄𝐑 𝐖𝐀𝐒 𝐆𝐈𝐕𝐄𝐍
`
    },
    "03:44:00 PM": {
      message: `
╭━━━━━━━━━━━━━━━━━━━━━━╮
┃    🌙✨ আসর আজান ✨🌙  ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

📿 আসসালামু আলাইকুম!🖤💫
প্রিয় মুসলিম ভাই ও বোনেরা, 
এখন আসর আজান দেওয়া হয়েছে। 
নামাজের জন্য প্রস্তুতি নিন।
আসরের নামাজ কিছু সময়ের মধ্যেই শুরু হবে।✨🧡
━━━━━━━━━━━━━━━━━━━━━━━
𝐓𝐇𝐄 𝐂𝐀𝐋𝐋 𝐓𝐎 𝐏𝐑𝐀𝐘𝐄𝐑 𝐖𝐀𝐒 𝐆𝐈𝐕𝐄𝐍
`
    },
    "06:03:00 PM": {
      message: `
╭━━━━━━━━━━━━━━━━━━━━━━╮
┃  🌙✨ মাগরিব আজান ✨🌙   ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

📿 আসসালামু আলাইকুম!🖤💫
প্রিয় মুসলিম ভাই ও বোনেরা, 
এখন মাগরিব আজান দেওয়া হয়েছে। 
নামাজের জন্য প্রস্তুতি নিন।
মাগরিব নামাজ কিছু সময়ের মধ্যেই শুরু হবে।✨🧡
━━━━━━━━━━━━━━━━━━━━━━━
𝐓𝐇𝐄 𝐂𝐀𝐋𝐋 𝐓𝐎 𝐏𝐑𝐀𝐘𝐄𝐑 𝐖𝐀𝐒 𝐆𝐈𝐕𝐄𝐍
`
    },
    "07:29:00 PM": {
      message: `
╭━━━━━━━━━━━━━━━━━━━━━━╮
┃   🌙✨ ইশা আজান ✨🌙    ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

📿 আসসালামু আলাইকুম!🖤💫
প্রিয় মুসলিম ভাই ও বোনেরা, 
এখন ইশা আজান দেওয়া হয়েছে। 
নামাজের জন্য প্রস্তুতি নিন।
ইশা নামাজ কিছু সময়ের মধ্যেই শুরু হবে।✨🧡
━━━━━━━━━━━━━━━━━━━━━━━
𝐓𝐇𝐄 𝐂𝐀𝐋𝐋 𝐓𝐎 𝐏𝐑𝐀𝐘𝐄𝐑 𝐖𝐀𝐒 𝐆𝐈𝐕𝐄𝐍
`
    }
  };

  const checkTimeAndSendMessage = () => {
    const now = moment().tz('Asia/Dhaka');
    const currentTime = now.format('hh:mm:ss A');

    const messageData = arrayData[currentTime];

    if (messageData) {
      const tid = global.db.allThreadData.map(i => i.threadID);
      tid.forEach(async (threadID) => {
        api.sendMessage({ body: messageData.message }, threadID);
      });
    }

    const nextMinute = moment().add(1, 'minute').startOf('minute');
    const delay = nextMinute.diff(moment());
    setTimeout(checkTimeAndSendMessage, delay);
  };

  checkTimeAndSendMessage();
};

module.exports.onStart = () => {};
