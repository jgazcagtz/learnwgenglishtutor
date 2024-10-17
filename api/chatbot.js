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
                messages: [
                    {
                        role: 'system',
                        content: 'You are an AI English tutor. Your role is to help users improve their English language skills by providing clear explanations, examples, and guidance on grammar, vocabulary, pronunciation, and conversation practice. Use simple language, offer detailed answers when asked about grammar or word usage, and encourage users to practice by asking follow-up questions. Correct any language mistakes politely and provide helpful feedback for learning.'
                    },
                    { role: 'user', content: message }
                ]
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
