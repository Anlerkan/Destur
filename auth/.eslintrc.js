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
        "import/prefer-default-export": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "no-underscore-dangle": ["error", { "allow": ["_id", "_update"] }],
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
    ignorePatterns: ['.eslintrc.js'],
};