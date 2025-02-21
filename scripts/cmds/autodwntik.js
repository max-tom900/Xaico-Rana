const fs = require("fs-extra");
const axios = require("axios");
const ranaDownloader = require("rana-video-downloader");

module.exports = {
    threadStates: {},

    config: {
        name: 'autodwntik',
        version: '1.1',
        author: 'Kshitiz', // fixed by Rana
        countDown: 5,
        role: 0,
        shortDescription: 'auto video downloader',
        longDescription: '',
        category: 'media',
        guide: {
            en: '{p}{n}',
        }
    },

    onStart: async function ({ api, event }) {
        const threadID = event.threadID;

        if (!this.threadStates[threadID]) {
            this.threadStates[threadID] = {
                autoTikEnabled: false,
            };
        }

        if (event.body.toLowerCase().includes('autotik')) {
            if (event.body.toLowerCase().includes('on')) {
                this.threadStates[threadID].autoTikEnabled = true;
                api.sendMessage("AutoTik is now ON.", event.threadID, event.messageID);
            } else if (event.body.toLowerCase().includes('off')) {
                this.threadStates[threadID].autoTikEnabled = false;
                api.sendMessage("AutoTik is now OFF.", event.threadID, event.messageID);
            } else {
                api.sendMessage("Type 'autotik on' to turn on and\n'autotik off' to turn off.", event.threadID, event.messageID);
            }
        }
    },

    onChat: async function ({ api, event }) {
        const threadID = event.threadID;

        if (this.threadStates[threadID] && this.threadStates[threadID].autoTikEnabled && this.checkLink(event.body)) {
            const { url } = this.checkLink(event.body);
            this.downLoad(url, api, event);
            api.setMessageReaction("💐", event.messageID, (err) => {}, true);
        }
    },

    downLoad: async function (url, api, event) {
        try {
            const time = Date.now();
            const path = `${__dirname}/cache/${time}.mp4`;

            const res = await ranaDownloader.tiktok(url);
            if (!res || !res.videoUrl) {
                return api.sendMessage("Failed to fetch the video.", event.threadID, event.messageID);
            }

            const videoData = await axios.get(res.videoUrl, { responseType: "arraybuffer" });
            fs.writeFileSync(path, Buffer.from(videoData.data));

            if (fs.statSync(path).size / 1024 / 1024 > 25) {
                return api.sendMessage("The file is too large, cannot be sent.", event.threadID, () => fs.unlinkSync(path), event.messageID);
            }

            api.sendMessage({
                body: "Successful Download!",
                attachment: fs.createReadStream(path)
            }, event.threadID, () => fs.unlinkSync(path), event.messageID);

        } catch (error) {
            console.error(error);
            api.sendMessage("An error occurred while downloading the video.", event.threadID, event.messageID);
        }
    },

    checkLink: function (url) {
        if (url.includes("tiktok")) {
            return { url: url };
        }
        return null;
    }
};
