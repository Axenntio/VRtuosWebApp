midi = {
	init() {
		this.selectedMidiOuputInterface = null;
		this.midiInterface = null;
		if (undefined == navigator.requestMIDIAccess) {
			document.getElementById("errorMidiApi").classList.add("active")	
		}
		navigator
			.requestMIDIAccess()
			.then(this.onMidiSuccess, this.onMidiFailure)
	},

	onMidiFailure() {
		alert('Could not access your MIDI devices. Please try to refresh the page, if the problem still occurs, please contact support.')
	},

	onMidiSuccess(midiAccess) {
		this.midi.midiInterface = midiAccess
		config.updateForm()
	},

	setMidiInHandler(id) {
		this.midiInterface.inputs.forEach((input) => {
			input.onmidimessage = null
			if (input.id == id) {
				input.onmidimessage = this.midiInMessageHandler
			}
		})
	},

	setMidiOutHandler(id) {
		this.selectedMidiOuput = null;
		this.midiInterface.outputs.forEach((output) => {
			if (output.id == id) {
				this.selectedMidiOuputInterface = output
			}
		})
	},

	midiInMessageHandler(message) {
		client.sendMidiMessage(message)
		keyboard.midiInMessageHandler(message)
	},

	midiOutMessageHandler(message) {
		if (this.selectedMidiOuputInterface !== null) {
			this.selectedMidiOuputInterface.send(message);
		}
		keyboard.midiOutMessageHandler(message)
	},

	getInputs() {
		return this.midiInterface.inputs
	},

	getOutputs() {
		return this.midiInterface.outputs
	}
}