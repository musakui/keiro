<template>
	<main class="flex flex-col p-8 h-screen">
		<TransitionGroup
			leave-active-class="absolute transition duration-300"
			leave-from-class="opacity-50" leave-to-class="opacity-0"
			move-class="transition"
		>
			<div v-if="fresh" key="headspace" class="mt-20 mb-2">
				{{ t('searchPrompt') }}
			</div>
			<div key="search">
				<ClientOnly>
					<PlaceSearchBar
						:placeholder="placeholder"
						@selected="onSelected"
						@focusin="typewriter = 0"
						@results.once="fresh = false"
					/>
					<template #placeholder>
						<SearchBar />
					</template>
				</ClientOnly>
			</div>
		</TransitionGroup>
	</main>
	<div class="absolute bottom-0 left-0 p-4">
		<RouterLink to="/about/">← {{ t('pageLinks.about') }}</RouterLink>
	</div>
	<div class="absolute bottom-0 right-0 p-4">
		<RouterLink to="/places/">{{ t('pageLinks.places') }} →</RouterLink>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SearchBar from '../components/SearchBar.vue'
import PlaceSearchBar from '../components/PlaceSearchBar.vue'
import { millis } from '../utils.js'

const { t } = useI18n()
const router = useRouter()

/** @param {google.maps.places.AutocompletePrediction} */
const onSelected = async ({ place_id, ...info }) => {
	const {
		types,
		structured_formatting: fmt,
	} = info
	const { putPlace } = await import('../services/db.js')
	await putPlace({
		place_id,
		name: fmt.main_text,
		address: fmt.secondary_text,
		types,
	})
	router.push({ name: 'place', params: { place_id } })
}

const fresh = ref(true)
const typewriter = ref(-1)
const placeholder = ref('search...')

onMounted(async () => {
	let lastIdx = null
	/** @type {string[][]} */
	const [_, words] = await Promise.all([
		millis(1000),
		fetch('/place_suggestions.json').then((r) => r.json()),
	])
	const numWords = words.length - 1
	const randIdx = () => {
		let idx = lastIdx
		while (idx === lastIdx) {
			idx = Math.floor(Math.random() * numWords)
		}
		lastIdx = idx
		return idx
	}
	words.reverse()
	while (typewriter.value) {
		if (typewriter.value === -1) {
			placeholder.value = placeholder.value.slice(0, -1)
			if (!placeholder.value.length) {
				await millis(500)
				typewriter.value = 1 + randIdx()
			}
			await millis(100)
		} else if (typewriter.value) {
			const word = words[typewriter.value]
			placeholder.value = word.slice(0, placeholder.value.length + 1)
			if (placeholder.value === word) {
				await millis(500)
				typewriter.value = -1
			}
			await millis(150)
		}
	}
	placeholder.value = 'search...'
})
</script>

<i18n>
{
	'en': {
		searchPrompt: 'Where do you want to go?',
	},
	'ja': {
		searchPrompt: 'どこに行きたい？',
	},
}
</i18n>