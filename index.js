"use strict";

const flat = require("array.prototype.flat");

module.exports = (array, joiner = ",", options = {}) => {
	let arry;
	const depth = isNaN(options.flattenDepth) ? Infinity : options.flattenDepth;
	if (depth) {
		arry = typeof Array.prototype.flat === "function"
			? array.flat(depth)
			: flat(array, depth);
	} else {
		arry = array;
	}
	return arry
		.map(elm => {
			let str;
			if (typeof elm === "number" && !isNaN(elm)) {
				str = String(elm); // Don't treat 0 as falsy
			} else {
				str = String(options.ignoreFalsy ? elm || "" : elm);
			}
			return options.trimEntries ? str.trim() : str;
		})
		.filter(elm => (options.ignoreWhiteSpace ? elm.trim() : elm) !== "")
		.join(joiner) +
		(options.appendJoiner ? joiner : "");
};
