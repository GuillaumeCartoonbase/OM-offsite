document.addEventListener("DOMContentLoaded", () => {
	const link = document.getElementById("goBack");
	if (!link) return;

	link.addEventListener("click", (e) => {
		if (history.length > 1) {
			e.preventDefault();
			history.back();
		}
		// else: no history → browser follows the href fallback ("/")
	});
});
