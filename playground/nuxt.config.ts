export default defineNuxtConfig({
	devtools: { enabled: true },

	// Module config
	modules: ["../src/module"],
	openpanel: {
		trackScreenViews: true,
	},
});
