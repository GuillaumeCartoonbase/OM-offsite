let contactData = [];

fetch("/data/contacts.json")
	.then((r) => r.json())
	.then((data) => {
		contactData = Array.isArray(data) ? data : data.contacts || [];
		displayContacts(); // <-- call AFTER data is set
	})
	.catch((e) => console.error("Error loading contacts:", e));

function displayContacts() {
	contactData.forEach((contact) => {
		const contactList = document.getElementById(contact.header);
		// contactList.innerHTML = "";
		const cell = document.createElement("div");
		cell.classList.add("contactCell");

		const info = document.createElement("div");
		info.classList.add("contactInfo");

		const name = document.createElement("p");
		name.classList.add("contactName");
		name.textContent = contact.name;

		const phone = document.createElement("p");
		phone.classList.add("contactPhone");
		phone.textContent = contact.phone;

		info.append(name, phone);

		// build the cell, then append to the list
		cell.append(info);
		contactList.appendChild(cell);
	});
}
