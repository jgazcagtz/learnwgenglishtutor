// Import the fetch function (not needed if you use Vercel's built-in fetch)
const fetch = require('node-fetch'); 

module.exports = async (req, res) => {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Environment variable to store API key securely
    const { message } = req.body; // Extract message from the request body

    try {
        // Make a request to OpenAI API
        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // Model selection
                messages: [{ role: 'user', content: message }]
            })
        });

        // Parse the response from OpenAI API
        const data = await openAIResponse.json();
        const botMessage = data.choices[0].message.content; // Get the bot's response

        // Return the bot's response back to the frontend
        res.status(200).json({ response: botMessage });
    } catch (error) {
        // Handle and log errors
        console.error('Error in chatbot function:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
};
