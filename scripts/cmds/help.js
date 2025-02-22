const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "🦋 𝐀𝐫𝐘𝐀𝐍 🌺";

/** 
* ✦ 𝐀𝐮𝐭𝐡𝐨𝐫: 𝐍𝐓𝐊𝐡𝐚𝐧𝐠 | 𝐀𝐫𝐘𝐀𝐍 ✦  
* ⚠️ 𝐃𝐨 𝐍𝐨𝐭 𝐄𝐝𝐢𝐭 𝐎𝐫 𝐃𝐞𝐥𝐞𝐭𝐞 𝐓𝐡𝐢𝐬 𝐅𝐢𝐥𝐞 ⚠️  
*/

module.exports = {
  config: {
    name: "help",
    version: "1.18",
    author: "NTKhang | ArYAN",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "**View command usage**"
    },
    longDescription: {
      en: "**View detailed command usage**"
    },
    category: "**📜 Info 📜**",
    guide: {
      en: `**🛠 Usage:**  
      ━━━━━━━━━━━━━━━━━━━━━━  
      🔹 {pn} [empty | <page number> | <command name>]  
      🔹 {pn} <command name> [-u | usage | -g | guide] → *Show command usage*  
      🔹 {pn} <command name> [-i | info] → *Show command info*  
      🔹 {pn} <command name> [-r | role] → *Show command role*  
      🔹 {pn} <command name> [-a | alias] → *Show command alias*  
      ━━━━━━━━━━━━━━━━━━━━━━`
    },
    priority: 1
  },

  langs: {
    en: {
      help: `🔹 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐋𝐢𝐬𝐭 🔹  
━━━━━━━━━━━━━━━━━━━  
%1  
━━━━━━━━━━━━━━━━━━━  
📌 **Page:** [ %2 / %3 ]  
📌 **Total Commands:** %4  
📌 **Usage:** Type **%5help <page>** to navigate  
📌 **Details:** Type **%5help <command>** for more info  
━━━━━━━━━━━━━━━━━━━  
🔹 %6 🔹`,

      help2: `🔹 𝐀𝐥𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 🔹  
━━━━━━━━━━━━━━━━━━━  
📌 **Total Commands:** 「%2」  
━━━━━━━━━━━━━━━━━━━  
%4  
━━━━━━━━━━━━━━━━━━━`,

      commandNotFound: `⚠️ **Command "%1" not found!**`,
      getInfoCommand: `━━━━━━━━━━━━━━  
📌 **𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐍𝐚𝐦𝐞:** %1  
📌 **𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:** %2  
📌 **𝐀𝐥𝐢𝐚𝐬𝐞𝐬:** %3  
📌 **𝐆𝐫𝐨𝐮𝐩 𝐀𝐥𝐢𝐚𝐬:** %4  
📌 **𝐕𝐞𝐫𝐬𝐢𝐨𝐧:** %5  
📌 **𝐑𝐨𝐥𝐞:** %6  
📌 **𝐂𝐨𝐨𝐥𝐝𝐨𝐰𝐧:** %7s  
📌 **𝐀𝐮𝐭𝐡𝐨𝐫:** %8  
━━━━━━━━━━━━━━  
🛠 **Usage:**  
» %9  
━━━━━━━━━━━━━━`,

      onlyInfo: `━━━━━━━━━━━━━━  
📌 **𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐍𝐚𝐦𝐞:** %1  
📌 **𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:** %2  
📌 **𝐀𝐥𝐢𝐚𝐬𝐞𝐬:** %3  
📌 **𝐆𝐫𝐨𝐮𝐩 𝐀𝐥𝐢𝐚𝐬:** %4  
📌 **𝐕𝐞𝐫𝐬𝐢𝐨𝐧:** %5  
📌 **𝐑𝐨𝐥𝐞:** %6  
📌 **𝐂𝐨𝐨𝐥𝐝𝐨𝐰𝐧:** %7s  
📌 **𝐀𝐮𝐭𝐡𝐨𝐫:** %8  
━━━━━━━━━━━━━━`,

      onlyUsage: `━━━━━━━━━━━━━━  
🛠 **𝐔𝐬𝐚𝐠𝐞:**  
%1  
━━━━━━━━━━━━━━`,

      onlyAlias: `━━━━━━━━━━━━━━  
📌 **𝐀𝐥𝐢𝐚𝐬𝐞𝐬:** %1  
📌 **𝐆𝐫𝐨𝐮𝐩 𝐀𝐥𝐢𝐚𝐬:** %2  
━━━━━━━━━━━━━━`,

      onlyRole: `━━━━━━━━━━━━━━  
📌 **𝐑𝐨𝐥𝐞:** %1  
━━━━━━━━━━━━━━`,

      doNotHave: `❌ *Not Available*`,
      roleText0: `👥 **All users**`,
      roleText1: `👮 **Group Administrators**`,
      roleText2: `🔧 **Bot Admins**`,
      roleText0setRole: `👥 **All users (set role)**`,
      roleText1setRole: `👮 **Group Admins (set role)**`,
      pageNotFound: `⚠️ **Page %1 does not exist!**`
    }
  }
};
