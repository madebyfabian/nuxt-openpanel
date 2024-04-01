# Nuxt Openpanel

Nuxt module for using [Openpanel](https://openpanel.dev/) in your Nuxt 3 app.

## Quick Setup

1. Install the module to your Nuxt application with one command:

```bash
pnpm add nuxt-openpanel
```

2. Add the following to your nuxt.config:

```ts
export default defineNuxtConfig({
	// ...
	modules: ["nuxt-openpanel"],
	openpanel: {
		trackScreenViews: true,
	},
});
```

3. Add `NUXT_PUBLIC_OPENPANEL_CLIENT_ID` to your `.env` file:

```env
NUXT_PUBLIC_OPENPANEL_CLIENT_ID="YOUR_CLIENT_ID"
```

That's it! You can now use Openpanel in your Nuxt app ✨

## Options

You can configure the Openpanel module by using the `openpanel` key in nuxt.config:

```ts
export default defineNuxtConfig({
	// ...
	openpanel: {
		trackScreenViews: true,
		cliendId: "YOUR_CLIENT_ID", // You can also set this by using the `NUXT_PUBLIC_OPENPANEL_CLIENT_ID` environment variable
	},
});
```

- `url` - The url of the openpanel API or your self-hosted instance
- `clientId` - Required. The client id of your application
- `trackScreenViews` - If true, the library will automatically track screen views
- `trackOutgoingLinks` - If true, the library will automatically track outgoing links
- `trackAttributes` - If true, the library will automatically track attributes

For using this module on the server side, you need to add additional config in the `openpanel.server` key:

```ts
export default defineNuxtConfig({
	// ...
	openpanel: {
		server: {
			clientId: "YOUR_CLIENT_ID", // You can also set this by using the `NUXT_OPENPANEL_CLIENT_ID` environment variable
			clientSecret: "YOUR_CLIENT_SECRET", // You can also set this by using the `NUXT_OPENPANEL_CLIENT_SECRET` environment variable
		},
	},
});
```

- `server.url` - The url of the openpanel API or your self-hosted instance
- `server.clientId` - Required. The client id of your application
- `server.clientSecret` - Required. The client secret of your application

## Usage

### Track screen view

If you enable `openpanel.trackScreenViews`, it will automatically track screen views for you.

### Track event

```html
<template>
	<!-- ... -->
</template>

<script setup lang="ts">
	const { event } = useOpenpanel();
	event("my_event", { foo: "bar" });
</script>
```

### Other methods

See the [Openpanel Web documentation](https://docs.openpanel.dev/docs/web#ready) for more information.

## Track server events

If you want to track server-side events, you can use the `createServerOpenpanel()` composable.
Be sure to add the `openpanel.server` config to your nuxt.config (see above) or add the env variables `NUXT_OPENPANEL_CLIENT_ID` and `NUXT_OPENPANEL_CLIENT_SECRET` with your server client id and secret.

```ts
// server/api/example.ts
export default defineEventHandler(async (event) => {
	const openpanel = createServerOpenpanel();

	openpanel.event("my_server_event", { ok: "✅" });

	// ...
});
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build

# Release new version

npm run release

```

</details>
```
