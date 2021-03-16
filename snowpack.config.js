/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: [
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-postcss",
    [
      "@snowpack/plugin-build-script",
      {
        cmd: "postcss",
        input: [".css"],
        output: [".css"],
      },
    ],
    "@snowpack/plugin-react-refresh",
  ],
  routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
  optimize: {},
  packageOptions: {},
  devOptions: {},
  buildOptions: {},
};
