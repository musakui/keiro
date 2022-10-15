<template>
	<main class="p-4">
		<div v-if="place.name">
			<h1 class="mb-2 text-lg">📍 {{ place.name }}</h1>
			<div class="p-4 rounded bg-gray-800">
				{{ place }}
			</div>
		</div>
		<div v-else>Loading...</div>
	</main>
	<div class="absolute bottom-0 left-0 p-4">
		<RouterLink to="/places">← saved places</RouterLink>
	</div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getPlaceDetails } from '../services/maps.js'
import { getPlace, putPlace } from '../services/db.js'

const MS_TO_MINUTES = 60 * 1000
const lastUpdatedMinutes = (t) => (new Date() - t) / MS_TO_MINUTES

const route = useRoute()
const place = reactive({
	name: null,
})

watchEffect(async () => {
	/** @type {string} */
	const pid = route.params.place_id
	const pl = await getPlace(pid)
	if (pl) Object.assign(place, pl)
	if (!(await getPlaceDetails(pid))) {
		// no such place
		return
	}
	if (pl?.lat && (lastUpdatedMinutes(pl.updated) < 10)) return
	const details = await getPlaceDetails(pid, {
		fields: [
			'types',
			'geometry',
			...(pl?.name ? [] : ['name']),
		],
	})
	const updatedValue = {
		types: details.types,
		...details.geometry.location.toJSON(),
		viewport: details.geometry.viewport.toJSON(),
		...(details.name ? { name: details.name } : null),
	}
	await putPlace({
		place_id: pid,
		...pl,
		...updatedValue,
	})
	Object.assign(place, updatedValue)
})
</script>