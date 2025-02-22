const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
  config: {
    name: "wltgc",
    aliases: ["wltonly", "wltgroup", "wltgc"],
    version: "1.4",
    author: "NTKhang",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "turn on/off only whitelistIds can use bot"
    },
    longDescription: {
      en: "turn on/off only whiteListThreadIds can use bot"
    },
    category: "owner",
    guide: {
      en: "   {pn} [on | off]: turn on/off the mode only whiteListThreadIds can use bot"
        + "\n   {pn} noti [on | off]: turn on/off the notification when user is not whiteListThreadIds use bot"
    }
  },

  langs: {
    en: {
      turnedOn: "𝗧𝘂𝗿𝗻𝗲𝗱 𝗢𝗻 𝗧𝗵𝗲 𝗠𝗼𝗱𝗲 𝗢𝗻𝗹𝘆 𝗪𝗵𝗶𝘁𝗲𝗟𝗶𝘀𝘁𝗧𝗵𝗿𝗲𝗮𝗱𝘀 𝗖𝗮𝗻 𝗨𝘀𝗲 𝗕𝗼𝘁",
      turnedOff: "𝗧𝘂𝗿𝗻𝗲𝗱 𝗢𝗳𝗳 𝗧𝗵𝗲 𝗠𝗼𝗱𝗲 𝗢𝗻𝗹𝘆 𝗪𝗵𝗶𝘁𝗲𝗟𝗶𝘀𝘁𝗧𝗵𝗿𝗲𝗮𝗱𝘀 𝗖𝗮𝗻 𝗨𝘀𝗲 𝗕𝗼𝘁",
      turnedOnNoti: "𝗧𝘂𝗿𝗻 𝗢𝗻 𝗧𝗵𝗲 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗪𝗵𝗲𝗻 𝗧𝗵𝗿𝗲𝗮𝗱 𝗡𝗼𝘁  𝗪𝗵𝗶𝘁𝗲𝗟𝗶𝘀𝘁𝗧𝗵𝗿𝗲𝗮𝗱𝗜𝗱𝘀",
      turnedOffNoti: "𝗧𝘂𝗿𝗻 𝗢𝗳𝗳 𝗧𝗵𝗲 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝗪𝗵𝗲𝗻 𝗧𝗵𝗿𝗲𝗮𝗱 𝗡𝗼𝘁 𝗪𝗵𝗶𝘁𝗲𝗟𝗶𝘀𝘁𝗧𝗵𝗿𝗲𝗮𝗱𝗜𝗱𝘀"
    }
  },

  onStart: function ({ args, message, getLang }) {
    let isSetNoti = false;
    let value;
    let indexGetVal = 0;

    if (args[0] == "noti") {
      isSetNoti = true;
      indexGetVal = 1;
    }

    if (args[indexGetVal] == "on")
      value = true;
    else if (args[indexGetVal] == "off")
      value = false;
    else
      return message.SyntaxError();

    if (isSetNoti) {
      config.hideNotiMessage.whiteListModeThread = !value;
      message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
    }
    else {
      config.whiteListModeThread.enable = value;
      message.reply(getLang(value ? "turnedOn" : "turnedOff"));
    }

    fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
  }
};
