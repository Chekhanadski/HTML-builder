const fs = require('fs');

const readStream = fs.createReadStream('01-read-file/text.txt', 'utf-8');

readStream.on('data', function(chunk) {
  console.log(chunk);
}).on('error', function(err) {
  console.error('Error reading the file:', err);
})
