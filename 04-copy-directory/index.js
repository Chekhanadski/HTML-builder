const fs = require('fs').promises;
const path = require('path');

async function copyDir(copyFrom, copyTo) {
  try {
    await fs.mkdir(copyTo, { recursive: true });
    const contentFiles = await fs.readdir(copyFrom, { withFileTypes: true });

    for (let contentFile of contentFiles) {
      let copyFromPath = path.join(copyFrom, contentFile.name);
      let copyToPath = path.join(copyTo, contentFile.name);
      if (contentFile.isDirectory()) {
        await copyDir(copyFromPath, copyToPath);
      } else {
        await fs.copyFile(copyFromPath, copyToPath);
      }
    }
    console.log('Copy completed');
  } catch (error) {
    console.error(error);
  }
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
