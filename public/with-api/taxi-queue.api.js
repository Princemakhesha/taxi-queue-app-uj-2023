document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
			init() {
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength = result.data.queueCount
					});
			},
			joinQueue() {

			},
			leaveQueue() {

			},

			joinTaxiQueue() {

			},

			queueLength() {

			},

			taxiQueueLength() {

			},

			taxiDepart() {

			}
		}
	});

});