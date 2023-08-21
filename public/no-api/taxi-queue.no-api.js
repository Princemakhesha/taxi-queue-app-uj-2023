document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'no-api-1.0',
			passengerQueue: 0,
			taxiQueue: 0,

			joinQueue() {
				this.passengerQueue++;

			},
			leaveQueue() {
				if (this.passengerQueue > 0) {
					this.passengerQueue--;
				}

			},

			joinTaxiQueue() {
				this.taxiQueue++;

			},

			queueLength() {
				return this.passengerQueue;


			},

			taxiQueueLength() {
				return this.taxiQueue;

			},

			taxiDepart() {
				if (this.passengerQueue >= 12 && this.taxiQueue > 0) {
					this.taxiQueue--;
					this.passengerQueue -= 12;
				}

			}
		}

	});

});