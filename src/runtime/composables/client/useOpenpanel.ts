export const useOpenpanel = ({ profileId }: { profileId?: string } = {}) => {
	const nuxtApp = useNuxtApp();
	const op = nuxtApp.$openpanel;

	if (process.client && profileId) {
		op.setProfileId(profileId);
	}

	return {
		event: (...params: Parameters<typeof op.event>) => {
			if (process.client) op.event(...params);
		},
		screenView: (...params: Parameters<typeof op.screenView>) => {
			if (process.client) op.screenView(...params);
		},
		setProfile: (...params: Parameters<typeof op.setProfile>) => {
			if (process.client) op.setProfile(...params);
		},
		setProfileId: (...params: Parameters<typeof op.setProfileId>) => {
			if (process.client) op.setProfileId(...params);
		},
		increment: (...params: Parameters<typeof op.increment>) => {
			if (process.client) op.increment(...params);
		},
		decrement: (...params: Parameters<typeof op.decrement>) => {
			if (process.client) op.decrement(...params);
		},
		clear: (...params: Parameters<typeof op.clear>) => {
			if (process.client) op.clear(...params);
		},
	};
};
