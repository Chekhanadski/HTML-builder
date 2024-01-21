const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  try {
    const stylesFolder = path.join(__dirname, 'styles');
    const distFolder = path.join(__dirname, 'project-dist');
    const bundlePath = path.join(distFolder, 'bundle.css');
    await fs.mkdir(distFolder, { recursive: true });
    const files = await fs.readdir(stylesFolder);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    let bundleContent = '';
    for (let file of cssFiles) {
      const content = await fs.readFile(path.join(stylesFolder, file), 'utf-8');
      bundleContent += content + '\n';
    }
    await fs.writeFile(bundlePath, bundleContent, 'utf8');
    console.log('CSS compilation completed');
  } catch (error) {
    console.log(error);
  }
}
mergeStyles();
