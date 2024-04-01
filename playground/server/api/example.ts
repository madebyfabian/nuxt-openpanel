export default defineEventHandler(async (event) => {
	const openpanel = createServerOpenpanel();

	openpanel.event("my_server_event", { ok: "✅" });

	return {
		success: true,
	};
});
