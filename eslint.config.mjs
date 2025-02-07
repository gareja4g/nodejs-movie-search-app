import googleConfig from "eslint-config-google";

export default [
  {
    files: ["*.js"],
    ...googleConfig,
    rules: {
      // **General Code Style Rules**
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "max-len": ["error", 100],
      "no-magic-numbers": ["error", { ignore: [0, 1] }],

      // **Code Quality Rules**
      "no-console": ["warn"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-eval": "error",

      // **Best Practices**
      curly: ["error", "all"],
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "no-var": "error",

      // **Node.js / API Specific**
      "global-require": "error",
      "callback-return": "error",
      "handle-callback-err": "error",

      // **Security / Error Prevention**
      "no-new": "error",
      "no-empty-function": "error",
      "no-process-exit": "error",

      // **Commenting and Documentation**
      "require-jsdoc": [
        "error",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      "valid-jsdoc": "error",
      "arrow-parens": ["error", "always"],
      "prefer-arrow-callback": "error",

      // **Code Formatting**
      indent: ["error", 2],
      "no-trailing-spaces": "error",
      "space-before-blocks": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "keyword-spacing": ["error", { before: true, after: true }],
    },
  },
];
