// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/iconsets/mdi";


export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "dark",
		themes: {
			dark: {
				dark: true,
				colors: {
					primary: "#1689E7",
					accent: "#4CBB99",
					secondary: "#7BC6FF",
					success: "#4CAF50",
					info: "#2196F3",
					warning: "#FB8C00",
					error: "#FF5252",
				},
			},
			light: {
				dark: false,
				colors: {
					primary: "#1689E7",
					accent: "#4CBB99",
					secondary: "#7BC6FF",
					success: "#4CAF50",
					info: "#2196F3",
					warning: "#FB8C00",
					error: "#FF5252",
				},
			},
		},
	},
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			fa,
			mdi,
		},
	},
});
