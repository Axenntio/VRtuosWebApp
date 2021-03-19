const serverStates = {
	NOT_CONNECTED: ["not-connected", "Not connected"],
	CONNECTED: ["connected", "Connected!"],
	CONNECTING: ["connecting", "Connecting..."]
}

client = {
	init() {
		this.url = null
		this.websocket = null
		this.state = serverStates.NOT_CONNECTED
		this.connectionStateText = document.getElementById("connectionState")
		//this.connectButton = document.getElementById("connectButton")
		//this.connectButton.onclick = client.connect
	},

	connect() {
		this.setConnectionState(serverStates.CONNECTING)
		this.websocket = new WebSocket(this.url)
		this.websocket.binaryType = "arraybuffer"
		this.websocket.onopen = function (e) {
			client.setConnectionState(serverStates.CONNECTED)
		}
	
		this.websocket.onclose = function (e) {
			client.setConnectionState(serverStates.NOT_CONNECTED)
		}
	
		this.websocket.onmessage = function (e) {
			client.midiMessageHandler(new Uint8Array(e.data))
		}
	
		this.websocket.onerror = function (e) {
			console.error("Error: ", e.data)
		}
	},

	sendMessage(message) {
		this.websocket.send(message)
	},

	setConnectionState(state) {
		this.state = state
		this.connectionStateText.className = this.state[0]
		this.connectionStateText.innerHTML = this.state[1]
	},

	setIp(ipAddress) {
		this.url = "wss://" + ipAddress + ":42069"
	},

	midiMessageHandler(message) {
		midi.midiOutMessageHandler(message)
	},

	sendMidiMessage(message) {
		if (this.websocket !== null && this.websocket.readyState === WebSocket.OPEN) {
			this.websocket.send(message.data)
		}
	}
}