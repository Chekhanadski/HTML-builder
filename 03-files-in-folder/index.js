const fs = require('fs').promises;
const path = require('path');

async function displayFileInfo() {
  const folderPath = path.join(__dirname, 'secret-folder');
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (let file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fs.stat(filePath);
        const fileSize = stats.size;
        const fileExtension = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, `.${fileExtension}`);
        console.log(`${fileName} - ${fileExtension} - ${fileSize}b`);
      }
    }
  } catch (error) {
    console.error(`Error reading folder: ${error}`);
  }
}
displayFileInfo();
