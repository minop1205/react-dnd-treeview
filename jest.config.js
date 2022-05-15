module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "\\.tsx?$": "ts-jest",
    "\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-dnd|react-dnd-html5-backend|react-dnd-touch-backend)/)",
  ],
  testRegex: "\\.(test|spec).(tsx?|jsx?)$",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
