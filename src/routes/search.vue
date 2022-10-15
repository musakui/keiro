<template>
	<main class="flex flex-col p-8 h-screen">
		<TransitionGroup
			leave-active-class="absolute transition duration-300"
			leave-from-class="opacity-50" leave-to-class="opacity-0"
			move-class="transition"
		>
			<div v-if="fresh" key="headspace" class="mt-20 mb-2">
				Where do you want to go?
			</div>
			<div key="search">
				<ClientOnly>
					<PlaceSearchBar
						:placeholder="placeholder"
						@selected="onSelected"
						@results.once="fresh = false"
						@input.once="typewriter = false"
					/>
					<template #placeholder>
						<SearchBar />
					</template>
				</ClientOnly>
			</div>
		</TransitionGroup>
	</main>
	<div class="absolute bottom-0 left-0 p-4">
		<RouterLink to="/about">← about</RouterLink>
	</div>
	<div class="absolute bottom-0 right-0 p-4">
		<RouterLink to="/places">saved places →</RouterLink>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import PlaceSearchBar from '../components/PlaceSearchBar.vue'

const router = useRouter()
const onSelected = async ({ place_id, ...info }) => {
	console.info('selected place', place_id, info)
	router.push({ name: 'place', params: { place_id } })
}

const fresh = ref(true)
const typewriter = ref(false)
const placeholder = ref('search...')
</script>