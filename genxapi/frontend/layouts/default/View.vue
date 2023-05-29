<template>
	<v-main>
		<v-overlay
			z-index="1"
			:model-value="appStore.getCarregandoRouterView"
			class="align-center justify-center"
			>
			<v-progress-circular
				color="primary"
				indeterminate
				size="64"
				/>
		</v-overlay>
		<router-view/>
	</v-main>
</template>

<script lang="ts" setup>
  //
	import { useAppStore } from "@/store/app";

	const appStore = useAppStore();
</script>
