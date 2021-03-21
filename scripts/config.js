config = {
	init() {
		this.midiInInterfaceSelector = document.getElementById('midiInInterface')
		this.midiOutInterfaceSelector = document.getElementById('midiOutInterface')
		this.ipAddressTextBox = document.getElementById('ipAddress')
		this.keyboardLoopbackCheckbox = document.getElementById('keyboardLoopback')
		this.previousMidiIn = localStorage.getItem('midiIn')
		this.previousMidiOut = localStorage.getItem('midiOut')
		this.previousIpAddress = localStorage.getItem('ipAddress')
		this.previousKeyboardLoopback = localStorage.getItem('keyboardLoopback')
		this.ipAddressTextBox.addEventListener('input', this.ipAddressHandler)

		fetch('http://localhost:8080/ip/')
			.then(response => response.json())
			.then(data => {
				if (data.length > 0) {
					let ip = data[0].localIp
					this.ipAddressTextBox.value = ip
					client.setIp(ip)
					client.connect()
				}
			})
	},

	getPreviousMidiIn() {
		return this.previousMidiIn
	},

	getPreviousMidiOut() {
		return this.previousMidiOut
	},

	getPreviousIpAddress() {
		return this.previousIpAddress
	},

	getPreviousKeyboardLoopback() {
		return ('true' == this.previousKeyboardLoopback)
	},

	updateForm() {
		midi.getInputs().forEach((input) => {
			this.midiInInterfaceSelector.add(
				this.createOptionElement(input.id, input.name)
			)
			if (input.id == this.previousMidiIn) {
				this.midiInInterfaceSelector.value = this.previousMidiIn
			}
		})

		midi.getOutputs().forEach((output) => {
			this.midiOutInterfaceSelector.add(
				this.createOptionElement(output.id, output.name)
			)
			if (output.id == this.previousMidiOut) {
				this.midiOutInterfaceSelector.value = this.previousMidiOut
			}
		})

		this.midiInInterfaceChanged()
		this.midiOutInterfaceChanged()

		if (this.previousIpAddress !== null) {
			this.ipAddressTextBox.value = this.previousIpAddress
			client.setIp(this.previousIpAddress)
		}

		if (this.previousKeyboardLoopback !== null) {
			// Some magic there, localStorage is in string so no boolean checks 
			this.keyboardLoopbackCheckbox.checked = ('true' === this.previousKeyboardLoopback)
		}

		this.keyboardLoopbackStateChanged();
	},

	createOptionElement(value, text) {
		var optionElement = document.createElement("option")
		optionElement.text = text
		optionElement.value = value
		return optionElement
	},

	midiInInterfaceChanged() {
		midi.setMidiInHandler(this.midiInInterfaceSelector.value)
		if ('none' != this.midiInInterfaceSelector.value) {
			localStorage.setItem('midiIn', this.midiInInterfaceSelector.value)
		}
	},
	
	midiOutInterfaceChanged() {
		midi.setMidiOutHandler(this.midiOutInterfaceSelector.value)
		if ('none' != this.midiInInterfaceSelector.value) {
			localStorage.setItem('midiOut', this.midiOutInterfaceSelector.value)
		}
	},

	keyboardLoopbackStateChanged() {
		localStorage.setItem('keyboardLoopback', this.keyboardLoopbackCheckbox.checked)
	},

	ipAddressHandler(item) {
		client.setIp(item.target.value)
		localStorage.setItem('ipAddress', item.target.value)
	},

	isLoopBacked() {
		return this.keyboardLoopbackCheckbox.checked
	}
}