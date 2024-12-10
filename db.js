const sqlite3 = require('sqlite3').verbose();

// Open or create the database
const db = new sqlite3.Database('./ticketing_system.db', (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Database connected');
    }
});

// Create table for ticket data if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    availableTickets INTEGER,
    maxCapacity INTEGER
  )`);

    // Insert initial values if the table is empty
    db.get('SELECT COUNT(*) AS count FROM tickets', (err, row) => {
        if (row.count === 0) {
            db.run('INSERT INTO tickets (availableTickets, maxCapacity) VALUES (?, ?)', [100, 200], (err) => {
                if (err) {
                    console.error('Error inserting initial data:', err);
                } else {
                    console.log('Initial data inserted into tickets table');
                }
            });
        }
    });
});

// Get ticket data from the database
const getTicketData = (callback) => {
    db.get('SELECT * FROM tickets WHERE id = 1', (err, row) => {
        if (err) {
            console.error('Error retrieving data:', err);
        } else {
            callback(row);
        }
    });
};

// Update ticket data in the database
const updateTicketData = (availableTickets, maxCapacity, callback) => {
    db.run('UPDATE tickets SET availableTickets = ?, maxCapacity = ? WHERE id = 1', [availableTickets, maxCapacity], (err) => {
        if (err) {
            console.error('Error updating data:', err);
        } else {
            callback();
        }
    });
};

module.exports = { getTicketData, updateTicketData };

