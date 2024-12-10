const TicketPool = require('./TicketPool');

class Customer {
    constructor(ticketPool, retrievalInterval) {
        this.ticketPool = ticketPool;
        this.retrievalInterval = retrievalInterval;
    }

    start() {
        setInterval(() => {
            this.ticketPool.removeTickets(1);
        }, this.retrievalInterval);
    }
}

module.exports = Customer;
