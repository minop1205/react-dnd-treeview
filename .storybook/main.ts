import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.tsx"],
	addons: ["@storybook/addon-themes", "@storybook/addon-vitest"],

	framework: {
		name: "@storybook/react-vite",
		options: {},
	},

	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			tsconfigPath: resolve(__dirname, "../tsconfig.json"),
			exclude: ["**/.storybook/**"],
			shouldExtractLiteralValuesFromEnum: true,
			shouldRemoveUndefinedFromOptional: true,
			propFilter: (prop: { parent?: { fileName: string } }) =>
				!prop.parent?.fileName.includes("node_modules"),
		},
	},

	viteFinal: (config) => {
		config.resolve = config.resolve ?? {};
		config.resolve.alias = {
			...config.resolve.alias,
			"~": resolve(__dirname, "../src"),
		};
		config.define = {
			...config.define,
			"process.env.STORYBOOK_DISABLE_INTERACTIONS": JSON.stringify(
				process.env.STORYBOOK_DISABLE_INTERACTIONS,
			),
		};
		return config;
	},

	staticDirs: ["../src/stories/assets"],
};

export default config;
