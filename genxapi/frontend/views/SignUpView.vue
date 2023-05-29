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
						<h1 class="text-h5 mb-6">Cadastro</h1>
						<p class="mb-4 text-medium-emphasis text-body-2">
							Já possui uma conta? <RouterLink to="/login" class="text-decoration-none text-info">Clique aqui para entrar.</RouterLink>
						</p>
						<v-form ref="formRef" v-model="form" @submit.prevent="onSubmit">
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="nome"
										:rules="[rules.obrigatorio]"
										color="green"
										label="Nome"
										required
										clearable
										/>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="senha"
										:append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
										:rules="[rules.password, rules.length(8)]"
										variant="filled"
										color="green"
										counter
										hint="No mínimo 8 caracteres"
										label="Senha"
										:type="show1 ? 'text' : 'password'"
										@click:appendInner="show1 = !show1"
										/>
								</v-col>
								<v-col cols="12" md="6">
									<v-text-field
										v-model="confirmarSenha"
										:rules="[rules.password, rules.length(8)]"
										:append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
										color="green"
										counter
										hint="No mínimo 8 caracteres"
										label="Confirmar Senha"
										:type="show2 ? 'text' : 'password'"
										class="input-group--focused"
										@click:appendInner="show2 = !show2"
										/>
								</v-col>
								<v-col cols="12">
									<v-text-field
										v-model="email"
										:rules="[rules.email]"
										variant="filled"
										color="green"
										label="Email"
										type="email"
										clearable
										/>
								</v-col>
							</v-row>
							<v-checkbox
								v-model="agreement"
								:rules="[rules.required]"
								color="green"
								>
								<template v-slot:label>
									Eu li e aceito&nbsp;
									<a href="#" @click.stop.prevent="dialog = true">os termos de serviço</a>
									&nbsp;e&nbsp;
									<a href="#" @click.stop.prevent="dialog = true">a ploítica de privacidade</a>*
								</template>
							</v-checkbox>
						</v-form>
						<v-divider/>
						<v-card-actions>
							<v-btn variant="text" @click="formReset">
								Limpar
							</v-btn>
							<v-spacer/>
							<v-btn :loading="isLoading" color="green-accent-4" @click="onSubmit">
								Cadastrar
							</v-btn>
						</v-card-actions>
						<v-dialog
							v-model="dialog"
							max-width="400"
							persistent
							>
							<v-card>
								<v-card-title class="text-h5 bg-grey-lighten-3">
									Legal
								</v-card-title>
								<v-card-text>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</v-card-text>
								<v-divider/>
								<v-card-actions>
									<v-btn variant="text" @click="agreement = false, dialog = false">
										Não
									</v-btn>
									<v-spacer/>
									<v-btn color="green" variant="tonal" @click="agreement = true, dialog = false">
										Sim
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
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

	export default {
		name: "SignUpView",
		setup(){
			const appStore = useAppStore();
			const nome = ref("");
			const agreement = ref(false);
			const dialog = ref(false);
			const email = ref("");
			const form = ref(false);
			const formRef = ref(null);
			const isLoading = ref(false);
			const senha = ref("");
			const confirmarSenha = ref("");
			const show1 = ref(false);
			const show2 = ref(true);

			const rules = {
				obrigatorio: (v: any) => !!v || "Campo obrigatório",
				email: (v: any) => !!(v || "").match(/@/) || "Entre um endereço de email válido",
				length: (len: number) => (v: any) => (v || "").length >= len || `Invalid character length, required ${len}`,
				password: (v: any) => !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/)
					|| "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um caractere númerico e um caractere especial",
				required: (v: any) => !!v || "Este campo é obrigatório",
			};

			const onSubmit = async(event: any) => {
				if((formRef.value as any).validate()){
					appStore.carregandoRouterView = true;
					isLoading.value = true
					axios.post("/api/signup/", {
						name: nome.value,
						email: email.value,
						password1: senha.value,
						password2: senha.value,
					})
						.then((response) => {
							if(response.data.message === "success"){
								console.log("Usuario registrado");
							}
							else{
								console.log("Algo deu errado");
							}
						})
						.catch((error) => {
							console.log("error", error);
						})
						.finally(() => {
							appStore.carregandoRouterView = false;
							isLoading.value = false
						});
				}
			};
			const formReset = () => {
				if(formRef.value){
					(formRef.value as any).reset();
				}
			};

			return {
				formRef,
				nome,
				agreement,
				dialog,
				confirmarSenha,
				email,
				form,
				senha,
				isLoading,
				show1,
				show2,
				rules,
				onSubmit,
				formReset,
			};
		},
	};
</script>
