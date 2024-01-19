const fs = require('fs');
const readline = require('readline');

const readAndSendDataFromConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const stream = fs.createWriteStream('./02-write-file/output.txt');

console.log('Welcome! Please enter some text.');

readAndSendDataFromConsole.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Goodbye!');
    process.exit(0);
  } else {
    stream.write(input + '\n');
  }
});

readAndSendDataFromConsole.on('close', () => {
  console.log('Goodbye!'); 
  process.exit(0);
});
