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

	if (currentPage.includes("index.html"))
		return acceuilImage.classList
			.add("selected")
			.classList.remove("notSelected");
	if (currentPage.includes("carte.html"))
		return carteImage.classList.add("selected").classList.remove("notSelected");
	if (currentPage.includes("participants.html"))
		return participantsImage.classList
			.add("selected")
			.classList.remove("notSelected");
	if (currentPage.includes("progamme.html"))
		return programmeImage.classList
			.add("selected")
			.classList.remove("notSelected");
}
