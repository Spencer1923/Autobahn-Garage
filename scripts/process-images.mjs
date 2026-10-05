import sharp from "sharp";
import fs from "fs";
import path from "path";

const input = "raw-images";   // where your originals are
const output = "public/cars"; // where the site reads them from
fs.mkdirSync(output, { recursive: true }); // create the folder if missing

for (const file of fs.readdirSync(input)) {
  // Skip anything that isn't an image
  if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;

  // "C63.PNG" -> "c63" (lowercase name, extension removed)
  const name = path.parse(file).name.toLowerCase();

  await sharp(path.join(input, file))
    .rotate()                                              // fix phone-photo rotation
    .resize(1800, 1200, { fit: "cover", position: "attention" }) // crop to 3:2, keeping the interesting part
    .jpeg({ quality: 78, mozjpeg: true })                  // compress to ~150-300 KB
    .toFile(path.join(output, `${name}.jpg`));

  console.log("done:", name);
}