/// <reference lib="dom" />
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
	state: () => ({
		carregandoGlobal: false,
		carregandoRouterView: false,
	}),
	getters: {
		getCarregandoGlobal: (state) => (state.carregandoGlobal),
		getCarregandoRouterView: (state) => (state.carregandoRouterView),
	},
	actions: {
	},
});
