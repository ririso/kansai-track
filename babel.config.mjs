export default {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript", // TS + TSX
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
