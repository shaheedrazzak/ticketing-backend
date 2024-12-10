const TicketPool = require('./TicketPool');

class Vendor {
    constructor(ticketPool, ticketsPerRelease, releaseInterval) {
        this.ticketPool = ticketPool;
        this.ticketsPerRelease = ticketsPerRelease;
        this.releaseInterval = releaseInterval;
    }

    start() {
        setInterval(() => {
            this.ticketPool.addTickets(this.ticketsPerRelease);
        }, this.releaseInterval);
    }
}

module.exports = Vendor;
