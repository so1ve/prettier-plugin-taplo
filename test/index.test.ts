import { format } from "prettier";
import { describe, expect, it } from "vitest";

const testFormat = async (code: string) =>
	await format(code, {
		plugins: ["./dist/index.cjs"],
		parser: "taplo",
	});

describe("should", () => {
	it("exported", async () => {
		await expect(
			testFormat(`
[foo]  
asfd=            1
`),
		).resolves.toMatchSnapshot();
	});
});
