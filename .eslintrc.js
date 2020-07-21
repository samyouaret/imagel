module.exports = {
    parser: "babel-eslint",
    plugins: ["react", "react-hooks", "jsx-a11y", "import"],
    rules: {
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react-hooks/rules-of-hooks": 'error',
        "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
    }
};
