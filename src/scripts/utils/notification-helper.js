const NotificationHelper = {
	sendNotification({ title, options }) {
		// check availability
		if(!this._checkAvailability()) {
			console.log('##### => Notification not supported in this browser');
			return;
		}

		// check permission. if not granted, send request
		if(!this._checkPermission()){
			console.log('##### => User did not yet granted permission');
			this._requestPermission();
			return;
		}

		// show notification
		this._showNotification({ title, options });

	},

	_checkAvailability() {
		return !!('Notification' in window);
	},

	_checkPermission() {
		return Notification.permission === 'granted';
	},

	async _requestPermission() {
		const status = await Notification.requestPermission();

		if(status === 'denied'){
			console.log('##### => Notification Denied');
		}

		if(status === 'default'){
			console.log('##### => Permission closed');
		}
		
		if(status === 'granted'){
			console.log('##### => Permission granted');
		}

	},

	async _showNotification({ title, options }) {
		console.log("##### => show notification");
		
		const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    serviceWorkerRegistration.showNotification(title, options);
	},

};

export default NotificationHelper;