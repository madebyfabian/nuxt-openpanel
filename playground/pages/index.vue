<template>
	<div>
		Index page.
		<NuxtLink to="/about"> About</NuxtLink>
	</div>
</template>

<script setup lang="ts">
const { setProfile } = useOpenpanel();
setProfile({
	profileId: "123",
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@openpanel.dev",
});
</script>
