/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

const path = require("node:path")
const createAliasSetting = require("@vue/eslint-config-airbnb/createAliasSetting")

module.exports = {
	root: true,
	env: {
		node: true,
	},
	plugins: ["import"],
	"extends": [
		"plugin:vue/vue3-essential",
		"@vue/eslint-config-airbnb",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier/skip-formatting"
	],
	parserOptions: {
		ecmaVersion: "latest"
	},
	settings: {
		// ...createAliasSetting({
		// 	"@": `${path.resolve(__dirname, "./frontend")}`
		// }),
		"import/resolver": {
			typescript: {},
			alias: [
				["@", "./frontend"],
			],
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
			},
		},
	},
	rules: {
		"import/no-unresolved": "error",
		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
		"arrow-body-style": "off",
		"object-curly-newline": ["off", { multiline: true, minProperties: 2 }],
		"space-unary-ops": [2, { words: true, nonwords: false }],
		"space-infix-ops": ["error", { int32Hint: false }],
		"no-restricted-imports": ["error", {
			patterns: [".*.ts",".*.js", ".*.vue"],
		}],
		"no-undef": "error",
		"no-extra-boolean-cast": "error",
		"no-multi-spaces": ["error", { exceptions: { ObjectExpression: true, ImportDeclaration: true } }],
		"no-restricted-syntax": ["off", "ForOfStatement"],
		"brace-style": ["error", "stroustrup"],
		"space-before-blocks": ["error", "never"],
		"no-param-reassign": ["error", { props: false }],
		"keyword-spacing": ["error", {
			overrides: {
				if: { after: false },
				else: { after: false },
				for: { after: false },
				while: { after: false },
				static: { after: false },
			},
		}],
		camelcase: "off",
		"no-underscore-dangle": "off",
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-tabs": 0,
		"prefer-destructuring": ["off"],
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"vue/html-indent": ["error", "tab", {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 1,
			alignAttributesVertically: true,
			ignores: [],
		}],
		"vue/html-self-closing": ["error", {
			html: {
				void: "always",
				normal: "always",
				component: "always",
			},
			svg: "always",
			math: "always",
		}],
		"vue/max-attributes-per-line": ["error", {
			singleline: {
				max: 7,
			},
			multiline: {
				max: 7,
			},
		}],
		"vue/no-unused-components": ["warn", {
			ignoreWhenBindingPresent: true,
		}],
		indent: ["error", "tab", { SwitchCase: 1 }],
		quotes: ["error", "double"],
		"vue/script-indent": ["error", "tab", {
			baseIndent: 1,
			switchCase: 1,
			ignores: [],
		}],
		"space-before-function-paren": ["error", "never"],
		"vue/singleline-html-element-content-newline": "off",
		"max-len": "off",
		eqeqeq: "off",
		"import/prefer-default-export": "off",
		"vue/max-len": ["error", {
			code: 200,
			comments: 9000,
			template: 9000,
			ignoreTemplateLiterals: true,
			ignoreUrls: true,
			ignoreStrings: true,
		}],
		"vue/valid-v-slot": ["error", {
			allowModifiers: true,
		}],
		"no-unused-vars": "off",
		"vue/no-unused-properties": ["warn", {
			groups: ["props", "data", "computed", "methods", "setup"],
			deepData: false,
			ignorePublicMembers: true,
		}],
		"vue/this-in-template": ["error", "never"],
		"vue/no-empty-component-block": "error",
		"vue/component-name-in-template-casing": ["warn", "PascalCase", {
			registeredComponentsOnly: true,
			ignores: [],
		}],
		"vue/match-component-file-name": ["error", {
			extensions: ["jsx", "vue"],
			shouldMatchCase: true,
		}],
	},
	"overrides": [
		{
			"files": [ "frontend/**/*.vue" ],
			"rules": {
				"indent": "off"
			}
		}
	]
}
