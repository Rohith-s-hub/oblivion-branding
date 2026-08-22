import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const fontsDir = join(root, 'public', 'fonts');
if (!existsSync(fontsDir)) {
  mkdirSync(fontsDir, { recursive: true });
}

const fontsToCopy = [
  // Geist Sans
  ['node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2', 'public/fonts/Geist-Regular.woff2'],
  ['node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2', 'public/fonts/Geist-Medium.woff2'],
  ['node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2', 'public/fonts/Geist-SemiBold.woff2'],
  // Geist Mono
  ['node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2', 'public/fonts/GeistMono-Regular.woff2'],
  ['node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2', 'public/fonts/GeistMono-Medium.woff2'],
  ['node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.woff2', 'public/fonts/GeistMono-SemiBold.woff2'],
];

for (const [src, dest] of fontsToCopy) {
  const srcPath = join(root, src);
  const destPath = join(root, dest);
  try {
    copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${src.split('/').pop()} → ${dest}`);
  } catch (e) {
    console.error(`✗ Failed to copy ${src}: ${e.message}`);
  }
}

console.log('\nFont copy complete.');
