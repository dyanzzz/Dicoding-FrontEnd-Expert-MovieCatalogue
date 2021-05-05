import NotificationHelper from "./notification-helper";
import CONFIG from '../globals/config';

const WebSocketInitiator = {
	init(url) {
		const webSocket = new WebSocket(url);
		webSocket.onmessage = this._onMessageHandler;
	},

	_onMessageHandler(message) {
		console.log("##### Websocket => %o", JSON.parse(message.data));
		
		// Implementation Notification using websocket
		const movie = JSON.parse(message.data);
    NotificationHelper.sendNotification({
			title: `${movie.title} is on cinema!`,
			options: {
				body: movie.overview,
        icon: CONFIG.BASE_IMAGE_URL + movie.poster_path,
			},
		});
	},
};

export default WebSocketInitiator;