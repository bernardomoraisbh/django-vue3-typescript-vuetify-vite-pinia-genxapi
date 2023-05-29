
// Composables
import { createApp } from "vue";

// Utils
import axios from "axios";

// Components
import App from "./App.vue";

// Plugins
import { registerPlugins } from "@/plugins";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const el = document.getElementById("app")

if(el){
	// console.log(el.dataset)
	const data = {...el.dataset} // unpacks unique values
	// console.log(data)
	// <App :token="abc" :user="some-user" />

	const app = createApp(App)
	registerPlugins(app)
	app.mount("#app") // id="app"
}
