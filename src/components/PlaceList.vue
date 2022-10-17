<template>
	<div v-if="places.length" class="flex flex-col gap-2">
		<div v-for="place in places">
			<RouterLink :to="{ name: 'place', params: { place_id: place.place_id } }">
				<div class="p-3 rounded shadow bg-gray-800">
					{{ place.savedName }}
				</div>
			</RouterLink>
		</div>
	</div>
	<div v-else>
		{{ t('empty') }}
	</div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const places = reactive([])
import('../services/db.js').then(async (db) => {
	places.push(...(await db.getSavedPlaces()))
})
</script>

<i18n>
{
	'en': {
		empty: 'no places',
	},
	'ja': {
		empty: '何もない',
	},
}
</i18n>