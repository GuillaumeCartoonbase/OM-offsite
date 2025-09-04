document.addEventListener("DOMContentLoaded", function () {
	fetch("../footer.html")
		.then((response) => response.text())
		.then((data) => {
			document.querySelector("footer").innerHTML = data;
			setFooterImage();
		})
		.catch((error) => console.error("Error loading footer:", error));
});

// Function to set image source based on the current page
function setFooterImage() {
	const currentPage = window.location.pathname;

	const acceuilImage = document.getElementById("accueilPicto");
	const carteImage = document.getElementById("cartePicto");
	const participantsImage = document.getElementById("participantsPicto");
	const programmeImage = document.getElementById("programmePicto");

	const accueilText = document.getElementById("accueilText");
	const carteText = document.getElementById("carteText");
	const participantsText = document.getElementById("participantsText");
	const progammeText = document.getElementById("progammeText");

	if (currentPage.includes("index.html")) {
		acceuilImage.classList.add("selected");
		acceuilImage.classList.remove("notSelected");
		accueilText.classList.add("selected");
		accueilText.classList.remove("notSelected");
	} else {
		acceuilImage.classList.remove("selected");
		acceuilImage.classList.add("notSelected");
	}

	if (currentPage.includes("carte.html")) {
		carteImage.classList.add("selected");
		carteImage.classList.remove("notSelected");
		carteText.classList.add("selected");
		carteText.classList.remove("notSelected");
	} else {
		carteImage.classList.remove("selected");
		carteImage.classList.add("notSelected");
	}

	if (currentPage.includes("participants.html")) {
		participantsImage.classList.add("selected");
		participantsImage.classList.remove("notSelected");
		participantsText.classList.add("selected");
		participantsText.classList.remove("notSelected");
	} else {
		participantsImage.classList.remove("selected");
		participantsImage.classList.add("notSelected");
	}

	if (currentPage.includes("progamme.html")) {
		programmeImage.classList.add("selected");
		programmeImage.classList.remove("notSelected");
		progammeText.classList.add("selected");
		progammeText.classList.remove("notSelected");
	} else {
		programmeImage.classList.remove("selected");
		programmeImage.classList.add("notSelected");
	}
}
