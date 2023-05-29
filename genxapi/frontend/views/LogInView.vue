<template>
	<v-container fluid>
		<v-row>
			<!-- login -->
			<v-col cols="12">
				<v-sheet
					elevation="12"
					rounded="lg"
					width="100%"
					class="pa-4 text-center mx-auto"
					>
					<v-card class="mx-auto px-6 py-8" flat>
						<h1 class="text-h5 mb-6">Log in</h1>
						<p class="mb-4 text-medium-emphasis text-body-2">
							Não possui uma conta? <RouterLink to="/cadastro" class="text-decoration-none text-info">Clique aqui para se cadastrar.</RouterLink>
						</p>
						<v-form v-model="form" @submit.prevent="onSubmit">
							<v-text-field
								v-model="email"
								:readonly="loading"
								:rules="[rules.required]"
								class="mb-2"
								clearable
								label="Email"
								color="green"
								/>

							<v-text-field
								v-model="senha"
								:readonly="loading"
								:rules="[rules.required]"
								clearable
								label="Senha"
								placeholder="Digite sua senha"
								color="green"
								:type="show1 ? 'text' : 'password'"
								:append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
								@click:appendInner="show1 = !show1"
								/>

							<br/>

							<v-btn
								:disabled="!form"
								:loading="loading"
								block
								color="success"
								size="large"
								type="submit"
								variant="elevated"
								@click.stop="onSubmit"
								>
								Sign In
							</v-btn>
						</v-form>
					</v-card>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">

	import axios from "axios";

	import { ref } from "vue";

	import { useAppStore } from "@/store/app";

	import { useUserStore } from "@/store/user";

	import router from "@/router";

	export default {
		name: "LogInView",
		setup(){
			const userStore = useUserStore();
			const appStore = useAppStore();
			const email = ref(undefined);
			const form = ref(false);
			const senha = ref(undefined);
			const loading = ref(false);
			const show1 = ref(false);

			const rules = {
				required: (v: any) => !!v || "Este campo é obrigatório",
			};

			const onSubmit = async(event: any) => {
				loading.value = true
				const results = await event
				loading.value = false
				if(results.valid){
					appStore.carregandoRouterView = true;
					try {
						const response = await axios.post("/api/login/", {
							email: email.value,
							password: senha.value,
						});
						userStore.setToken(response.data);
						axios.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
						console.log(response.data.access);
						console.log("Usuário logado");
						const userInfoResponse = await axios.get("/api/me/");
						userStore.setUserInfo(userInfoResponse.data);
						router.push("/");
					}
					catch (error){
						console.log("error", error);
					}
					appStore.carregandoRouterView = false;
				}
			};

			return {
				email,
				form,
				senha,
				loading,
				show1,
				rules,
				onSubmit,
			};
		},
	};
</script>
