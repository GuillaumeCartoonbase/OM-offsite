const searchInput = document.getElementById("participantsSearch");

const itemList = document.getElementById("peopleList");
const items = itemList.getElementsByClassName("person");

// Function to filter the items
function filterItems() {
	const query = searchInput.value.toLowerCase(); // Get the search query (case-insensitive)

	// Loop through all list items
	Array.from(items).forEach((item) => {
		const itemText = item.textContent.toLowerCase(); // Get the text of each item (case-insensitive)

		// If the item matches the query, show it, otherwise hide it
		if (itemText.includes(query)) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
}

// Listen for input changes on the search field
searchInput.addEventListener("input", filterItems);
