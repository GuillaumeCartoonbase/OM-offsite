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
		let sublist = "";
		if (orga.link.length > 1) {
			for (let i = 0; i < orga.link.length; i++) {
				sublist += `<li class="subset"> <a href = ${orga.link[i][1]}> ${orga.link[i][0]} </a> </li>`;
			}
		}

		const li = document.createElement("li");
		li.classList.add("timeline");
		li.innerHTML = `
      <h3 class="schedule">${orga.time}</h3>
	  <h4 class="schedTitle"> ${orga.titre} </h4>
      <p class="schedText">${orga.text}</p>
    `;

		const dayContainer = document.getElementById(orga.day); // expects "thursday" | "friday" | ...
		if (dayContainer) dayContainer.appendChild(li);
	});
}
