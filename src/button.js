const carteButton = document.getElementById("carteButton");
const participantsButton = document.getElementById("participantsButton");
const programmeButton = document.getElementById("programmeButton");

carteButton.addEventListener("click", function () {
	window.location.href = "carte.html";
});

participantsButton.addEventListener("click", function () {
	window.location.href = "participants.html";
});
programmeButton.addEventListener("click", function () {
	window.location.href = "programme.html";
});
