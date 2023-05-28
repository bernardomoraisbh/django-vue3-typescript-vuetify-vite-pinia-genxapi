<template>
	<v-app-bar class="AppBar" :elevation="1">
		<v-app-bar-nav-icon @click="$emit('navIconClicked')" />
		<h2 @click="$router.push({ path: 'home' })" @keydown.enter="$router.push({ path: 'home' })">Exercise Generator</h2>
	</v-app-bar>
</template>

<script setup lang="ts">
	import { useTheme } from "vuetify";

	import { useUserStore } from "@/store/user";

	export default {
		setup(){
			const theme = useTheme();
			const userStore = useUserStore();
			return {
				theme,
				toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
			}
		},
	}
</script>

<style lang="scss">
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

::-webkit-scrollbar-thumb {
	background: var(--primary);
	border-radius: 8px;
}

::-webkit-scrollbar-track {
	background: var(--gray100);
	border-radius: 8px;
}
</style>
