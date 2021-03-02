keyboard = {
	midiMessageHandler(midiMessage) {
		let command = midiMessage.data[0];
		let note = midiMessage.data[1];
		let velocity = (midiMessage.data.length > 2) ? midiMessage.data[2] : 0;

		if (note >= 21  && note <= 112) {
			var keyboardNote = document.getElementById("key-" + (note - 21));
		}
	
		switch (command) {
			case 144: // note on
				if (velocity > 0) {
					keyboardNote.classList.add("midi-in");
				} else {
					keyboardNote.classList.remove("midi-in");
				}
				break;
	
			case 128: // note off
				keyboardNote.classList.remove("midi-in");
				break;
			
			default:
				console.log(midiMessage);
		}
	}
}