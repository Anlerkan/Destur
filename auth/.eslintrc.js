module.exports = {
    extends: "airbnb-typescript-prettier",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
};