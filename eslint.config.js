export default [
    {
        files: ["**/*.js"],
        ignores: ["static/"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                window: "readonly",
                document: "readonly",
            },
        },
        rules: {
            "no-console": "warn",
            "semi": ["error", "always"],
            "space-before-function-paren": ["error", "never"],
            "indent": ["error", 4],
            "object-curly-spacing": ["error", "never"],
            "array-bracket-spacing": ["error", "never"],
        },
    },
];
