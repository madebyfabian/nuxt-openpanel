import { Openpanel, type OpenpanelOptions } from "@openpanel/web";

export const createServerOpenpanel = ({
	profileId,
}: { profileId?: string } = {}) => {
	const runtimeConfig = useRuntimeConfig();

	if (!process.server) {
		throw new Error(
			"[nuxt-openpanel] `createServerOpenpanel` must be called on server"
		);
	}

	const clientId = runtimeConfig.openpanel.clientId;
	const clientSecret = runtimeConfig.openpanel.clientSecret;
	if (!clientId || !clientSecret) {
		throw new Error(
			"[nuxt-openpanel] `server.clientId` and `server.clientSecret` must be provided in runtime config or as env variables in order to use `createServerOpenpanel`"
		);
	}

	// Create Openpanel options
	const options: OpenpanelOptions = {
		// OpenpanelSdkOptions
		url: runtimeConfig.openpanel.url || undefined,
		clientId,
		clientSecret,
	};

	// Init Openpanel
	const op = new Openpanel(options);

	if (profileId) {
		op.setProfileId(profileId);
	}

	return op;
};
