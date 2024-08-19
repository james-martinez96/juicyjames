export default [
    {
        files: ["**/*.js"], // Adjust to match your files
        languageOptions: {
            ecmaVersion: "latest", // Set the ECMAScript version
            sourceType: "module",  // Common values are "module" or "script"
            globals: {
                // Define global variables here
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
