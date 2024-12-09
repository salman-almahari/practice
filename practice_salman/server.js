const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 5501 });

console.log('WebSocket server is running on ws://localhost:5501');

server.on('connection', (socket) => {
    console.log('Client connected.');
    socket.send('Welcome to the WebSocket server!');
    
    socket.on('message', (message) => {
        console.log('Received:', message);
        socket.send(`You said: ${message}`);
    });

    socket.on('close', () => {
        console.log('Client disconnected.');
    });
});
