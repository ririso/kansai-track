export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // TSX / JSX / JS を Babel で変換
  },
  transformIgnorePatterns: ["/node_modules/(?!(lucide-react)/)"], // ESM モジュールも変換
  // CI環境での安定性向上
  maxWorkers: process.env.CI ? 1 : "50%",
  testTimeout: process.env.CI ? 30000 : 5000,
  bail: process.env.CI ? 1 : 0,
  verbose: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/node_modules/**",
  ],
};
