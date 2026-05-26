const socket = new WebSocket("ws://localhost:8080");
const output = document.getElementById("output");

socket.onmessage = (event) => {
	if (event.data == "[object Blob]") {
		output.innerText = ``;
	} else {
		output.innerText = `Pressed: ${event.data}`;
	}
};
