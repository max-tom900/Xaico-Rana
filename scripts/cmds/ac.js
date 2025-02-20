const axios = require("axios");
const fs = require("fs-extra");
const os = require("os");
const ytdl = require("ytdl-core");

module.exports = {
  sentVideos: [],

  config: {
    name: "ac",
    version: "2.0",
    role: 0,
    author: "404",
    cooldowns: 5,
    shortDescription: "",
    longDescription: "get  edits videos from YouTube",
    category: "video",
    dependencies: {
      "fs-extra": "",
      "axios": "",
      "ytdl-core": "",
      "yt-search": ""
    }
  },

  onStart: async function ({ api, event, message }) {
    try {
      const senderID = event.senderID;

      const loadingMessage = await api.sendMessage("𝗟𝗼𝗮𝗱𝗶𝗻𝗴 𝗔𝘀𝘀𝗮𝘀𝘀𝗶𝗻'𝘀 𝗖𝗿𝗲𝗲𝗱 𝗘𝗱𝗶𝘁𝘀..", event.threadID, null, event.messageID);

      const apiKey = "AIzaSyAO1tuGus4-S8RJID51f8WJAM7LXz1tVNc";
      const playlistId = "PLCiXFxWx8d2CgKVjiFApRN1H2sfTThT7C";

      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=contentDetails&maxResults=50`;
      const response = await axios.get(playlistUrl);

      const items = response.data.items;
      const videoIds = items.map((item) => item.contentDetails.videoId);

      if (this.sentVideos.length === videoIds.length) {
        this.sentVideos = [];
      }

      const unwatchedVideoIds = videoIds.filter((videoId) => !this.sentVideos.includes(videoId));

      if (unwatchedVideoIds.length === 0) {
        api.unsendMessage(loadingMessage.messageID);
        return api.sendMessage("something went wrong", event.threadID, null, event.messageID);
      }

      const randomVideoId = unwatchedVideoIds[Math.floor(Math.random() * unwatchedVideoIds.length)];

      this.sentVideos.push(randomVideoId);

      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${randomVideoId}&part=snippet,contentDetails`;
      const videoResponse = await axios.get(videoDetailsUrl);

      const videoInfo = videoResponse.data.items[0].snippet;
      const foundVideo = videoResponse.data.items[0];

      const randomVideoTitle = videoInfo.title;

      const stream = ytdl(randomVideoId, { filter: "audioandvideo" });
      const fileName = `${senderID}.mp4`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', () => {
        console.info('[DOWNLOADER]', `Downloading video: ${randomVideoTitle}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);

          api.unsendMessage(loadingMessage.messageID);
          return api.sendMessage('❌ | 𝗡𝗲𝘅𝘁 𝗧𝗿𝘆 𝗔𝗴𝗮𝗶𝗻 🥱', event.threadID, null, event.messageID);
        }

        const message = {
          body: `📹 | 𝗬𝗼𝘂𝗿 𝗩𝗶𝗱𝗲𝗼`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, null, event.messageID, () => {
          fs.unlinkSync(filePath);
        });

        setTimeout(() => {
          api.unsendMessage(loadingMessage.messageID);
        }, 10000);
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('An error occurred while processing the command.', event.threadID, null, event.messageID);
    }
  },
};