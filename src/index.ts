import type { Parser, Printer, SupportLanguage } from "prettier";
import { doc } from "prettier";
import { createSyncFn } from "synckit";

import type { AST } from "./types";

const LANGUAGE = "toml";
const PARSER = "taplo";
const AST_NAME = "taplo-ast";

const { group } = doc.builders;

const format = createSyncFn(require.resolve("./worker.cjs"));
function removeBeginningTrailingNewline(code: string) {
	code = code.replace(/^(?:\r?\n)+/, "");
	code = code.replace(/(?:\r?\n)+$/, "");

	return code;
}

const parse: Parser["parse"] = (code): AST => ({
	type: "Program",
	code,
	loc: { start: 0, end: code.length },
	range: [0, code.length],
	body: [],
	comments: [],
	tokens: [],
});

const print: Printer<AST>["print"] = (path) => {
	const { code } = path.node;
	const formatted = format(removeBeginningTrailingNewline(code));

	return group([formatted]);
};

export const languages = [
	{
		name: LANGUAGE,
		parsers: [PARSER],
	} as SupportLanguage,
];

export const parsers = {
	[PARSER]: {
		parse,
		astFormat: AST_NAME,
	} as Parser,
};

export const printers = {
	[AST_NAME]: {
		print,
	} as Printer,
};
