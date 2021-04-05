const messageType = {
	MIDI_IN: 'midi-in',
	MIDI_OUT: 'midi-out'
}

keyboard = {
	midiInMessageHandler(midiMessage) {
		this.midiMessageHandler(midiMessage, messageType.MIDI_IN)
	},

	midiOutMessageHandler(midiMessage) {
		midiMessage.data = midiMessage;
		this.midiMessageHandler(midiMessage, messageType.MIDI_OUT)
	},

	midiMessageHandler(midiMessage, from) {
		let command = midiMessage.data[0]
		let note = midiMessage.data[1]
		let velocity = (midiMessage.data.length > 2) ? midiMessage.data[2] : 0

		if (note >= 21  && note <= 112) {
			var keyboardNote = document.getElementById('key-' + (note - 21))
		}
	
		switch (command) {
			case 128: // note off
			case 129:
			case 130:
			case 131:
			case 132:
			case 133:
			case 134:
			case 135:
			case 136:
			case 137:
			case 138:
			case 139:
			case 140:
			case 141:
			case 142:
			case 143:
				keyboardNote.classList.remove(from)
				break;

			case 144: // note on
			case 145:
			case 146:
			case 147:
			case 148:
			case 149:
			case 150:
			case 151:
			case 152:
			case 153:
			case 154:
			case 155:
			case 156:
			case 157:
			case 158:
			case 159:
				if (velocity > 0) {
					keyboardNote.classList.add(from)
				} else {
					keyboardNote.classList.remove(from)
				}
				break;
			
			default:
				console.log(midiMessage);
		}
	}
}