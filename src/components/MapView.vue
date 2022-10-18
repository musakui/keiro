<template>
	<div class="relative">
		<div class="absolute z-5">
			<slot></slot>
		</div>
		<div ref="mapEl" class="h-full"></div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMap } from '../services/maps.js'

const emit = defineEmits(['ready'])
const mapEl = ref(/** @type {HTMLDivElement} */(null))

onMounted(() => {
	emit('ready', useMap(mapEl.value))
})
</script>