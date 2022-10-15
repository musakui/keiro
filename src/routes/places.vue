<template>
	<main class="p-4">
		<h1 class="mb-2 text-lg">Saved Places</h1>
		<ClientOnly>
			Place List
			<template #placeholder>Loading...</template>
		</ClientOnly>
	</main>
	<div class="absolute bottom-0 left-0 p-4">
		<RouterLink to="/search">← find places</RouterLink>
	</div>
</template>

<script setup>
</script>