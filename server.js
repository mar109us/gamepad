import { WebSocketServer } from "ws";
import { installNavigatorShim } from "gamepad-node";

installNavigatorShim();

const PORT = 8080;
const POLL_INTERVAL_MS = 16;

const log = {
	start: console.log(`Started on port ${PORT}`),
	connect: console.log("Client connected"),
	disconnect: console.log("Client disconnected"),
	noController: console.log("No controller connected"),
};

const server = new WebSocketServer({ port: PORT });

log.start;

server.on("connection", (clientSocket) => {
	log.connect;

	const checkGamepadInputs = () => {
		const activeGamepads = navigator.getGamepads();

		for (const gamepad of activeGamepads) {
			if (!gamepad?.connected) continue;
			processGamepadButtons(gamepad, clientSocket);
		}
		if (!activeGamepads) {
			log.noController;
		}
	};

	const pollingInterval = setInterval(checkGamepadInputs, POLL_INTERVAL_MS);

	clientSocket.on("close", () => {
		clearInterval(pollingInterval);
		log.disconnect;
	});
});

let loopsWithoutInputEvent = 0;

function processGamepadButtons(gamepad, clientSocket) {
	gamepad.buttons.forEach((button, buttonIndex) => {
		if (button.pressed) {
			loopsWithoutInputEvent = 0;
			clientSocket.send(buttonIndex);
			console.log(`Controller:${gamepad.index}\tButton:${buttonIndex}`);
		} else {
			isInactive(true);
		}
	});

	function isInactive(noInputEvent) {
		if (noInputEvent) {
			loopsWithoutInputEvent++;
		}

		if (loopsWithoutInputEvent >= 190) {
			clientSocket.send(null);
		}
	}
}
