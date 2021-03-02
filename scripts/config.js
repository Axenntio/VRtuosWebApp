config = {
	init() {
		this.midiInInterfaceSelector = document.getElementById("midiInInterface");
		this.midiOutInterfaceSelector = document.getElementById("midiOutInterface");
		this.ipAddressTextBox = document.getElementById("ipAddress");
		this.previousMidiIn = localStorage.getItem('midiIn');
		this.previousMidiOut = localStorage.getItem('midiOut');
		this.previousIpAddress = localStorage.getItem('ipAddress');
		this.ipAddressTextBox.addEventListener('input', this.ipAddressHandler);
	},

	getPreviousMidiIn() {
		return this.previousMidiIn;
	},

	getPreviousMidiOut() {
		return this.previousMidiOut;
	},

	getPreviousIpAddress() {
		return this.previousIpAddress;
	},

	updateForm() {
		midi.getInputs().forEach((input) => {
			this.midiInInterfaceSelector.add(
				this.createMidiOptionElement(input.id, input.name, input.state)
			);
			if (input.id == this.previousMidiIn) {
				this.midiInInterfaceSelector.value = this.previousMidiIn
			}
		})

		midi.getOutputs().forEach((output) => {
			this.midiOutInterfaceSelector.add(
				this.createMidiOptionElement(output.id, output.name, output.state)
			);
			if (output.id == this.previousMidiOut) {
				this.midiOutInterfaceSelector.value = this.previousMidiOut
			}
		})

		this.midiInInterfaceChanged();

		if (this.previousIpAddress !== null) {
			this.ipAddressTextBox.value = this.previousIpAddress
			client.setIp(this.previousIpAddress);
		}
	},

	createMidiOptionElement(id, name, state) {
		var optionElement = document.createElement("option")
		optionElement.text = name + ' (' + state + ')'
		optionElement.value = id
		return optionElement
	},

	midiInInterfaceChanged() {
		midi.setMidiInHandler(this.midiInInterfaceSelector.value);
		localStorage.setItem('midiIn', this.midiInInterfaceSelector.value);
	},
	
	midiOutInterfaceChanged() {
		midi.setMidiOutHandler(this.midiOutInterfaceSelector.value);		
		localStorage.setItem('midiOut', this.midiOutInterfaceSelector.value);
	},

	ipAddressHandler(item) {
		client.setIp(item.target.value);	
		localStorage.setItem('ipAddress', item.target.value);	
	}
}