utils = {
	init() {
	fetch('https://vrtuos.eu/MOTD.html')
		.then(response => response.json())
		.then(data => console.log(data));
	}

}