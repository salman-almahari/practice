const socket = new WebSocket('ws://localhost:5501'); 
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 
}

socket.addEventListener('open', () => {
    appendMessage('Connected to the WebSocket server.');
});

socket.addEventListener('message', (event) => {
    appendMessage(`Server: ${event.data}`);
});

socket.addEventListener('close', () => {
    appendMessage('Disconnected from the WebSocket server.');
});

socket.addEventListener('error', (error) => {
    appendMessage('WebSocket error: Unable to connect.');
    console.error('WebSocket error:', error);
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        appendMessage(`You: ${message}`);
        messageInput.value = '';
    } else {
        appendMessage('Unable to send message. WebSocket is not open.');
    }
});
