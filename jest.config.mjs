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
};
