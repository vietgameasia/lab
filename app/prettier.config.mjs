/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 80,
  semi: false,
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
