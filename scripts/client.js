const serverStates = {
	NOT_CONNECTED: "Not connected",
	CONNECTED: "Connected!",
	CONNECTING: "Connecting..."
}

client = {
	init() {
		this.url = null;
		this.websocket = null;
		this.state = serverStates.NOT_CONNECTED;
		this.connectionStateText = document.getElementById("connectionState");
		//this.connectButton = document.getElementById("connectButton");
		//this.connectButton.onclick = client.connect;
	},

	connect() {
		this.state = serverStates.CONNECTING;
		this.connectionStateText.innerHTML = this.state;
		this.websocket = new WebSocket(this.url)
		this.websocket.onopen = function (e) {
			console.log("Connected");
		};
	
		this.websocket.onclose = function (e) {
			console.log("Disconnected");
		};
	
		this.websocket.onmessage = function (e) {
			console.log("Get:", e.data);
		};
	
		this.websocket.onerror = function (e) {
			console.log("Error: ", e.data);
		};
	},

	sendMessage(message) {
		this.websocket.send(message);
	},

	setIp(ipAddress) {
		this.url = "ws://" + ipAddress;
	}
}