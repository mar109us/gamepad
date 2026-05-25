const socket = new WebSocket("ws://localhost:8080");
const output = document.getElementById("output");

socket.onmessage = (event) => {
	const data = JSON.parse(event.data);

	if (socket.onmessage.length > 0) {
		output.innerHTML = `${data.button}`;
		console.log(socket);
	} 
	if (socket.onmessage.length === 0) {
		console.log("none");
	}

	/* 	if (!event) {
		output.innerHTML = `no button`;
		
	} */
};
