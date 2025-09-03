// Fetching JSON data from a file
fetch("people.json")
	.then((response) => response.json())
	.then((data) => {
		// Use the fetched data to populate the DOM
		peopleData = data;
		displayPeople();
	})
	.catch((error) => console.error("Error loading the JSON file:", error));
