const messageType = {
	MIDI_IN: "midi-in",
	MIDI_OUT: "midi-out"
}

keyboard = {
	midiInMessageHandler(midiMessage) {
		this.midiMessageHandler(midiMessage, messageType.MIDI_IN)
	},

	midiOutMessageHandler(midiMessage) {
		this.midiMessageHandler(midiMessage, messageType.MIDI_OUT)
	},

	midiMessageHandler(midiMessage, from) {
		let command = midiMessage.data[0]
		let note = midiMessage.data[1]
		let velocity = (midiMessage.data.length > 2) ? midiMessage.data[2] : 0

		if (note >= 21  && note <= 112) {
			var keyboardNote = document.getElementById("key-" + (note - 21))
		}
	
		switch (command) {
			case 144: // note on
				if (velocity > 0) {
					keyboardNote.classList.add(from)
				} else {
					keyboardNote.classList.remove(from)
				}
				break;
	
			case 128: // note off
				keyboardNote.classList.remove(from)
				break;
			
			default:
				console.log(midiMessage);
		}
	}
}