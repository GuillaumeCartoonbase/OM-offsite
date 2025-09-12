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
	// (Optional) clear previous content if re-rendering:
	// ["thursday","friday","saturday","sunday"].forEach(id => {
	//   const el = document.getElementById(id);
	//   if (el) el.innerHTML = "";
	// });

	scheduleData.forEach((orga) => {
		const li = document.createElement("li");
		li.innerHTML = `
      <h3 class="schedule">${orga.time}</h3>
      <h4 class="schedTitle">${orga.titre}</h4>
      <p class="schedText">${orga.text}</p>
    `;

		const dayContainer = document.getElementById(orga.day); // expects "thursday" | "friday" | ...
		if (dayContainer) dayContainer.appendChild(li);
	});
}
