// Function to open the tutorial modal
function openTutorial() {
    document.getElementById('tutorial-modal').style.display = 'flex';
}

// Function to close the tutorial modal
function closeTutorial() {
    document.getElementById('tutorial-modal').style.display = 'none';
}

// Function to send a message to the backend and display the response
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatLog = document.getElementById('chat-log');

    if (!userInput) return; // Prevent sending empty messages

    // Display the user's message
    chatLog.innerHTML += `<div class="user-message">${userInput}</div>`;
    document.getElementById('user-input').value = ''; // Clear input

    try {
        // Send the message to the Vercel backend
        const response = await fetch('https://learnwgenglishtutor.vercel.app/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();

        // Display the bot's response
        chatLog.innerHTML += `<div class="bot-message">${data.response}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom
    } catch (error) {
        console.error('Error:', error);
        chatLog.innerHTML += `<div class="bot-message">Error connecting to the server. Please try again later.</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    }
}

// Function to set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
