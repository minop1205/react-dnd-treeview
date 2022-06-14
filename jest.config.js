export default {
  preset: "ts-jest/presets/js-with-babel",
  roots: ["<rootDir>/src"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-dnd|react-dnd-html5-backend|react-dnd-touch-backend)/)",
  ],
  testRegex: "\\.(test|spec).(tsx?|jsx?)$",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
