const SITE_PASSWORD = "OM2025";
function grantAccess() {
	localStorage.setItem("site_access", "granted");
	document.body.style.display = "block"; // show content
}
function denyAccess() {
	document.body.innerHTML = "Accès refusé. Actualisez pour retenter.";
	// document.body.style.display = "block"; // show message
}
window.addEventListener("load", () => {
	if (localStorage.getItem("site_access") === "granted") {
		// Already unlocked
		document.body.style.display = "block";
	} else {
		const entered = prompt("Entrez le mot de passe");
		if (entered === SITE_PASSWORD) {
			grantAccess();
		} else {
			denyAccess();
		}
	}
});
