/**
 * PWA Install Button Logic
 * - Shows the button when `beforeinstallprompt` fires (Android/Chrome).
 * - Hides when already installed / after install.
 * - iOS Safari: shows textual hint (no programmatic prompt on iOS).
 */

(function () {
	const installBtn = document.getElementById("pwa-install");
	const iosHint = document.getElementById("ios-a2hs-hint");
	let deferredPrompt = null;

	// Utility: are we running in standalone?
	const isStandalone =
		window.matchMedia("(display-mode: standalone)").matches ||
		window.navigator.standalone === true; // iOS Safari

	// Utility: quick iOS Safari check
	const isiOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
	const isSafari = /^((?!chrome|android).)*safari/i.test(
		window.navigator.userAgent
	);

	// If already installed, don't show anything.
	if (isStandalone) {
		hideAll();
		return;
	}

	// Chrome/Edge/Android path: capture the event and show the button
	window.addEventListener("beforeinstallprompt", (e) => {
		// Prevent the mini-infobar and save the event
		e.preventDefault();
		deferredPrompt = e;

		// Only show the button if not installed
		installBtn.hidden = false;
	});

	// Clicking the button must be a user gesture to show the prompt
	installBtn.addEventListener("click", async () => {
		if (!deferredPrompt) {
			// No prompt available (maybe iOS or not eligible)
			// You might want to show the iOS hint as a fallback here
			if (isiOS && isSafari) {
				iosHint.hidden = false;
			}
			return;
		}

		installBtn.disabled = true;
		try {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			// outcome: 'accepted' | 'dismissed'
			// You can log this for analytics if you want
		} catch (err) {
			console.error("Install prompt failed:", err);
		} finally {
			deferredPrompt = null;
			installBtn.disabled = false;
			// Keep button hidden after prompting (Chrome may not re-fire soon)
			installBtn.hidden = true;
		}
	});

	// Fires when the app is successfully installed
	window.addEventListener("appinstalled", () => {
		hideAll();
	});

	// iOS Safari has no beforeinstallprompt — show a friendly hint
	// Only do this if not in standalone, and the page has a manifest + SW registered.
	document.addEventListener("DOMContentLoaded", () => {
		if (!deferredPrompt && isiOS && isSafari && !isStandalone) {
			// Optional: delay a bit so it doesn’t pop immediately
			setTimeout(() => {
				iosHint.hidden = false;
			}, 800);
		}
	});

	// Also hide the button when display-mode changes to standalone
	// (e.g., user installed via browser UI)
	window
		.matchMedia("(display-mode: standalone)")
		.addEventListener("change", (e) => {
			if (e.matches) hideAll();
		});

	function hideAll() {
		if (installBtn) installBtn.hidden = true;
		if (iosHint) iosHint.hidden = true;
	}
})();
