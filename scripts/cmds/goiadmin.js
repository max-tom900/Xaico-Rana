module.exports = {
    config: {
        name: "goiadmin",
        author: "RANA", //Don't change the credit because I made it. Any problems to contact me. https://facebook.com/100063487970328
        role: 0,
        shortDescription: " ",
        longDescription: "",
        category: "BOT",
        guide: "{pn}"
    },

    onChat: function({ api, event }) {
        if (event.senderID !== "100063487970328") {
            var aid = ["100063487970328"];
            for (const id of aid) {
                if (Object.keys(event.mentions).includes(id)) {
                    var msg = [
                        "📌 রানা বস এখন বিজি, আমি তো এখন সিনেমা দেখছি! আপনি আপনার কাজে ব্যস্ত হন যান ? 😏🍿",
                        "মিনশন না দিয়ে সিংগেল রানা কে একটা গফ দে 😒😏...!",
                        "Mantion না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্সে চলে আয়, প্রেমের ঝামেলা ছাড়াই মজা করি 😏💕",
                        "😾 প্রেম করতে চাইলে রানা বস এর ইনবক্সে চোলে যাও গ্রুপে ডেকে লাভ নেই 🥵📸",
                        "এতো মেনশন কেন ! রানা কে মেনশন ছাড়া প্যাঁচাল শুরু করেন! 😆🔥",
                        " ডাকিস না, রানা বস প্রচুর বিজি 😷🤔",
                        "কেন ডিস্টার্ব করছো, রানা বস তো বলল, কাজের সময় তাকে ডিস্টার্ব না করতে 😞 অন্যথায় কাজের শেষে তোমাকে ধুয়ে দিবে! 😂",
                        "বস তো সবকিছু পারে, কিন্তু মেনশন করা আমার পছন্দ নয়। তুমি জানো তো, আমি রোবট, একটু সময় নেবো! 🤖💬",
                        "যে কাজের জন্য মেনশন করলে কিছু লাভ হবে না, সেই কাজটাই আবার শুরু করতে যাচ্ছো? 😝 মজা না, স্যরি! 🤭"
                    ];
                    return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
                }
            }
        }
    },
    onStart: async function({}) {
    }
};
