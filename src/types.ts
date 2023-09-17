export interface AST {
	type: "Program";
	code: string;
	loc: { start: number; end: number };
	range: [number, number];
	body: [];
	comments: [];
	tokens: [];
}
