<template>
	<div>
		<SearchBar
			v-model:value="search.text"
			:placeholder="placeholder"
			@keyup.self="onKey"
		/>
		<Transition
			enter-active-class="transition ease-out"
			enter-from-class="opacity-0" enter-to-class="opacity-100"
			leave-active-class="transition ease-in"
			leave-from-class="opacity-100" leave-to-class="opacity-0"
		>
			<ul v-if="search.results.length" key="results" class="divide-y mt-1 border border-gray-500 bg-gray-800">
				<TransitionGroup
					enter-active-class="transition ease-out"
					enter-from-class="opacity-0" enter-to-class="opacity-100"
					leave-active-class="absolute max-w-9/10 transition ease-in"
					leave-from-class="opacity-100" leave-to-class="opacity-0"
					move-class="transition"
				>
					<li
						v-for="(r, i) in search.results"
						:key="r.place_id"
						class="p-1 truncate cursor-pointer hover:bg-gray-700"
						:class="{ 'bg-gray-700': i === search.selected }"
						@click="selectItem(r)"
					>
						📍 <b>{{ r.structured_formatting.main_text }}</b> {{ r.structured_formatting.secondary_text }}
					</li>
				</TransitionGroup>
			</ul>
		</Transition>
	</div>
</template>

<script setup>
import { shallowReactive } from 'vue'
import { debouncedWatch } from '@vueuse/core'
import SearchBar from './SearchBar.vue'

const ALL_ALNUM = /^[a-z0-9 -]+$/i
const emit = defineEmits(['results', 'selected'])
const props = defineProps({
	placeholder: String,
})

const search = shallowReactive({
	text: '',
	/** @type {Array<google.maps.places.AutocompletePrediction>} */
	results: [],
	selected: -1,
})

const selectItem = (item) => {
	if (item) emit('selected', item)
	search.selected = -1
	search.results = []
}

/** @param {KeyboardEvent} evt */
const onKey = (evt) => {
	switch (evt.code) {
		case 'Enter':
			if (search.selected > -1) {
				selectItem(search.results[search.selected])
			}
			break
		case 'ArrowUp':
			if (search.selected > 0) {
				--search.selected
			}
			break
		case 'ArrowDown':
			if (search.selected < search.results.length - 1) {
				++search.selected
			}
			break
		default:
			break
	}
}

debouncedWatch(() => search.text, async () => {
	search.selected = -1
	const input = search.text
	if (input.length === 0) {
		search.results = []
		return
	}
	if (input.length < (ALL_ALNUM.test(input) ? 4 : 2)) return

	import('../services/db.js') // preload db module
	const { getPlacePredictions } = await import('../services/maps.js')
	const results = await getPlacePredictions(input)
	search.results = results.predictions
	emit('results', search.results)
}, { debounce: 500, maxWait: 1000 })
</script>