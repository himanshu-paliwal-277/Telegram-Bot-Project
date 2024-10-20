const axios = require('axios');
const dotenv = require('dotenv');
const TelegramBot = require('node-telegram-bot-api');
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    console.log("msg " + msg.text);
    bot.sendMessage(chatId, "You said: " + msg.text);
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can I help you?");
});

bot.onText(/\/joke/, async (msg) => {
    const chatId = msg.chat.id;
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const { setup, punchline } = response.data;

        bot.sendMessage(chatId, `Here's your joke: ${setup} 😆 ${punchline}`);
    } catch (error) {
        console.error("Error fetching joke: ", error);
        bot.sendMessage(chatId, "Oops! I couldn't fetch a joke right now. Please try again later.");
    }
})