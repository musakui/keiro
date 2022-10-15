<template>
	<main class="p-4">
		<h1 class="mb-2 text-lg">📍 Unknown Place</h1>
		<code>id: {{ route.params.place_id }}</code>
	</main>
	<div class="absolute bottom-0 left-0 p-4">
		<RouterLink to="/places">← saved places</RouterLink>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>