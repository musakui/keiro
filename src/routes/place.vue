<template>
	<main class="p-4">
		<div v-if="place.name" class="flex flex-col gap-2">
			<h1 class="text-lg">📍 {{ place.savedName || place.name }}</h1>
			<div class="grid grid-cols-1 sm:grid-cols-[2fr,1fr] items-start gap-2">
				<div class="p-1 rounded bg-gray-800">
					<MapView class="h-[60vh]" @ready="init"></MapView>
				</div>
				<div class="flex flex-wrap items-end justify-end gap-2">
					<div class="relative flex-grow">
						<button
							class="absolute right-1 bottom-1 px-2 py-1 rounded bg-blue-800"
							:disabled="!place.name || loading"
							@click="savePlaceName(savedAs)"
						>
							{{ t('save') }}
						</button>
						<label class="flex flex-wrap items-center gap-2">
							name
							<input
								v-model="savedAs"
								class="p-2 pr-14 rounded flex-grow bg-gray-800"
							/>
						</label>
					</div>
					<button
						v-if="place.savedName"
						class="mb-1 px-2 py-1 rounded bg-red-900"
						:disabled="loading"
						@click="savePlaceName()"
					>
						{{ t('remove') }}
					</button>
				</div>
			</div>
			<details class="p-4 rounded bg-gray-800">
				<summary>details</summary>
				{{ place }}
			</details>
		</div>
		<div v-else>{{ t('loading') }}</div>
	</main>
	<div class="absolute bottom-0 left-0 p-4">
		<RouterLink to="/places">← {{ t('pageLinks.places') }}</RouterLink>
	</div>
</template>

<script setup>
import { ref, shallowRef, reactive, watchEffect, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { maps, getPlaceDetails } from '../services/maps.js'
import { getPlace, putPlace } from '../services/db.js'
import MapView from '../components/MapView.vue'

let marker =/** @type {google.maps.Marker} */(null)

const MS_TO_MINUTES = 60 * 1000
const lastUpdatedMinutes = (t) => (new Date() - t) / MS_TO_MINUTES

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const savedAs = ref('')
const loading = ref(false)
const place = reactive({
	name: null,
	lat: 0,
	lng: 0,
	viewport: null,
})

const mapRef = shallowRef(/** @type {google.maps.Map} */(null))

/**
 * @param {google.maps.Map} map
 */
const init = (map) => {
	map.setZoom(15)
	mapRef.value = map
}

const savePlaceName = async (savedName) => {
	loading.value = true
	const pl = await getPlace(place.place_id)
	await putPlace({ ...pl, savedName })
	place.savedName = savedName
	loading.value = false
}

useHead({
	title: () => `keiro | ${place.savedName || place.name}`,
})

watchEffect(() => {
	if (mapRef.value && place.lat) {
		const position = { lat: place.lat, lng: place.lng }
		const title = place.savedName || place.name
		mapRef.value.panTo(position)
		marker = new maps.Marker({
			title, position,
			map: mapRef.value,
		})
		const infoWindow = new google.maps.InfoWindow({
			content: `<div class="text-black">${title}</div>`,
			map: mapRef.value,
		})
		marker.addListener('click', () => {
			infoWindow.open({
				anchor: marker,
				map: mapRef.value,
			})
		})
	}
})

watchEffect(async () => {
	/** @type {string} */
	const pid = route.params.place_id
	const pl = await getPlace(pid)
	if (pl) Object.assign(place, pl)
	if (!(await getPlaceDetails(pid))) {
		router.push({ name: 'search', hash: '#not-found' })
		return
	}
	if (pl && pl.name) {
		savedAs.value = pl.savedName || pl.name
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

onUnmounted(() => {
	marker?.setMap(null)
})
</script>

<i18n>
{
	'en': {
		save: 'Save',
		remove: 'Remove',
	},
	'ja': {
		save: '保存',
		remove: '削除',
	},
}
</i18n>