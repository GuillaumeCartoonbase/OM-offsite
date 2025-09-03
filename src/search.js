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
		const itemName = nameElement.textContent.toLowerCase(); // Get the text of each name (case-insensitive)

		// If the name matches the query, show it, otherwise hide it
		if (itemName.includes(query)) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
}

// Listen for input changes on the search field
searchInput.addEventListener("input", filterItems);
