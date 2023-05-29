/* eslint-disable import/no-extraneous-dependencies */
/// <reference lib="dom" />
import axios from "axios";
import { defineStore } from "pinia";

declare const localStorage: Storage;

interface User {
	id: number,
	name: string,
	email: string,
	access: string,
	refresh: string,
	telefone: string,
	turma: number,
	isAuthenticated: boolean,
}

export const useUserStore = defineStore("usuario", {
	state: () => ({
		user: {
			id: 0,
			name: "Bernardo Morais",
			email: "",
			access: "",
			refresh: "",
			telefone: "",
			turma: 0,
			isAuthenticated: false,
		} as User | null,
	}),
	getters: {
		getAccess: (state) => state.user?.access,
		getName: (state) => state.user?.name,
		getEmail: (state) => state.user?.email,
		getRefresh: (state) => state.user?.refresh,
		getTelefone: (state) => state.user?.telefone,
		getTurma: (state) => state.user?.turma,
		isAuthenticated: (state) => state.user?.isAuthenticated,
		getUser: (state) => state.user,
	},
	actions: {
		initStore(){
			if(localStorage.getItem("user.access")){
				this.user = {
					access: localStorage.getItem("user.access") as string,
					refresh: localStorage.getItem("user.refresh") as string,
					id: parseInt(localStorage.getItem("user.id") as string, 10),
					name: localStorage.getItem("user.nome") as string,
					email: localStorage.getItem("user.email") as string,
					isAuthenticated: true,
					telefone: localStorage.getItem("user.telefone") as string,
					turma: parseInt(localStorage.getItem("user.turma") as string, 10),
				};
				this.refreshToken();
			}
		},
		setToken(payload: { access: string | null; refresh: string | null; }){
			if(this.user){
				this.user.access = payload.access as string;
				this.user.refresh = payload.refresh as string;
				this.user.isAuthenticated = true;
				localStorage.setItem("user.access", payload.access as string);
				localStorage.setItem("user.refresh", payload.refresh as string);
			}
		},
		reset(){
			this.user = ({
				access: "",
				refresh: "",
				id: 0,
				name: "",
				email: "",
				isAuthenticated: false,
				telefone: "",
				turma: 0,
			});
			localStorage.setItem("user.access", "");
			localStorage.setItem("user.refresh", "");
			localStorage.setItem("user.id", "");
			localStorage.setItem("user.nome", "");
			localStorage.setItem("user.email", "");
			localStorage.setItem("user.telefone", "");
			localStorage.setItem("user.turma", "");
		},
		setUserInfo(payload: { id: number; name: string; email: string; }){
			if(this.user){
				this.user.id = payload.id;
				this.user.name = payload.name;
				this.user.email = payload.email;
				localStorage.setItem("user.id", String(payload.id));
				localStorage.setItem("user.nome", payload.name as string);
				localStorage.setItem("user.email", payload.email as string);
			}
		},
		refreshToken(){
			axios
				.post("/api/refresh/", {
					refresh: this.getRefresh,
				})
				.then((response) => {
					if(this.user){
						this.user.access = response.data.access;
						localStorage.setItem("user.access", response.data.access);
						axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
					}
				})
				.catch((error) => {
					console.log(error);
					this.reset();
				});
		},
	},
});
