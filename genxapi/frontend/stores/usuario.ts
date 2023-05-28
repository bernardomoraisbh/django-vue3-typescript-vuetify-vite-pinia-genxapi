/* eslint-disable import/no-extraneous-dependencies */
/// <reference lib="dom" />
import axios from "axios";
import { defineStore } from "pinia";

declare const localStorage: Storage;

export const useUsuarioStore = defineStore("usuario", {
	state: () => ({
		isAuthenticated: false,
		id: null,
		nome: "Bernardo Morais",
		email: "",
		access: null,
		refresh: null,
		telefone: "",
		turma: "",
	}),
	getters: {
		getAccess: (state) => state.access,
		getNome: (state) => state.nome,
		getEmail: (state) => state.email,
		getRefresh: (state) => state.refresh,
		getTelefone: (state) => state.telefone,
		getTurma: (state) => state.turma,
		isAuthenticated: (state) => state.isAuthenticated,
		getUsuario: (state) => state,
	},
	actions: {
		initStore(){
			if(localStorage.getItem("user.access")){
				this.setUsuario({
					access: localStorage.getItem("user.access"),
					refresh: localStorage.getItem("user.refresh"),
					id: localStorage.getItem("user.id"),
					nome: localStorage.getItem("user.nome"),
					email: localStorage.getItem("user.email"),
					isAuthenticated: true,
					telefone: localStorage.getItem("user.telefone"),
					turma: localStorage.getItem("user.turma"),
				});
				this.refreshToken();
			}
		},
		setToken(payload){
			this.access = payload.access;
			this.refresh = payload.refresh;
			this.isAuthenticated = true;
			localStorage.setItem("user.access", payload.access);
			localStorage.setItem("user.refresh", payload.refresh);
		},
		removeToken(){
			this.setUsuario({
				access: null,
				refresh: null,
				id: false,
				nome: null,
				email: null,
				isAuthenticated: false,
				telefone: null,
				turma: null,
			});
			localStorage.setItem("user.access", "");
			localStorage.setItem("user.refresh", "");
			localStorage.setItem("user.id", "");
			localStorage.setItem("user.nome", "");
			localStorage.setItem("user.email", "");
			localStorage.setItem("user.telefone", "");
			localStorage.setItem("user.turma", "");
		},
		setUserInfo(payload){
			this.id = payload.id;
			this.nome = payload.nome;
			this.email = payload.email;
			localStorage.setItem("user.id", payload.id);
			localStorage.setItem("user.nome", payload.nome);
			localStorage.setItem("user.email", payload.email);
		},
		refreshToken(){
			axios
				.post("/api/refresh/", {
					refresh: this.getRefresh,
				})
				.then((response) => {
					this.setAccess(response.data.access);
					localStorage.setItem("user.access", response.data.access);
					axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
				})
				.catch((error) => {
					console.log(error);
					this.removeToken();
				});
		},
	},
});
