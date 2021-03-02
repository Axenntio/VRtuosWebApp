midi = {
	init() {
		this.midiInterface = "chibre"
		if (navigator.requestMIDIAccess) {
			console.log('This browser supports WebMIDI!')
		}
		else {
			console.log('WebMIDI is not supported in this browser, let\'s put a pop-up for user')
		}
		navigator
			.requestMIDIAccess()
			.then(this.onMidiSuccess, this.onMidiFailure)
	},

	onMidiFailure() {
		console.log('Could not access your MIDI devices.')
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
		this.midiInterface.outputs.forEach((output) => {
			//?
			if (output.id == id) {
				//?
			}
		})
	},

	midiInMessageHandler(message) {
		client.sendMidiMessage(message)
		keyboard.midiInMessageHandler(message)
	},

	midiOutMessageHandler(message) {
		keyboard.midioutMessageHandler(message)
	},

	getInputs() {
		return this.midiInterface.inputs
	},

	getOutputs() {
		return this.midiInterface.outputs
	}
}