const fs = require('fs').promises;
const path = require('path');

async function clearDir(dir) {
  const files = await fs.readdir(dir);
  await Promise.all(files.map(file => fs.unlink(path.join(dir, file))));
}

async function copyDir(copyFrom, copyTo) {
  try {
    await fs.mkdir(copyTo, { recursive: true });
    await clearDir(copyTo);
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
