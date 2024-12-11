const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();

app.use(cors());

let availableTickets = 0;
let maxCapacity = 200;
let soldTickets = 0;

// Create WebSocket server with noServer option for manual upgrade
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    // Send initial data to the client
    ws.send(JSON.stringify({
        type: 'init',
        availableTickets: 0,
        maxCapacity: 200,
        soldTickets: 0,
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'add') {
                const ticketsToAdd = data.tickets;
                if (availableTickets + ticketsToAdd <= maxCapacity) {
                    availableTickets += ticketsToAdd;
                    console.log(`Added ${ticketsToAdd} tickets. Total available: ${availableTickets}`);
                } else {
                    console.log('Cannot add tickets. Max capacity reached.');
                }
            } else if (data.type === 'purchase') {
                const ticketsToBuy = data.tickets;
                if (availableTickets >= ticketsToBuy) {
                    availableTickets -= ticketsToBuy;
                    soldTickets += ticketsToBuy;
                    console.log(`Purchased ${ticketsToBuy} tickets. Remaining: ${availableTickets}, Sold: ${soldTickets}`);
                } else {
                    console.log('Not enough tickets available.');
                }
            }

            // Broadcast updated data to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'update',
                        availableTickets,
                        maxCapacity,
                        soldTickets,
                    }));
                }
            });
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});


app.get('/', (req, res) => {
    res.send('WebSocket server is running!');
});

const PORT = process.env.PORT || 4000;

// Start the HTTP server
app.server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handling WebSocket upgrade manually
app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
