import { WebSocketServer } from "ws";
import { installNavigatorShim } from "gamepad-node";

// Initialize the gamepad environment for Node.js
installNavigatorShim();

// Configuration Constants
const PORT = 8080;
const POLL_INTERVAL_MS = 16; // Roughly 60 frames per second - 16

const server = new WebSocketServer({ port: PORT });
console.log(`Gamepad server started on port ${PORT}`);

server.on("connection", (clientSocket) => {
	console.log("Client connected");

	// Core loop to poll gamepads and check for inputs
	const checkGamepadInputs = () => {
		const activeGamepads = navigator.getGamepads();

		for (const gamepad of activeGamepads) {
			if (!gamepad?.connected) continue;

			processGamepadButtons(gamepad, clientSocket);
		}
	};

	const pollingInterval = setInterval(checkGamepadInputs, POLL_INTERVAL_MS);

	// Cleanup on disconnection
	clientSocket.on("close", () => {
		clearInterval(pollingInterval);
		console.log("Client disconnected");
	});
});

function processGamepadButtons(gamepad, clientSocket) {
	gamepad.buttons.forEach((button, buttonIndex) => {
		if (!button.pressed) {
			clientSocket.send("none");
			return;
		} else {
			clientSocket.send(buttonIndex);
			console.log(
				`Gamepad ${gamepad.index} - Button ${buttonIndex} pressed`,
			);
		}
	});
}

/* node --watch server.js */
