<template>
	<v-app>
		<AppBar :value="drawer" @navIconClicked="navbarDrawerClicked" />
		<v-navigation-drawer
			app
			clipped
			height="100%"
			v-model="drawer"
			/>
		<View />
	</v-app>
</template>

<script lang="ts" setup>
	import axios from "axios";

	import { onBeforeMount, onMounted, ref, watch } from "vue";

	import { useDisplay } from "vuetify";

	import AppBar from "./AppBar.vue";

	import { useUserStore } from "@/store/user";

	import View from "./View.vue";

	const DRAWER_STORAGE = "drawerOpened";
	const user = useUserStore();
	const { lgAndUp } = useDisplay();
	const drawer = ref(false);

	const carregaDrawerPrevio = () => {
		const localStorageDrawer = localStorage.getItem(DRAWER_STORAGE);
		if(localStorageDrawer !== null){
			drawer.value = JSON.parse(localStorageDrawer);
		}
		else{
			drawer.value = true;
		}
	};
	const verificaTamanhoTela = () => {
		if(lgAndUp){
			drawer.value = true;
			carregaDrawerPrevio();
		}
		else{
			drawer.value = false;
		}
	};
	const navbarDrawerClicked = () => {
		drawer.value = !drawer.value;
	}

	onBeforeMount(() => {
		user.initStore();
		const token = user.getAccess;
		if(token){
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		}
		else{
			axios.defaults.headers.common.Authorization = "";
		}
	});
	onMounted(() => {
		verificaTamanhoTela();
	});

	watch(lgAndUp, verificaTamanhoTela);
	watch(drawer, (newCount) => {
		localStorage.setItem(DRAWER_STORAGE, newCount.toString());
	});
</script>
