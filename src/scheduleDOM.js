// Keep scheduleData in outer scope
let scheduleData = [];

// Fetch JSON then render
fetch("src/schedule.json")
	.then((response) => response.json())
	.then((data) => {
		scheduleData = data;
		displaySchedule();
	})
	.catch((error) => console.error("Error loading the JSON file:", error));

function displaySchedule() {
	scheduleData.forEach((orga) => {
		const li = document.createElement("li");
		li.classList.add("timeline");
		li.innerHTML = `
      <h3 class="schedule">${orga.time}</h3>
	       <h4 class="schedTitle">${
						orga.link ? "<a href=" + orga.link + ">" : ""
					} ${orga.titre} ${orga.link ? "</a>" : ""}</h4>
      <p class="schedText">${orga.text}</p>
    `;

		const dayContainer = document.getElementById(orga.day); // expects "thursday" | "friday" | ...
		if (dayContainer) dayContainer.appendChild(li);
	});
}
