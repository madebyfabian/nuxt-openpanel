import { defu } from "defu";
import {
	defineNuxtModule,
	addPlugin,
	createResolver,
	addServerImportsDir,
	addImportsDir,
} from "@nuxt/kit";
import { fileURLToPath } from "url";

// Module options TypeScript interface definition
export type ModuleOptions = {
	url?: string;
	clientId: string;
	trackScreenViews?: boolean;
	trackOutgoingLinks?: boolean;
	trackAttributes?: boolean;

	// Server
	server?: {
		url?: string;
		clientId: string;
		clientSecret: string;
	};
};

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "openpanel",
		configKey: "openpanel",
		compatibility: {
			nuxt: "^3.0.0",
		},
	},
	defaults: {
		url: "",
		clientId: "",
		trackScreenViews: false,
		trackOutgoingLinks: false,
		trackAttributes: false,

		// Server
		server: {
			url: "",
			clientId: "",
			clientSecret: "",
		},
	},
	setup(_options, nuxt) {
		const resolver = createResolver(import.meta.url);

		// Public runtimeConfig
		nuxt.options.runtimeConfig.public.openpanel = defu(
			nuxt.options.runtimeConfig.public.openpanel,
			_options
		);

		// Private runtimeConfig
		nuxt.options.runtimeConfig.openpanel = defu(
			nuxt.options.runtimeConfig.openpanel,
			_options.server
		);

		const moduleOptions = nuxt.options.runtimeConfig.public.openpanel;

		// Check if `clientId` is provided
		if (!moduleOptions.clientId?.length) {
			console.error(
				"[nuxt-openpanel] `clientId` is required in module options."
			);
		}

		// Transpile runtime
		const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));

		// Add client composables
		addImportsDir(resolver.resolve(runtimeDir, "composables/client"));

		// Add server composables
		addServerImportsDir(resolver.resolve(runtimeDir, "composables/server"));

		// Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
		addPlugin(resolver.resolve("./runtime/plugin"));

		nuxt.options.build.transpile.push(runtimeDir);
	},
});
