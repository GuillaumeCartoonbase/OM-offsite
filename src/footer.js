document.addEventListener("DOMContentLoaded", function () {
	// Fetch footer content
	fetch("../footer.html")
		.then((response) => response.text())
		.then((data) => {
			// Inject footer HTML into the page
			document.querySelector("footer").innerHTML = data;

			// Now that footer is loaded, set the footer images
			setFooterImage();
		})
		.catch((error) => console.error("Error loading footer:", error));
});

// Function to set image source based on the current page
function setFooterImage() {
	const currentPage = window.location.pathname;
	const acceuilFooter = document.getElementById("accueilFooter");
	const carteFooter = document.getElementById("carteFooter");
	const participantsFooter = document.getElementById("participantsFooter");
	const programmeFooter = document.getElementById("programmeFooter");

	// Get the elements by their IDs
	// const acceuilImage = acceuilFooter.getElementsByTagName("img");
	// const carteImage = carteFooter.getElementsByTagName("img");
	// const participantsImage = participantsFooter.getElementsByTagName("img");
	// const programmeImage = programmeFooter.getElementsByTagName("img");

	// const accueilText = acceuilFooter.getElementsByTagName("p");
	// const carteText = carteFooter.getElementsByTagName("p");
	// const participantsText = participantsFooter.getElementsByTagName("p");
	// const programmeText = programmeFooter.getElementsByTagName("p");

	// Now check and add the selected class only to the active page
	if (currentPage.includes("index.html")) {
		accueilFooter.classList.add("selected");
		accueilFooter.classList.remove("notSelected");
		// acceuilImage.classList.add("selected");
		// accueilText.classList.add("selected");
		// acceuilImage.classList.remove("notSelected");
		// accueilText.classList.remove("notSelected");
	}

	if (currentPage.includes("carte.html")) {
		carteFooter.classList.add("selected");
		carteFooter.classList.remove("notSelected");
		// carteImage.classList.add("selected");
		// carteText.classList.add("selected");
		// carteImage.classList.remove("notSelected");
		// carteText.classList.remove("notSelected");
	}

	if (currentPage.includes("participants.html")) {
		participantsFooter.classList.add("selected");
		participantsFooter.classList.remove("notSelected");
		// participantsImage.classList.add("selected");
		// participantsText.classList.add("selected");
		// participantsImage.classList.remove("notSelected");
		// participantsText.classList.remove("notSelected");
	}

	if (currentPage.includes("progamme.html")) {
		programmeFooter.classList.add("selected");
		programmeFooter.classList.remove("notSelected");
		// programmeImage.classList.add("selected");
		// programmeText.classList.add("selected");
		// programmeImage.classList.remove("notSelected");
		// programmeText.classList.remove("notSelected");
	}
}
