// Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US'; // Set language to English
recognition.interimResults = false; // Only capture final results
recognition.maxAlternatives = 1; // Single alternative for simplicity

// Function to start voice recognition
function startVoiceRecognition() {
    recognition.start();
}

// Process the result from speech recognition
recognition.addEventListener('result', (event) => {
    const spokenText = event.results[0][0].transcript;
    document.getElementById('user-input').value = spokenText; // Display recognized text in input field
    sendMessage(); // Send the recognized text as a message
});

recognition.addEventListener('error', (event) => {
    console.error('Speech recognition error:', event.error);
    alert('There was an error with voice recognition. Please try again.');
});

// Function to open the tutorial modal
function openTutorial() {
    document.getElementById('tutorial-modal').style.display = 'flex';
}

// Function to close the tutorial modal
function closeTutorial() {
    document.getElementById('tutorial-modal').style.display = 'none';
}

// Function to read the bot's response aloud
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language to English
    synth.speak(utterance);
}

// Function to send a message to the backend and display the response
async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatLog = document.getElementById('chat-log');
    const enableVoice = document.getElementById('enable-voice').checked; // Check if "Listen" option is enabled

    if (!userInput) return; // Prevent sending empty messages

    // Display the user's message
    chatLog.innerHTML += `<div class="user-message">${userInput}</div>`;
    document.getElementById('user-input').value = ''; // Clear input field

    try {
        // Send the message to the Vercel backend
        const response = await fetch('https://learnwgenglishtutor.vercel.app/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        
        // Parse response from backend
        if (response.ok) {
            const data = await response.json();
            const botResponse = data.response;
            
            // Display the bot's response
            chatLog.innerHTML += `<div class="bot-message">${botResponse}</div>`;

            // Optionally use text-to-speech for bot's response
            if (enableVoice) {
                speak(botResponse);
            }
        } else {
            throw new Error('Server returned an error');
        }
        
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = "Error connecting to the server. Please try again later.";
        chatLog.innerHTML += `<div class="bot-message">${errorMessage}</div>`;
        if (enableVoice) speak(errorMessage); // Optional: Use text-to-speech for error messages
    }

    // Scroll to the bottom of chat log after new message
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Function to set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
