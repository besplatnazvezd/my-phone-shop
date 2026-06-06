export default async function handler(req, res) {
    // Если это просто проверка в браузере
    if (req.method !== 'POST') {
        return res.status(200).send('Бот-анализатор успешно запущен на Vercel!');
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const body = req.body;

    // Проверяем, что пришло сообщение от пользователя
    if (body.message) {
        const chatId = body.message.chat.id;
        const text = body.message.text;

        if (text === '/start') {
            const webAppUrl = `https://${req.headers.host}`; // Автоматически берет URL твоего Vercel сайта
            
            const messageText = `👋 *Привет! Я твой персональный Telegram Анализатор.*\n\n` +
                                `Нажми на кнопку ниже, чтобы узнать возраст твоего аккаунта, ` +
                                `рассчитать твой ранг и сгенерировать уникальную неоновую карточку!`;

            // Отправляем сообщение с кнопкой Mini App
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [[
                            { text: "📊 Анализировать профиль", web_app: { url: webAppUrl } }
                        ]]
                    }
                })
            });
        }
    }

    return res.status(200).json({ ok: true });
}
