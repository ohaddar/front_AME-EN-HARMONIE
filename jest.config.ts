module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy",
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json",
    },
  },
  transformIgnorePatterns: ["node_modules/(?!(react-quill-new)/)"],
};
