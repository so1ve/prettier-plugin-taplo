import type { FormatOptions } from "@taplo/lib";
import type { ParserOptions } from "prettier";

export interface AST {
	formatted: string;
}

export type TaploOptions = NonNullable<FormatOptions["options"]>;
export type PrettierTaploOptions = Omit<
	{
		[K in keyof TaploOptions as `taplo${Capitalize<
			K & string
		>}`]?: TaploOptions[K];
	},
	`taplo${Capitalize<
		| "arrayTrailingComma"
		| "columnWidth"
		| "indentString"
		| "crlf"
		| "trailingNewline"
		| "allowedBlankLines"
	>}`
>;
export type PrettierOptions = ParserOptions<AST> & PrettierTaploOptions;
