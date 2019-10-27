import {expectType} from "tsd";
import joinArray = require(".");

expectType<string>(joinArray([0, 1, " " , 2, 3]));
expectType<string>(joinArray([0, "x", " " , 2, 3], ";"));
expectType<string>(joinArray([1, null, 2, 0, undefined, false], "-", {ignoreWhiteSpace: true}));
expectType<string>(joinArray([1, 2, , 4, 5], ",", {trimEntries: true}));
expectType<string>(joinArray([1, null, 2, 0, undefined, false], ",", {ignoreFalsy: true}));
expectType<string>(joinArray(["a", NaN, "z", 0, , "", true, false], ";", {appendJoiner: true}));
expectType<string>(joinArray([0, 1, " ", [" 3", null, [, 5, undefined, [, 7]]]], ",", {flattenDepth: 2}));
expectType<string>(joinArray(
  [1, 2, , undefined, null, " ", 0],
  "x",
  {
    ignoreWhiteSpace: true,
    trimEntries: true,
    ignoreFalsy: true,
    appendJoiner: true
  }
));
