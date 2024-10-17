module.exports = async (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Environment variable for API key security
    const { message } = req.body;

    try {
        // Make a request to OpenAI API using the native fetch API
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

        // Parse the response from OpenAI
        const data = await openAIResponse.json();
        const botMessage = data.choices[0].message.content;

        // Send bot's response back to the frontend
        res.status(200).json({ response: botMessage });
    } catch (error) {
        console.error('Error in chatbot function:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
};
