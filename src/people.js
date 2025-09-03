// Fetching JSON data from a file
fetch("people.json")
	.then((response) => response.json())
	.then((data) => {
		// Use the fetched data to populate the DOM
		peopleData = data;
		displayPeople();
	})
	.catch((error) => console.error("Error loading the JSON file:", error));

function displayPeople() {
	// Get the container element where you want to append the people list
	const peopleList = document.getElementById("peopleList");

	// Iterate through the JSON data
	peopleData.forEach((person) => {
		// Create a container for each person
		const personDiv = document.createElement("div");
		personDiv.classList.add("person");

		// Create a name element (e.g., <h2>)
		const nameElement = document.createElement("h2");
		nameElement.textContent = person.name;

		// Create a title element (e.g., <p>)
		const titleElement = document.createElement("p");
		titleElement.textContent = person.title;

		// Append the name and title to the person container
		personDiv.appendChild(nameElement);
		personDiv.appendChild(titleElement);

		// Append the person container to the people list container
		peopleList.appendChild(personDiv);
	});
}
displayPeople();
