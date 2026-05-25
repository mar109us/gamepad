import { WebSocketServer } from "ws";
import { installNavigatorShim } from "gamepad-node";

installNavigatorShim();

const server = new WebSocketServer({ port: 8080 });
console.log("Starting server on 8080");

const lastButtonStates = {};

server.on("connection", (ws) => {
	console.log("Client connected");

	const interval = setInterval(() => {
		const gamepads = navigator.getGamepads();
		let anyControllerConnected = false;
		for (const gp of gamepads) {
			if (gp && gp.connected) {
				anyControllerConnected = true;
				if (!lastButtonStates[gp.index]) {
					lastButtonStates[gp.index] = [];
				}

				gp.buttons.forEach((button, index) => {
					const isPressed = button.pressed;
					if (isPressed) {
						console.log(`Gamepad ${gp.index} - Button ${index} pressed`);
						ws.send(
							JSON.stringify({ button: index, gamepadIndex: gp.index }),
						);
					}
					lastButtonStates[gp.index][index] = isPressed;
				});
			}
		}

		if (!anyControllerConnected) {
		}
	}, 16);

	ws.on("close", () => {
		clearInterval(interval);
		console.log("Client disconnected");
	});
});
