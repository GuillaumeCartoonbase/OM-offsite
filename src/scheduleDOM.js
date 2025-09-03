// Fetching JSON data from a file
fetch("src/schedule.json")
	.then((response) => response.json())
	.then((data) => {
		// Use the fetched data to populate the DOM
		scheduleData = data;
		displaySchedule();
	})
	.catch((error) => console.error("Error loading the JSON file:", error));

function displaySchedule() {
	const thursday = document.getElementById("thursday");
	const friday = document.getElementById("friday");
	const saturday = document.getElementById("saturday");
	const sunday = document.getElementById("sunday");

	scheduleData.forEach((orga) => {
		const time = document.createElement("h3");
		const titre = document.createElement("h4");
		const text = document.createElement("p");

		time.classList.add("time");
		time.textContent = orga.time;
		titre.textContent = orga.titre;
		text.textContent = orga.text;

		thursday.appendChild(time);
		thursday.appendChild(titre);
		thursday.appendChild(text);
	});
}

displaySchedule();
