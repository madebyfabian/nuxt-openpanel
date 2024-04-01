<template>
	<div>
		About page.
		<NuxtLink to="/"> Index</NuxtLink>
		<br />
		<br />
		<button @click="sendServerEvent">Send server event</button>
	</div>
</template>

<script setup lang="ts">
const { event } = useOpenpanel();
event("about_page_visited", { key: "value" });

const sendServerEvent = async () => {
	await $fetch("/api/example");
};
</script>
