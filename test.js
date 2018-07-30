import test from "ava";
import j from ".";

test("default", t => {
	t.is(j([1, 2, 3, 4, 5]), "1,2,3,4,5");
	t.is(j([1, 2, , 4, 5]), "1,2,4,5");
	t.is(j([1, 2, , 4, 5], ","), "1,2,4,5");
	t.is(j([1, 2, , 4, 5], "x"), "1x2x4x5");
	t.is(j([, 2, , 4, , 6], ", "), "2, 4, 6");
	t.is(j([1, , , , 4, , , ""], ";"), "1;4");
	t.is(j(["a", "b", "", "d", "", "f"], "-"), "a-b-d-f");
	t.is(j(["a", , "", "d", "", "f"], ""), "adf");
	t.is(j([1, null, 2, 0, undefined, false]), "1,null,2,0,undefined,false");
});

test("trim whitespace", t => {
	const opts = {ignoreWhiteSpace: true};
	t.is(j([1, " ", 2, "     ", 4], ",", opts), "1,2,4");
	t.is(j(["a  ", "\t\n", "  b", "", "d"], ";", opts), "a  ;  b;d");
});

test("trim entries", t => {
	const opts = {trimEntries: true};
	t.is(j([1, " ", 2, "     ", 4], ",", opts), "1,2,4");
	t.is(j(["a  ", "\t\n", "  b", "", "d"], ";", opts), "a;b;d");
});

test("ignore falsy entries", t => {
	const opts = {ignoreFalsy: true};
	t.is(j([1, null, 2, 0, undefined, false], ",", opts), "1,2,0");
	t.is(j(["a", NaN, "z", 0, , "", true, false], ";", opts), "a;z;0;true");
});

test("append joiner", t => {
	const opts = {appendJoiner: true};
	t.is(j([1, 2, , 4, 5], ",", opts), "1,2,4,5,");
	t.is(j(["color:red", "", "border:blue"], ";", opts), "color:red;border:blue;");
});

test("the works", t => {
	const opts = {
		ignoreWhiteSpace: true,
		trimEntries: true,
		ignoreFalsy: true,
		appendJoiner: true
	};
	t.is(j([1, 2, 3, 4, 5], ",", opts), "1,2,3,4,5,");
	t.is(j([1, 2, , 4, 5, 0], "x", opts), "1x2x4x5x0x");
	t.is(j([1, , NaN, "               ", , 4, , , "\t"], ";", opts), "1;4;");
	t.is(j([1, " ", "2\n\r", false, "  \t   ", 4], ",", opts), "1,2,4,");
	t.is(j(["\na", "b\n", "   ", "d\t", "\t\n", "\tf\n "], "-", opts), "a-b-d-f-");
	t.is(j(["a  ", "\t\n", "  b", "", "d"], ";", opts), "a;b;d;");
});
