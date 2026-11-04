import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../public");

async function walk(dir) {
  let files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await walk(fullPath));
    } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convert() {
  console.log("Searching for images in:", PUBLIC_DIR);
  const images = await walk(PUBLIC_DIR);
  console.log(`Found ${images.length} images to process.`);

  for (const file of images) {
    const ext = path.extname(file);
    const targetFile = file.slice(0, -ext.length) + ".webp";
    try {
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(targetFile);
      console.log(`✓ Converted: ${path.basename(file)} -> ${path.basename(targetFile)}`);
    } catch (err) {
      console.error(`✗ Failed ${file}:`, err.message);
    }
  }
  console.log("Image optimization complete.");
}

convert();
