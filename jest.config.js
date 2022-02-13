module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "\\.(test|spec).(tsx?|jsx?)$",
  testEnvironment: "jsdom",
};
