const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const { message } = req.body;

    try {
        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await openAIResponse.json();
        const botMessage = data.choices[0].message.content;
        res.status(200).json({ response: botMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
};
