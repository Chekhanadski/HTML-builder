const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function buildPage() {
  const outputDir = path.join(__dirname, 'project-dist');
  const componentsDir = path.join(__dirname, 'components');
  const stylesDir = path.join(__dirname, 'styles');
  const assetsDir = path.join(__dirname, 'assets');
  const templateFile = path.join(__dirname, 'template.html');

  await fs.mkdir(outputDir, { recursive: true });

  const data = await fs.readFile(templateFile, 'utf8');
  const components = await fs.readdir(componentsDir);

  let html = data;
  for (const component of components) {
    const componentName = path.basename(component, '.html');
    while (html.includes(`{{${componentName}}}`)) {
      const componentPath = path.join(componentsDir, `${componentName}.html`);
      const componentContent = await fs.readFile(componentPath, 'utf8');
      html = html.split(`{{${componentName}}}`).join(componentContent);
    }
  }

  await fs.writeFile(path.join(outputDir, 'index.html'), html);

  const styleFiles = await fs.readdir(stylesDir);
  let styles = '';
  for (const file of styleFiles) {
    styles += await fs.readFile(path.join(stylesDir, file), 'utf8');
  }

  await fs.writeFile(path.join(outputDir, 'style.css'), styles);

  await copyDir(assetsDir, path.join(outputDir, 'assets'));

  console.log('Page successfully built and saved.')
}

buildPage().catch(console.error);
