import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"~": resolve(__dirname, "src"),
		},
	},
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: "unit",
					globals: true,
					environment: "jsdom",
					include: ["src/**/*.{test,spec}.{ts,tsx}"],
				},
			},
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: resolve(__dirname, ".storybook"),
						storybookScript: "npm run storybook -- --no-open",
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						provider: playwright({}),
						headless: true,
						instances: [{ browser: "chromium" }],
					},
				},
			},
		],
	},
});
