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
							Já possui uma conta? <RouterLink to="/login" class="text-decoration-none text-info">Clique aqui para entrar.</RouterLink>
						</p>
					</v-card>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	export default {
		name: "SignUpView",
	};
</script>
