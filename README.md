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
```

## API

Join an array into a string with options.

### Params

* `array` {**Array**} (Required): Array to join together.
* `joiner` {**String**} (Optional; default = `","`): String used to join elements of the array.
* `options` {**Object**} (Optional).

### Options

All options are `false` by default:

#### `ignoreWhiteSpace`

Remove white space in array elements before determining if it is empty. The elements are *not* modified.

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
  appendJoiner: true
};
const array = ["\na", NaN, "b\n", 0, "   ", "d\t", "\t\n", "\tf\n "];
console.log(joinArray(array, "-", opts));
//=> "a-b-0-d-f-"
```


## License

MIT
