import { WebSocketServer } from "ws";
import { installNavigatorShim } from "gamepad-node";

installNavigatorShim();

const server = new WebSocketServer({ port: 8080 });
console.log("Starting server on 8080");

// Same API as browsers
setInterval(() => {
	const gamepads = navigator.getGamepads();

	for (const gamepad of gamepads) {
		if (!gamepad) continue;

		if (gamepad.buttons[0].pressed) {
			console.log("A button pressed");
		}

		const leftStickX = gamepad.axes[0];
		const leftStickY = gamepad.axes[1];
	}
}, 16);
