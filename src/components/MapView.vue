<template>
	<div class="relative">
		<div class="absolute z-5">
			<slot></slot>
		</div>
		<div ref="mapEl" class="h-full"></div>
	</div>
</template>

<script setup>
import { shallowRef, watchEffect, onMounted } from 'vue'
import { useMap, showTransit } from '../services/maps.js'

const map = shallowRef(/** @type {google.maps.Map} */(null))
const mapEl = shallowRef(/** @type {HTMLDivElement} */(null))

const props = defineProps({
	lat: Number,
	lng: Number,
	zoom: Number,
	bounds: Object,
	transit: Boolean,
	clickable: Boolean,
})

onMounted(() => {
	map.value = useMap(mapEl.value)
})

watchEffect(() => {
	if (!map.value) return
	showTransit(props.transit ? map.value : null)
	map.value.setClickableIcons(!!props.clickable)
	if (props.zoom) {
		map.value.setZoom(props.zoom)
	}
	if (props.bounds) {
		map.value.panToBounds(props.bounds)
	}
	if (props.lat && props.lng) {
		map.value.panTo({ lat: props.lat, lng: props.lng })
	}
})
</script>