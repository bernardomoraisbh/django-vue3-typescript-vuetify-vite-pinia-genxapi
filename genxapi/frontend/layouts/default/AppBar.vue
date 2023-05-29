<template>
	<v-app-bar flat :elevation="1">
		<v-app-bar-nav-icon @click="handleClickNavIcon" />
		<v-app-bar-title @click="goToHome" @keydown.enter="goToHome">
			Exercise Generator
		</v-app-bar-title>
		<v-spacer/>
		<v-btn v-if="isAuthenticated" @click="logout">
			<span class="mr-2">Sair</span>
			<v-icon icon="mdi-logout"/>
		</v-btn>
		<v-btn v-else @click="login">
			<span class="mr-2">Entrar</span>
			<v-icon icon="mdi-login"/>
		</v-btn>
		<v-tooltip location="bottom">
			<template v-slot:activator="{ props }">
				<v-btn icon v-bind="props" @click="toggleTheme">
					<v-icon :icon="isDarkTheme ? 'mdi-theme-light-dark' : 'mdi-theme-light-dark'" :style="{ transform: `rotate(${isDarkTheme ? 0 : -190}deg)` }" />
				</v-btn>
			</template>
			<span>{{ `Modo ${(isDarkTheme ? 'claro' : 'escuro')}`}}</span>
		</v-tooltip>
	</v-app-bar>
</template>

<script lang="ts" setup>
	import { computed, ref } from "vue";

	import { useRouter } from "vue-router";

	import { useTheme } from "vuetify";

	const emit = defineEmits({ navIconClicked: null })
	const router = useRouter();
	const isAuthenticated = ref(false);
	const theme = useTheme();

	const goToHome = () => {
		router.push({ path: "/" })
	};
	const login = () => {
		router.push({ path: "login" })
	};
	const logout = () => {
		router.push({ path: "logout" })
	};
	const toggleTheme = () => {
		theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
	};
	const isDarkTheme = computed(() => {
		return theme.name.value === "dark"
	});
	const handleClickNavIcon = () => {
		emit("navIconClicked");
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
