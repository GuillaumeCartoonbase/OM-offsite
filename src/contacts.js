const phoneSVG =
	' <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" > <g clip-path="url(#clip0_69_1050)"> <path d="M26.3941 21.3578L22.2238 17.1778C21.3924 16.3499 20.0177 16.3745 19.1592 17.235L17.0591 19.34C16.9259 19.2664 16.7901 19.1902 16.6434 19.1085C15.3176 18.3705 13.5 17.363 11.59 15.4459C9.67467 13.526 8.66401 11.7015 7.92774 10.3726C7.84896 10.231 7.7756 10.0949 7.70225 9.96689L9.11229 8.5563L9.80508 7.8619C10.6663 6.99866 10.6908 5.62075 9.86214 4.79019L5.69178 0.607439C4.86314 -0.223121 3.48842 -0.198613 2.62718 0.664625C2.62718 0.664625 1.02696 2.00441 0.516192 3.59201C0.290694 4.18838 0.149418 4.75751 0.0842141 5.32937C-0.467305 9.90426 1.61923 14.0843 7.28113 19.7593C15.1056 27.602 21.4114 27.0083 21.6831 26.9811C22.2754 26.9103 22.8432 26.7687 23.4219 26.5427C25.0466 25.9708 26.3398 24.4295 26.3398 24.4295C27.1983 23.5663 27.2228 22.1884 26.3941 21.3551V21.3578ZM25.4134 23.5009L24.889 24.0265L24.6798 24.228C24.3511 24.5466 23.7805 24.9959 22.9492 25.32C22.4764 25.5024 22.0119 25.6195 21.5391 25.6767C21.4794 25.6822 15.5485 26.1887 8.20758 18.8335C1.96427 12.5757 0.964472 8.97294 1.38287 5.48187C1.43449 5.01894 1.55131 4.55328 1.73606 4.06583C2.06479 3.22711 2.51036 2.65797 2.82551 2.32574L3.55091 1.59049C3.90138 1.23921 4.44475 1.21198 4.76534 1.53331L8.93569 5.71334C9.25356 6.03467 9.22911 6.5793 8.87864 6.93331L6.06399 9.75177L6.32481 10.1902C6.4688 10.4353 6.62094 10.7076 6.78395 11.0071C7.55825 12.4068 8.61782 14.3239 10.6636 16.3745C12.704 18.4223 14.6139 19.4816 16.0076 20.2577C16.3092 20.4238 16.5836 20.579 16.8308 20.726L17.2683 20.9875L20.0829 18.1663C20.4334 17.815 20.9822 17.7905 21.3001 18.1091L25.4677 22.2864C25.7856 22.6077 25.7611 23.1524 25.4106 23.5037L25.4134 23.5009Z" fill="#62A176" /> </g> <defs> <clipPath id="clip0_69_1050"> <rect width="27" height="27" fill="white" /> </clipPath> </defs> </svg>';
let contactData = [];

fetch("src/contacts.json")
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
