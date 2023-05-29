import { createRouter, createWebHistory } from "vue-router";
import LogInView from "../views/LogInView.vue";

const routes = [
	{
		path: "/",
		component: () => import("@/layouts/default/DefaultLayout.vue"),
		children: [
			{
				path: "/login",
				name: "login",
				alias: "/",
				component: LogInView,
			},
			{
				path: "/cadastro",
				name: "cadastro",
				component: () => import("../views/SignUpView.vue")
			},
		],
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
