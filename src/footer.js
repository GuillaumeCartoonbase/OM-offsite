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

function setFooterImage() {
	const currentPage = window.location.pathname;
	const acceuilFooter = document.getElementById("accueilFooter");
	const carteFooter = document.getElementById("carteFooter");
	const participantsFooter = document.getElementById("participantsFooter");
	const programmeFooter = document.getElementById("programmeFooter");

	if (currentPage.includes("index.html")) {
		accueilFooter.classList.add("selected");
		accueilFooter.classList.remove("notSelected");
	}

	if (currentPage.includes("carte.html")) {
		carteFooter.classList.add("selected");
		carteFooter.classList.remove("notSelected");
	}

	if (currentPage.includes("participants.html")) {
		participantsFooter.classList.add("selected");
		participantsFooter.classList.remove("notSelected");
	}

	if (currentPage.includes("progamme.html")) {
		programmeFooter.classList.add("selected");
		programmeFooter.classList.remove("notSelected");
	}
}
