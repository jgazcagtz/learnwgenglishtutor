// Open and close tutorial modal
function openTutorial() {
    document.getElementById('tutorial-modal').style.display = 'flex';
}

function closeTutorial() {
    document.getElementById('tutorial-modal').style.display = 'none';
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatLog = document.getElementById('chat-log');

    if (!userInput) return;

    // Display user's message
    chatLog.innerHTML += `<div class="user-message">${userInput}</div>`;
    document.getElementById('user-input').value = ''; // Clear input

    try {
        const response = await fetch('https://placeholder-url.vercel.app/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        const data = await response.json();

        // Display bot's response
        chatLog.innerHTML += `<div class="bot-message">${data.response}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatLog.innerHTML += `<div class="bot-message">Error connecting to the server.</div>`;
    }
}

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
