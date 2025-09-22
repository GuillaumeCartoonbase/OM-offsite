let peopleData = [];
// Fetching JSON data from a file
fetch("src/people.json")
	.then((response) => response.json())
	.then((data) => {
		// Sort the data alphabetically by person's name
		peopleData = data.sort((a, b) => a.name.localeCompare(b.name));

		displayPeople();
	})
	.catch((error) => console.error("Error loading the JSON file:", error));

// helper: make a safe id from a name
function slugify(str) {
	return String(str)
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // drop accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-") // spaces & punctuation -> -
		.replace(/^-+|-+$/g, ""); // trim leading/trailing -
}

function displayPeople() {
	const peopleList = document.getElementById("peopleList");
	peopleList.innerHTML = "";

	// Keep track to avoid duplicate ids
	const usedIds = new Set();

	peopleData.forEach((person, idx) => {
		const personDiv = document.createElement("div");
		personDiv.classList.add("person");

		const photoElement = document.createElement("img");
		photoElement.src = person.photoURL || "";
		photoElement.alt = person.name || "Photo";

		const nameElement = document.createElement("h2");
		nameElement.textContent = person.name;

		// assign a stable, unique id to the photo
		let baseId = slugify(person.name || `person-${idx}`);
		let uniqueId = baseId;
		let n = 2;
		while (usedIds.has(uniqueId)) uniqueId = `${baseId}-${n++}`;
		usedIds.add(uniqueId);
		photoElement.id = uniqueId;

		const titleElement = document.createElement("p");
		if (person.title && person.title.toLowerCase() !== "so") {
			titleElement.textContent = person.title;
		}

		const soElement = document.createElement("p");
		if (person.so && person.so.toLowerCase() !== "n/a") {
			soElement.append("SO de ");
			const soLink = document.createElement("a");
			soLink.textContent = person.so;
			soLink.href = `#${slugify(person.so)}`; // must match the target's id
			soElement.appendChild(soLink);
		}

		personDiv.append(photoElement, nameElement, titleElement, soElement);
		peopleList.appendChild(personDiv);
	});
}

displayPeople();
