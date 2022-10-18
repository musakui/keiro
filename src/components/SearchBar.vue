<template>
	<div class="relative">
		<div class="absolute inset-0 pl-3 flex items-center pointer-events-none">
			🔍
		</div>
		<label>
			<span class="sr-only">search</span>
			<input
				type="search"
				class="p-3 pl-10 w-full text-sm rounded-lg border border-gray-500 bg-gray-800"
				v-bind="$attrs"
				@input="$emit('update:value', $event.target.value)"
			>
		</label>
	</div>
</template>

<script setup></script>