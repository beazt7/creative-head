import { mkdir, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const source = fileURLToPath(new URL("../../images/", import.meta.url));
const destination = fileURLToPath(
  new URL("../public/images/", import.meta.url),
);
const preview = fileURLToPath(new URL("../.preview/", import.meta.url));
await mkdir(destination, { recursive: true });
await mkdir(preview, { recursive: true });
const files = (await readdir(source))
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
  .sort();
const tiles = [];
let originalBytes = 0;
let optimizedBytes = 0;
for (const [index, file] of files.entries()) {
  const input = path.join(source, file);
  const output = path.join(destination, `${path.parse(file).name}.webp`);
  await sharp(input)
    .rotate()
    .resize({
      width: 1400,
      height: 1400,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toFile(output);
  originalBytes += (await stat(input)).size;
  optimizedBytes += (await stat(output)).size;
  const tile = await sharp(input)
    .rotate()
    .resize(210, 235, { fit: "contain", background: "#f4eee8" })
    .extend({ bottom: 25, background: "#f4eee8" })
    .composite([
      {
        input: Buffer.from(
          `<svg width="210" height="260"><text x="10" y="252" font-size="13" fill="#272028">${file}</text></svg>`,
        ),
      },
    ])
    .jpeg()
    .toBuffer();
  tiles.push({
    input: tile,
    left: (index % 5) * 210,
    top: Math.floor(index / 5) * 260,
  });
}
await sharp({
  create: {
    width: 1050,
    height: Math.ceil(files.length / 5) * 260,
    channels: 3,
    background: "#f4eee8",
  },
})
  .composite(tiles)
  .jpeg({ quality: 85 })
  .toFile(path.join(preview, "contact-sheet.jpg"));
console.log(
  `Prepared ${files.length} photos: ${(originalBytes / 1024 / 1024).toFixed(1)} MB -> ${(optimizedBytes / 1024 / 1024).toFixed(1)} MB. Originals untouched.`,
);
