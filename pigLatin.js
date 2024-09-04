#! /usr/bin/env node
// The line above is a "Shebang" line (https://en.wikipedia.org/wiki/Shebang_(Unix)). It's only necessary for running the script as a stand-alone CLI program.

// Getting user input
const args = process.argv.slice(2);

// splitting the user input into words
const inputArr = args[0].split(' ');

// for looking up vowels; this way we don't need "if (fistLetter === "a" || firstLetter === "b"....)"
const vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U'];
// const vowels = new Set(['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U'])

// for handling some edge cases like "Awesome!"
const punctuation = ['.', ',', ';', '!', '?', '-'];

// utilty function to check if a letter is uppercase already
const isUpperCase = (letter) => letter === letter.toUpperCase();

// utility function to uppercase the first letter and lowercase everything else ("word" -> "Word")
const capitalize = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();

// Let's loop over the user input word for word...
for (let i = 0; i < inputArr.length; i++) {
  // getting the single word (for readability)
  let word = inputArr[i];
  // getting the word's first letter (also readability)
  const firstLetter = word[0];

  // hold a possible special character
  let punc = '';

  // if the last character is special (e.g "Hello," -> ",")
  // store it in punct and use only the other stuff as *word*
  // (could be improved upon to take care of multiple special chars ("hello!!!"))
  // or special chars at other positions ("it's")
  if (punctuation.includes(word[word.length - 1])) {
    punc = word[word.length - 1];
    word = word.slice(0, word.length - 1);
  }

  // check if the first letter is a vowel
  if (vowels.includes(firstLetter)) {
    // replace the word in the holding array with a possible special character atteched
    inputArr[i] = word + 'way' + punc;
    // we're done with the current word and can continue the loop with the next word
    continue;
  }

  // getting the second letter
  const secondLetter = word[1];

  // if the second letter is a vowel,
  // put it at the end of the word
  // else - put the first two letters at the end
  // HOMEWORK: re-write this as a ternary
  if (vowels.includes(secondLetter)) {
    word = word.slice(1) + word.slice(0, 1);
  } else {
    word = word.slice(2) + word.slice(0, 2);
  }

  // if the first letter was uppercase, capitalize the word
  // elloH -> Elloh
  if (isUpperCase(firstLetter)) {
    word = capitalize(word);
  }

  // finally attach 'ay' and the special character and put the changed word back in the array
  inputArr[i] = word + 'ay' + punc;
}

// for "pausing" the program
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// in order to print letter by letter in a visible way, the program needs to be paused slightly
// async functions allow us to *await* a promise to resolve
const printOutput = async (string) => {
  // for each letter...
  for (let i = 0; i < string.length; i++) {
    // write the letter to the console, but right next to the last letter
    process.stdout.write(string[i]);
    await wait(25);
  }
};

// These here are codes for terminal colors (ANSI). You put the color code as string before your output and reset it to normal after your string
const red = '\x1b[31m';
const green = '\x1b[32m';
const reset = '\x1b[0m';
console.log('\n');
// console.log('\t' + green + inputArr.join(' ') + reset);
printOutput('\t' + green + inputArr.join(' ') + reset);
console.log('\n');

// In order to make a node script 'installable' locally, you need to add the shebang line on top, create a package.json right next to your file and fill it with that:
// {
//   "name": "pig-latin",
//   "bin": {
//     "pig-latin": "./pigLatin.js"
//   }
// }

// "bin" defines how to run your script
// the key in that object is your future, self-baked terminal command
// the value is the file you want to run
// "name" is necessary as well

// Now you can install it . Make sure your terminal is in the same directory as your files, then run
// npm install -g .

// Now you can run it from everywhere in some of your terminals
// pig-latin "Have fun!"
