<template>
	<main v-once class="w-full">
		<div class="flex justify-center h-screen">
			<div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
				<div class="flex flex-col">
					<span class="text-2xl md:text-3xl">🚧 under construction 🚧</span>
					<h1 class="py-5 text-3xl font-semibold md:text-4xl">keiro - route planner</h1>
					<p class="mt-2 text-sm text-gray-300 md:text-lg">
						Plan your next trip to Japan with ease.
						Add places you want to visit and craft a route that suits your preferences.
						Powered by the
						<strong>
							<a href="https://jorudan.co.jp">Jorudan</a>&nbsp;<a href="https://norikae.jorudan.co.jp/openapi">Open API</a>
						</strong>
					</p>
					<div class="flex gap-3 justify-center lg:justify-start mt-6">
						<a href="https://twitter.com/musakui_dev" class="flex gap-2 items-center p-4 py-2 rounded font-semibold text-white bg-[#1DA1F2]">
							<svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="M24 4.6a10 10 0 0 1-2.9.7 5 5 0 0 0 2.2-2.7c-1 .6-2 1-3.1 1.2a5 5 0 0 0-8.4 4.5A14 14 0 0 1 1.6 3.2 4.8 4.8 0 0 0 1 5.6a5 5 0 0 0 2.2 4.1 4.9 4.9 0 0 1-2.3-.6A5 5 0 0 0 5 14a5 5 0 0 1-2.2 0 5 5 0 0 0 4.6 3.5 9.9 9.9 0 0 1-6.1 2.1H0a14 14 0 0 0 7.6 2.2c9 0 14-7.5 14-14V7A10 10 0 0 0 24 4.6z" />
							</svg>
							<span class="text-sm">@musakui_dev</span>
						</a>
					</div>
				</div>
			</div>
			<div class="hidden lg:block lg:w-1/2">
				<div class="h-full main-background">
					<div class="h-full bg-gray-700/50"></div>
					<span class="fixed bottom-0 right-0 p-2 text-xs text-gray-400">
						Photo by <a href="https://unsplash.com/@richardtao28">Richard Tao</a>
						on <a href="https://unsplash.com/photos/iM5bGdqB2Gg">Unsplash</a>
					</span>
				</div>
			</div>
		</div>
	</main>
	<div v-if="dev" class="absolute bottom-0 right-0 p-4">
		<RouterLink to="/search/">search →</RouterLink>
	</div>
</template>

<script setup>
const dev = !!import.meta.hot
</script>

<style>
.main-background {
  background-position: bottom right;
  background-image: url(https://images.unsplash.com/photo-1584830243587-bb9a6d3b3086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=70);
}
</style>