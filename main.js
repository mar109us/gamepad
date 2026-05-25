const socket = new WebSocket("ws://localhost:8080");
const output = document.getElementById("output");

socket.onmessage = (event) => {
	if (event.data === "none") {
		output.innerHTML = ``;
	} else {
		output.innerHTML = `Button Pressed: ${event.data}`;
	}
};
