<template>
	<main class="p-4">
		<h1 class="mb-2 text-lg">admin</h1>
		<button class="p-2 bg-gray-800" @click="reset">reset db</button>
	</main>
	<div class="absolute bottom-0 right-0 p-4">
		<RouterLink to="/search">search →</RouterLink>
	</div>
</template>

<script setup>
const reset = async () => {
	if (!confirm('are you sure?')) return
	const { deleteDB } = await import('idb')
	const { idbName } = await import('../config.js')
	await deleteDB(idbName)
}
</script>