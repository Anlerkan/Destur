module.exports = {
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    plugins: ['import', 'prettier', '@typescript-eslint'],
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    rules: {
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true, allowTemplateLiterals: false
            }
        ],
        "import/prefer-default-export": "off"
    },
    ignorePatterns: ['.eslintrc.js'],
};