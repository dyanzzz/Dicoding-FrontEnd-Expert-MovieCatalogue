const WebSocketInitiator = {
	init(url) {
		const webSocket = new WebSocket(url);
		webSocket.onmessage = this._onMessageHandler;
	},

	_onMessageHandler(message) {
		console.log("##### Websocket => %s", message.data);
	},
};

export default WebSocketInitiator;