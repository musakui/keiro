<template>
	<main class="p-4">
		<h1 class="mb-2 text-lg">{{ t('title') }}</h1>
		<p>lorem ipsum dolor si amet</p>
	</main>
	<div class="absolute bottom-0 right-0 p-4">
		<RouterLink to="/search">{{ t('pageLinks.search') }} →</RouterLink>
	</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<i18n>
{
	'en': {
		title: 'About',
	},
	'ja': {
		title: '「けいろ」とは？',
	},
}
</i18n>