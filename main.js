const socket = new WebSocket("ws://localhost:8080");
const output = document.getElementById("output");

socket.onmessage = (event) => {
	const data = JSON.parse(event.data);

	if (data.button >= 0) {
		output.innerHTML = `${data.button}`;
	}
	if (!data.button) {
		output.innerHTML = `no button`;
	}
};
