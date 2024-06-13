const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
require('dotenv').config();

// Token bot dari environment atau variabel konfigurasi
const token = process.env.TELEGRAM_BOT_TOKEN;
// ID grup atau chat di Telegram
const chatId = process.env.TELEGRAM_CHAT_ID;

// Inisialisasi bot Telegram
const bot = new TelegramBot(token, { polling: true });

// Mendengarkan perintah dari grup atau chat
bot.onText(/\/upgrade/, (msg) => {
    const chatId = msg.chat.id;

    // Memproses perintah PHP
    exec('php /root/pet.php', (error, stdout, stderr) => {
        if (error) {
            console.error(`Kesalahan: ${error.message}`);
            bot.sendMessage(chatId, `Kesalahan: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            bot.sendMessage(chatId, `Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
        bot.sendMessage(chatId, `Perintah PHP berhasil dieksekusi: ${stdout}`);
    });
});

// Handle kesalahan koneksi
bot.on('polling_error', (error) => {
    console.error(`Kesalahan polling: ${error}`);
});

// Tampilkan pesan bahwa bot sudah siap
console.log('Bot Telegram sedang berjalan...');

