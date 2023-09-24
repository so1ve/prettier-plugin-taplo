import { Taplo } from "@taplo/lib";
import type { Parser, Printer, SupportLanguage } from "prettier";

import type { AST, PrettierOptions, TaploOptions } from "./types";

const LANGUAGE = "toml";
const PARSER = "taplo";
const AST_NAME = "taplo-ast";

let taplo: Taplo | null = null;

async function format(code: string, options: TaploOptions) {
	if (!taplo) {
		taplo = await Taplo.initialize();
	}

	return taplo.format(code, { options });
}
function removeBeginningTrailingNewline(code: string) {
	code = code.replace(/^(?:\r?\n)+/, "");
	code = code.replace(/(?:\r?\n)+$/, "");

	return code;
}
async function parse(code: string, options: PrettierOptions) {
	const indentString = options.useTabs ? "\t" : " ".repeat(options.tabWidth);

	const taploOptions: TaploOptions = {
		alignEntries: options.taploAlignEntries,
		alignComments: options.taploAlignComments,
		arrayTrailingComma: options.trailingComma !== "none",
		arrayAutoExpand: options.taploArrayAutoExpand,
		arrayAutoCollapse: options.taploArrayAutoCollapse,
		compactArrays: options.taploCompactArrays,
		compactInlineTables: options.taploCompactInlineTables,
		compactEntries: options.taploCompactEntries,
		columnWidth: options.printWidth,
		indentTables: options.taploIndentTables,
		indentEntries: options.taploIndentEntries,
		indentString,
		trailingNewline: true,
		reorderKeys: options.taploReorderKeys,
		allowedBlankLines: 1,
		crlf: options.endOfLine === "crlf",
	};

	return {
		formatted: await format(removeBeginningTrailingNewline(code), taploOptions),
	};
}

const print: Printer<AST>["print"] = ({ node: { formatted } }) => formatted;

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

export { defaultOptions, options } from "./options";
