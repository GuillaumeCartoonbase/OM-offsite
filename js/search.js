const searchInput = document.getElementById("participantsSearch");

const itemList = document.getElementById("peopleList");
const items = itemList.getElementsByClassName("person");

// Function to filter the items based on name only
function filterItems() {
	const query = searchInput.value.toLowerCase(); // Get the search query (case-insensitive)

	// Loop through all list items
	Array.from(items).forEach((item) => {
		// Get the name text (only from the <h2> element in each person div)
		const nameElement = item.querySelector("h2");
		const itemName = (nameElement?.textContent || "").toLowerCase();
		item.style.display = itemName.includes(query) ? "" : "none";
	});
}

const form = searchInput.closest("form");
if (form) {
	form.addEventListener("submit", (e) => e.preventDefault());
}

// Listen for input changes on the search field
searchInput.addEventListener("input", filterItems);

document.addEventListener("click", (e) => {
	const link = e.target.closest("a");
	if (!link) return;
	searchInput.value = "";
	filterItems();
});
