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
				this.createMidiOptionElement(input.id, input.name, input.state)
			)
			if (input.id == this.previousMidiIn) {
				this.midiInInterfaceSelector.value = this.previousMidiIn
			}
		})

		midi.getOutputs().forEach((output) => {
			this.midiOutInterfaceSelector.add(
				this.createMidiOptionElement(output.id, output.name, output.state)
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

	createMidiOptionElement(id, name, state) {
		var optionElement = document.createElement('option')
		optionElement.text = name
		optionElement.value = id
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