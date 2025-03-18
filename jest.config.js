export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
