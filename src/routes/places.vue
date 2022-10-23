<template>
	<main class="p-4">
		<h1 class="mb-2 text-lg">{{ t('title') }}</h1>
		<ClientOnly>
			<PlaceList></PlaceList>
			<template #placeholder>{{ t('loading') }}</template>
		</ClientOnly>
	</main>
	<div class="fixed bottom-0 left-0 p-4">
		<RouterLink to="/search/">← {{ t('pageLinks.search') }}</RouterLink>
	</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'
import PlaceList from '../components/PlaceList.vue'
const { t } = useI18n()
useHead({
	title: () => `keiro | ${t('title')}`,
})
</script>

<i18n>
{
	'en': {
		title: 'Saved Places',
	},
	'ja': {
		title: '行きたい場所',
	},
}
</i18n>