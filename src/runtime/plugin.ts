import { defineNuxtPlugin } from "#app";
import { Openpanel, type OpenpanelOptions } from "@openpanel/web";

/** Analytics */
export default defineNuxtPlugin({
	name: "openpanel",
	enforce: "pre",
	async setup(nuxtApp) {
		const runtimeConfig = useRuntimeConfig();

		// Create Openpanel options
		const options: OpenpanelOptions = {
			url: runtimeConfig.public.openpanel.url || undefined,
			clientId: runtimeConfig.public.openpanel.clientId,
			trackScreenViews: runtimeConfig.public.openpanel.trackScreenViews,
			trackOutgoingLinks: runtimeConfig.public.openpanel.trackOutgoingLinks,
			trackAttributes: runtimeConfig.public.openpanel.trackAttributes,
		};

		// Init Openpanel
		const op = new Openpanel(options);

		// Inject
		return {
			provide: {
				openpanel: op,
			},
		};
	},
});
