document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
			taxiQueueLength: 0,

			init() {
				this.queueLength();
				this.taxiQueueLength();
			},
			joinQueue() {
				axios
					.post('/api/passenger/join')
					.then(() => {
						this.queueLength();
					});
			},

			leaveQueue() {
				axios
					.post('/api/passenger/leave')
					.then(() => {
						this.queueLength();
					});
			},

			joinTaxiQueue() {
				axios
					.post('/api/taxi/join')
					.then(() => {
						this.taxiQueueLength();
					});
			},
			queueLength() {
				axios
					.get('/api/passenger/queue')
					.then(result => {
						this.queueLength = result.data.queueCount;
					});
			},
			taxiQueueLength() {
				axios
					.get('/api/taxi/queue')
					.then(result => {
						this.taxiQueueLength = result.data.queueCount;
					});
			},
			taxiDepart() {
				if (this.queueLength >= 12) {
					axios
						.post('/api/taxi/depart')
						.then(() => {
							this.taxiQueueLength();
							this.queueLength(); // Update people queue length after taxi departure
						});
				}
			}
		};
	});

});

