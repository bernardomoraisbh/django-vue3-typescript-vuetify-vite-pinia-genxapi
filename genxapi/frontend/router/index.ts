import { createRouter, createWebHistory } from "vue-router";
import LogInView from "../views/LogInView.vue";

const routes = [
	{
		path: "/",
		component: () => import("@/layouts/default/DefaultLayout.vue"),
		children: [
			{
				path: "",
				name: "Home",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
			},
			{
				path: "/login",
				name: "login",
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
