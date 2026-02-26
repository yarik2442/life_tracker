export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  const body = req.body;

  if (!body.message) {
    return res.status(200).send('No message');
  }

  const chatId = body.message.chat.id;
  const text = body.message.text;
  const firstName = body.message.from.first_name || 'друг';

  if (text && text.startsWith('/start')) {
    const token = process.env.BOT_TOKEN;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Привет, ${firstName}! 👋\n\nОткрой мини-апп по кнопке ниже:`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Открыть мини-апп',
                url: 'https://life-tracker-one-zeta.vercel.app'
              }
            ]
          ]
        }
      })
    });
  }

  return res.status(200).send('OK');
}