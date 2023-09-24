import { Taplo } from "@taplo/lib";
import type { Parser, Printer, SupportLanguage } from "prettier";

import type { AST } from "./types";

const LANGUAGE = "toml";
const PARSER = "taplo";
const AST_NAME = "taplo-ast";

let taplo: Taplo | null = null;

async function format(code: string) {
	if (!taplo) {
		taplo = await Taplo.initialize();
	}

	return taplo.format(code);
}
function removeBeginningTrailingNewline(code: string) {
	code = code.replace(/^(?:\r?\n)+/, "");
	code = code.replace(/(?:\r?\n)+$/, "");

	return code;
}

const parse: Parser<AST>["parse"] = async (code) => ({
	formatted: await format(removeBeginningTrailingNewline(code)),
});

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
