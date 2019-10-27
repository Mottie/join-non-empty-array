"use strict";

module.exports = (arry, joiner = ",", options = {}) => {
	return arry
		.flat(options.flattenDepth || Infinity)
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
