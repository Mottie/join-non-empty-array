declare namespace joinArray {
  interface Options {
    /**
    Remove white space in array elements before determining if it is empty.
    The elements are *not* modified.
    @default false
    */
    readonly ignoreWhiteSpace?: boolean;

    /**
    Remove white space from all elements in the array before joining.
    @default false
    */
    readonly trimEntries?: boolean;

    /**
    Treat falsy values (except zero!) as an empty element.
    @default false
    */
    readonly ignoreFalsy?: boolean;

    /**
    Append the joiner to the end of the joined array.
    @default false
    */
    readonly appendJoiner?: boolean;

    /**
    Depth to flatten array
    @default Infinity
    */
    readonly flattenDepth?: number;
  }
}

/**
Join non-empty array elements into a string

@returns A string of joined array elements, ignoring or modifying some elements.

@example
```
import joinArray = require("join-non-empty-array");

// params: array, joiner, options
console.log(joinArray([0, 1, " " , 2, 3], ";", {ignoreWhiteSpace: true}));
//=> "0;1;2;3"

const opts = {
  ignoreWhiteSpace: true,
  trimEntries: true,
  ignoreFalsy: true,
  appendJoiner: true,
  flattenDepth: Infinity
};
const array = ["\na", NaN, "b\n", 0, "   ", "d\t", "\t\n", "\tf\n "];
console.log(joinArray(array, "-", opts));
//=> "a-b-0-d-f-"
```
*/
declare function joinArray(
  input: ReadonlyArray<any>,
  joiner?: string,
  options?: joinArray.Options
): string;

export = joinArray;
