let scheduleData = [];
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
		const li = document.createElement("li");
		const time = document.createElement("h3");
		const titre = document.createElement("h4");
		const text = document.createElement("p");

		time.classList.add("schedule");
		titre.classList.add("schedTitle");
		text.classList.add("schedText");

		time.textContent = orga.time;
		titre.textContent = orga.titre;
		text.textContent = orga.text;

		li.appendChild(time);
		li.appendChild(titre);
		li.appendChild(text);

		if ("thursday" === orga.day) {
			thursday.appendChild(li);
		}
		if ("friday" === orga.day) {
			friday.appendChild(li);
		}
		if ("saturday" === orga.day) {
			saturday.appendChild(li);
		}
		if ("sunday" === orga.day) {
			sunday.appendChild(li);
		}
	});
}

function whichDay(day) {
	scheduleData.forEach((orga) => {
		if (day === orga.day) return true;
	});
}

displaySchedule();
