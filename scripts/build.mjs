import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const JS_FILES = [
  'src/js/core/persistence.js',
  'src/js/core/state.js',
  'src/js/audio.js',
  'src/js/particles.js',
  'src/js/economy.js',
  'src/js/achievements.js',
  'src/js/upgrades.js',
  'src/js/eggs.js',
  'src/js/creatures.js',
  'src/js/businesses.js',
  'src/js/inventory.js',
  'src/js/ui.js',
  'src/js/dialogs.js',
  'src/js/core/timers.js',
  'src/js/main.js'
];

function build() {
  console.log('Building Duckventure...');

  // 1. Read index.html template
  const indexPath = path.join(rootDir, 'src', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  // 2. Read CSS
  const cssPath = path.join(rootDir, 'src', 'css', 'main.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  // 3. Read and bundle JS in dependency order
  const jsParts = [];
  for (const relPath of JS_FILES) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing source file: ${relPath}`);
    }
    const content = fs.readFileSync(fullPath, 'utf-8');
    jsParts.push(`\n  /* ===== Module: ${relPath} ===== */\n${content}`);
  }
  const bundledJs = jsParts.join('\n');

  // 4. Inline CSS into <style>...</style>
  html = html.replace(
    '<link rel="stylesheet" href="css/main.css">',
    `<style>\n${css}\n</style>`
  );

  // 5. Inline JS into <script>...</script>
  html = html.replace(
    '<script src="js/main.js"></script>',
    `<script>\n${bundledJs}\n</script>`
  );

  // 6. Ensure dist directory exists
  const distDir = path.join(rootDir, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 7. Write output files
  const distFile = path.join(distDir, 'duckventure-alpha.html');
  fs.writeFileSync(distFile, html, 'utf-8');
  console.log(`Saved build artifact to: ${distFile}`);

  const rootFile = path.join(rootDir, 'duckventure-alpha.html');
  fs.writeFileSync(rootFile, html, 'utf-8');
  console.log(`Synchronized root standalone file: ${rootFile}`);

  console.log('Build complete! Self-contained HTML ready for offline execution.');
}

build();
