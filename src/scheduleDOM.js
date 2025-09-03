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

		if ("thursday" === orga.day) {
			thursday.appendChild(time);
			thursday.appendChild(titre);
			thursday.appendChild(text);
		}
		if ("friday" === orga.day) {
			friday.appendChild(time);
			friday.appendChild(titre);
			friday.appendChild(text);
		}
		if ("saturday" === orga.day) {
			saturday.appendChild(time);
			saturday.appendChild(titre);
			saturday.appendChild(text);
		}
		if ("sunday" === orga.day) {
			sunday.appendChild(time);
			sunday.appendChild(titre);
			sunday.appendChild(text);
		}
	});
}

function whichDay(day) {
	scheduleData.forEach((orga) => {
		if (day === orga.day) return true;
	});
}

displaySchedule();
