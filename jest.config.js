/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig =  {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.[tj]s$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!nanostores)"
  ],
  globals: {
    "ts-jest": {
      "tsconfig": {
        "allowJs": true
      }
    }
  },
};

export default jestConfig;