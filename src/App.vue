<template>
	<RouterView />
</template>

<script setup>
import { useHead } from '@vueuse/head'
import * as appConfig from './config.js'
useHead({
	title: appConfig.title,
	meta: [
		{ name: 'description', content: appConfig.description },
		{ name: 'theme-color', content: appConfig.themeColor },
	],
	link: [
	],
})
</script>