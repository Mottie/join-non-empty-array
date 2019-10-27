import test from "ava";
import j from ".";

test("default", t => {
	t.is(j([0, 1, 2, 3, 4, 5]), "0,1,2,3,4,5");
	t.is(j([0, 1, 2, , 4, 5]), "0,1,2,4,5");
	t.is(j([0, 1, 2, , 4, 5], ","), "0,1,2,4,5");
	t.is(j([0, 1, 2, , 4, 5], "x"), "0x1x2x4x5");
	t.is(j([0, , 2, , 4, , 6], ", "), "0, 2, 4, 6");
	t.is(j([0, 1, , , , 4, , , ""], ";"), "0;1;4");
	t.is(j([0, "a", "b", "", "d", "", "f"], "-"), "0-a-b-d-f");
	t.is(j([0, "a", , "", "d", "", "f"], ""), "0adf");
	t.is(j([0, 1, null, 2, 0, undefined, false]), "0,1,null,2,0,undefined,false");
});

test("trim whitespace", t => {
	const opts = {ignoreWhiteSpace: true};
	t.is(j([0, 1, " ", 2, "     ", 4], ",", opts), "0,1,2,4");
	t.is(j([0, "a  ", "\t\n", "  b", "", "d"], ";", opts), "0;a  ;  b;d");
});

test("trim entries", t => {
	const opts = {trimEntries: true};
	t.is(j([0, 1, " ", 2, "     ", 4], ",", opts), "0,1,2,4");
	t.is(j([0, "a  ", "\t\n", "  b", "", "d"], ";", opts), "0;a;b;d");
});

test("ignore falsy entries", t => {
	const opts = {ignoreFalsy: true};
	t.is(j([0, 1, null, 2, 0, undefined, false], ",", opts), "0,1,2,0");
	t.is(j([0, "a", NaN, "z", 0, , "", true, false], ";", opts), "0;a;z;0;true");
});

test("append joiner", t => {
	const opts = {appendJoiner: true};
	t.is(j([0, 1, 2, , 4, 5], ",", opts), "0,1,2,4,5,");
	t.is(j(["color:red", "", "border:blue"], ";", opts), "color:red;border:blue;");
});

// Nested array example
const array = [0, , 1, " ", [" 3", null, [, 5, undefined, [, 7]]]];

test("flatten nested arrays", t => {
	// Option flattenDepth set to Infinity by default; flatten removes empty slots
	t.is(j(array, "x"), "0x1x x 3xnullx5xundefinedx7");
	const opts = {flattenDepth: 0};
	t.is(j(array, "x", opts), "0x1x x 3,,,5,,,7");
	opts.flattenDepth = 1;
	t.is(j(array, "x", opts), "0x1x x 3xnullx,5,,,7");
	opts.flattenDepth = 3;
	t.is(j(array, "x", opts), "0x1x x 3xnullx5xundefinedx7");
	opts.flattenDepth = 2;
	t.is(j(array, "x", opts), "0x1x x 3xnullx5xundefinedx,7");
	opts.ignoreWhiteSpace = true;
	t.is(j(array, "x", opts), "0x1x 3xnullx5xundefinedx,7");
	opts.trimEntries = true;
	t.is(j(array, "x", opts), "0x1x3xnullx5xundefinedx,7");
	opts.ignoreFalsy = true;
	t.is(j(array, "x", opts), "0x1x3x5x,7");
	opts.appendJoiner = true;
	t.is(j(array, "x", opts), "0x1x3x5x,7x");
	opts.flattenDepth = Infinity;
	t.is(j(array, "x", opts), "0x1x3x5x7x");
});

test("the works", t => {
	const opts = {
		ignoreWhiteSpace: true,
		trimEntries: true,
		ignoreFalsy: true,
		appendJoiner: true,
		flattenDepth: Infinity
	};
	t.is(j([1, 2, 3, 4, 5], ",", opts), "1,2,3,4,5,");
	t.is(j([1, 2, , 4, 5, 0], "x", opts), "1x2x4x5x0x");
	t.is(j([1, , NaN, "               ", , 4, , , "\t"], ";", opts), "1;4;");
	t.is(j([1, " ", "2\n\r", false, "  \t   ", 4], ",", opts), "1,2,4,");
	t.is(j(["\na", "b\n", "   ", "d\t", "\t\n", "\tf\n "], "-", opts), "a-b-d-f-");
	t.is(j(["a  ", "\t\n", "  b", "", "d"], ";", opts), "a;b;d;");
	t.is(j(array, ",", opts), "0,1,3,5,7,");
});
