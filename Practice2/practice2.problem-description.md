# Functional Programming Practice 2 - Generating test data for Practice 1

## Problem Description

Write a function `generate`:

```javascript
function generate(numberOfTestcases){
  // Your code here
}
```

In this practice, you will create the generator that was used to create `practice1-test-data.json`. `numberOfTestcases` is the number of data sets that must be generated.

Your function's output must have the follow format:

```javascript
[
  {
    "input": [
      /*
       * An array of random length [0-50] containing unique integer numbers ranging from -10000 to 10000.
       * The array is sorted by ascending order
       */
    ],
    "target" : // a number to search for within the array.
    "output" : // expected result of Practice 1's search function (the index of target within input)
  },
  ... // more test cases of the same format
]
```

Furthermore, if `numberOfTestcases` is 4 or more. Your returned test cases must have all of the following special cases:

 - *Zero-length*: `input` is an empty array `[]`.
 - *Not found*: `input` doesn't contain `target`.
 - *First index*: `target` is at index 0.
 - *Last index*: `target` is at index `input.length-1`.

After you're done submit the folder to your git repository for evaluation.

## Requirement & Constraint

As with practice 1, you must solve this problem using Functional Programming code style:

- You are not allowed to use the keywords `var`, `let`, `if` or `switch`. Use the tenary operator for decision-making. All variables must be `const`.
- Loops (`for`, `while`) are also forbidden. Try to work with `map()`, `filter()`, `reduce()`. Create arrays with `Array.from()` instead of a loop.
- You are not allowed to mutate any variable (arrays are also objects). `push()`, `splice()` and other functions that mutate an array are to be avoided. When you want to mutate an object, create a new object instead (for example: DO NOT `return arr.sort()`, DO `return arr.slice().sort()` instead).

After you're done run `node test-practice2.js` to make sure the algorithm work correctly. After that submit the folder to your git repository for evaluation.