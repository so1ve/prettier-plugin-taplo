# ⚠⚠⚠ ACHIEVED, moved into https://github.com/un-ts/prettier/tree/master/packages/toml

---

# prettier-plugin-taplo

[![NPM version](https://img.shields.io/npm/v/prettier-plugin-taplo?color=a1b858&label=)](https://www.npmjs.com/package/prettier-plugin-taplo)

Use [taplo](https://taplo.tamasfe.dev) to format your TOML files with [Prettier](https://prettier.io).

## 📦 Installation

```bash
$ npm install prettier-plugin-taplo -D
$ yarn add prettier-plugin-taplo -D
$ pnpm add prettier-plugin-taplo -D
```

## 🚀 Usage

```ts
// .prettierrc.js
module.exports = {
	plugins: [
		// Add this plugin to your prettier config
		"prettier-plugin-taplo",
	],
};
```

## 🎶 Options

```ts
// .prettierrc.js
module.exports = {
	taploAlignEntries: false,
	taploAlignComments: true,
	taploArrayAutoExpand: true,
	taploArrayAutoCollapse: true,
	taploCompactArrays: true,
	taploCompactInlineTables: false,
	taploCompactEntries: false,
	taploIndentTables: false,
	taploIndentEntries: false,
	taploReorderKeys: false,
};
```

Checkout [`./src/options.ts`](./src/options.ts) for more information.

## 📝 License

[MIT](./LICENSE). Made with ❤️ by [Ray](https://github.com/so1ve)
