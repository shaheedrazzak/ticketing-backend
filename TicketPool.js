class TicketPool {
    constructor(maxCapacity) {
        this.maxCapacity = maxCapacity;
        this.availableTickets = 0;
        this.lock = new Object(); // Lock for synchronization
    }

    // Method to add tickets to the pool
    addTickets(tickets) {
        if (this.availableTickets + tickets <= this.maxCapacity) {
            this.availableTickets += tickets;
            console.log(`Added ${tickets} tickets. Total tickets: ${this.availableTickets}`);
        } else {
            console.log('Cannot add more tickets, max capacity reached');
        }
    }

    // Method to remove tickets (simulating customer purchases)
    removeTickets(tickets) {
        if (this.availableTickets >= tickets) {
            this.availableTickets -= tickets;
            console.log(`Purchased ${tickets} tickets. Remaining tickets: ${this.availableTickets}`);
        } else {
            console.log('Not enough tickets available');
        }
    }

    // Getter to retrieve the available tickets
    getAvailableTickets() {
        return this.availableTickets;
    }
}

module.exports = TicketPool;
