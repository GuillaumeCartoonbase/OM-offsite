const stateMachine = "State Machine 1";

const riveInstance = new rive.Rive({
	src: "/assets/rive/bcg_om_offsite.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	isTouchScrollEnabled: true,
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
	onStateChange: onStateChangeHandler,
});

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	const inputs = riveInstance.stateMachineInputs(stateMachine);
}
// Handle the onStateChange event
function onStateChangeHandler(e) {
	// Custom logic for state change
	// console.log(e.data[0]); // Get curent timeline name
}
// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

// Events handling setup
const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	const eventKey = eventName;
	switch (eventKey) {
		// case "hoverEnter":
		// 	document.body.style.cursor = "pointer";
		// 	break;
		// case "hoverExit":
		// 	document.body.style.cursor = "auto";
		// 	break;

		case "arles":
			window.location.href = "/pages/info/arles.html";
			break;
		case "arts":
			window.location.href = "/pages/info/arts.html";
			break;
		case "baumaniere":
			window.location.href = "/pages/info/baumaniere-les-baux-de-provence.html";
			break;
		case "lumiere":
			window.location.href = "/pages/info/carrieres-des-lumieres.html";
			break;
		case "manville":
			window.location.href = "/pages/info/domaine-de-manville.html";
			break;
		case "food":
			window.location.href = "/pages/info/food.html";
			break;
		case "golf":
			window.location.href = "/pages/info/golf.html";
			break;
		case "beaux":
			window.location.href = "/pages/info/histoire-beaux-de-provence.html";
			break;
		case "olive":
			window.location.href = "/pages/info/oliveraie.html";
			break;
		case "ousteau":
			window.location.href = "/pages/info/ousteau-de-baumaniere.html";
			break;
		case "photo":
			window.location.href = "/pages/info/photographies-arles.html";
			break;
		case "remy":
			window.location.href = "/pages/info/saint-remy.html";
			break;
		case "trail":
			window.location.href = "/pages/info/trail.html";
			break;
		case "velo":
			window.location.href = "/pages/info/velo.html";
			break;
		case "wine":
			window.location.href = "/pages/info/wine.html";
			break;
		case "luma":
			window.location.href = "/pages/info/luma.html";
			break;
		default:
			// console.log(eventName);
			break;
	}
};

// Register the event handler
riveInstance.on(rive.EventType.RiveEvent, eventFire);
