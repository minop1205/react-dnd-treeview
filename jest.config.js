module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(css)$": "jest-transform-stub",
  },
  testRegex: "\\.(test|spec).(tsx?|jsx?)$",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};
