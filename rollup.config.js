import alias from "rollup-plugin-alias";
import typescript from "rollup-plugin-typescript2";
import prettier from "rollup-plugin-prettier";

const pluginsAndSo = {
  plugins: [
    typescript(/*{ plugin options }*/),
    alias({
      react: "node_modules/react/umd/react.development.js",
    }),
    prettier(),
  ],
  external: ["react"],
  globals: {
    react: "React",
  },
};

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./build/index.js",
      format: "umd",
      name: "ReactKV",
    },
  },

  {
    input: "./src/Grid/index.tsx",
    output: {
      file: "./build/Grid.js",
      format: "umd",
      name: "ReactKVGrid",
    },
  },
  {
    input: "./src/Table/index.tsx",
    output: {
      file: "./build/Table.js",
      format: "umd",
      name: "ReactKVTable",
    },
  },
  {
    input: "./src/List/index.tsx",
    output: {
      file: "./build/List.js",
      format: "umd",
      name: "ReactKVList",
    },
  },
].map(value => Object.assign(value, pluginsAndSo));
