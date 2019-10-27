# join-non-empty-array  [![Build Status](https://travis-ci.org/Mottie/join-non-empty-array.svg?branch=master)](https://travis-ci.org/Mottie/join-non-empty-array)

> Join non-empty array elements into a string

## Install

```bash
$ npm install --save join-non-empty-array
```

## Usage

```js
const joinArray = require("join-non-empty-array");

// Join, but ignore the empty element
joinArray([1, , 3, 4]);
//=> "1,3,4"

// Built-in join method
[1, , 3, 4].join();
//=> "1,,3,4"

// Using flat ignores empty slots; but not slots with falsy values
[0, , ' ', undefined, null, 2,3].flat().join();
//=> "0, ,,,2,3"

joinArray([0, , ' ', undefined, null, 2,3]);
//=> "0, ,undefined,null,2,3"

const options = {ignoreFalsy: true, ignoreWhiteSpace: true};
joinArray([0, , ' ', undefined, null, 2,3], options);
//=> "0,2,3"
```

## API

Join an array into a string with options.

### Params

* `array` {**Array**} (Required): Array to join together.
* `joiner` {**String**} (Optional; default = `","`): String used to join elements of the array.
* `options` {**Object**} (Optional).

### Options

#### `ignoreWhiteSpace`

Remove white space in array elements before determining if it is empty. The elements are *not* modified.

_Type: `boolean`_<br />
_default is set to `false`_

```js
const array = [
  "\t", // empty when whitespace is ignored
  "1 ", // not modified
  "\t2" // not modified
];

joinArray(array);
//=> "\t,1 ,\t2"

joinArray(array, ",", {ignoreWhiteSpace: true});
//=> "1 ,\t2"
```

#### `trimEntries`

Remove white space from all elements in the array before joining.

_Type: `boolean`_<br />
_default is set to `false`_

```js
const array = [
  "\t", // empty when whitespace is trimmed
  "1 ", // white space removed
  "\t2" // white space removed
];

joinArray(array);
//=> "\t,1 ,\t2"

joinArray(array, ",", {trimEntries: true});
//=> "1,2"
```

#### `ignoreFalsy`

Treat falsy values (**except zero!**) as an empty element.

_Type: `boolean`_<br />
_default is set to `false`_

```js
const array = [
  1,
  null,      // falsy
  "2",
  0,         // falsy, but NOT treated as such!
  undefined, // falsy
  false      // umm, yeah falsy
];

joinArray(array);
//=> "1,null,2,0,undefined,false"

joinArray(array, ",", {ignoreFalsy: true});
//=> "1,2,0" // zero is not treated as a falsy value!
```

#### `appendJoiner`

Append the joiner to the end of the joined array

_Type: `boolean`_<br />
_default is set to `false`_

```js
const array = [
  "",   // empty when whitespace is trimmed away
  "1 ", // not modified
  " 2"  // not modified
];

joinArray(array);
//=> "1 , 2"

joinArray(array, ",", {appendJoiner: true});
//=> "1 , 2,"
```

#### `flattenDepth`

The library uses [`flat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) set to this depth - *Added in v1.1.0*.

_Type: `number`_<br />
_default is set to `Infinity`_

**Note** `flat()` removes empty slots in the array to the set depth. Any
nested array(s) of greater depth are automatically flattened when `join()` is
applied.

```js
const array = [0, 1, " ", [" 3", null, [, 5, undefined, [, 7]]]];

[0, 1, " ", [" 3", null, [, 5, undefined, [, 7]]]].join();
//=> "0,1, , 3,,,5,,,7"

[0, 1, " ", [" 3", null, [, 5, undefined, [, 7]]]].flat(Infinity).join();
//=> "0,1, , 3,,5,,7"

joinArray(array, "0x1x3x5x7x");
//=> "0,1, , 3,null,5,undefined,7"

joinArray(array, ",", {flattenDepth: 1});
//=> "0,1, , 3,null,,5,,,7"

joinArray(array, ",", {flattenDepth: 2});
//=> "0,1, , 3,null,5,undefined,,7"

joinArray(array, ",", {flattenDepth: 3});
//=> "0,1, , 3,null,5,undefined,7"
```

## Examples

```js
const joinArray = require("join-non-empty-array");

// params: array, joiner, options
console.log(joinArray([0, 1, " " , 2, 3], ";", {ignoreWhiteSpace: true}));
//=> "0;1;2;3"

const opts = {
  ignoreWhiteSpace: true,
  trimEntries: true,
  ignoreFalsy: true,
  appendJoiner: true,
  flattenDepth: Infinity // default value
};
let array = ["\na", NaN, "b\n", 0, "   ", "d\t", "\t\n", "\tf\n "];
console.log(joinArray(array, "-", opts));
//=> "a-b-0-d-f-"

array = [0, 1, " ", [" 3", null, [, 5, undefined, [, 7]]]];
console.log(joinArray(array, ",", opts));
//=> "0,1,3,5,7,"
```


## License

MIT
