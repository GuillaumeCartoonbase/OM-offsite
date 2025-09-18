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

function displayPeople() {
	// Get the container element where you want to append the people list
	const peopleList = document.getElementById("peopleList");

	// Clear any existing content in the list (in case you're re-displaying)
	peopleList.innerHTML = "";

	// Iterate through the sorted JSON data
	peopleData.forEach((person) => {
		// Create a container for each person
		const personDiv = document.createElement("div");
		personDiv.classList.add("person");

		// Create the photo element (if available)
		const photoElement = document.createElement("img");
		photoElement.src = person.photoURL;

		// Create a name element (e.g., <h2>)
		const nameElement = document.createElement("h2");
		nameElement.textContent = person.name;

		// Create a title element (e.g., <p>)
		const titleElement = document.createElement("p");
		person.title.toLowerCase() != "so"
			? (titleElement.textContent = person.title)
			: "";

		const soElement = document.createElement("p");

		person.so ? (soElement.textContent = `SO de ${person.so}`) : "";

		// Append the name, title, and photo to the person container
		personDiv.appendChild(photoElement);
		personDiv.appendChild(nameElement);
		personDiv.appendChild(titleElement);
		personDiv.appendChild(soElement);

		// Append the person container to the people list container
		peopleList.appendChild(personDiv);
	});
}
displayPeople();
