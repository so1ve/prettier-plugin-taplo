import type { Options } from "prettier";
import { format } from "prettier";
import { describe, expect, it } from "vitest";

import type { PrettierTaploOptions } from "../src/types";

type TestOptions = Options & PrettierTaploOptions;

const testFormat = async (code: string, options?: TestOptions) =>
	await format(code, {
		plugins: ["./dist/index.cjs"],
		parser: "taplo",
		...options,
	});

const testCase = `
[foo]  
asfd=            1
bb=            1
bar=['averyloooooooooooooooooooooooooooooooooooooooooooooooooooong', "arrrrrrrrrrrrrrrrrrrrrrrray",'thatexceedsthemaximumcolumnwidth']
`;

describe("should", () => {
	it("format with default options", async () => {
		await expect(testFormat(testCase)).resolves.toMatchSnapshot();
	});

	it("format with custom options", async () => {
		await expect(
			testFormat(testCase, {
				taploReorderKeys: true,
				taploIndentEntries: true,
				trailingComma: "none",
			}),
		).resolves.toMatchSnapshot();
	});
});
