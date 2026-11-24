import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-Line Roast: The Gadget You Use Every Day.
// The roast targets the iPhone's "Optimized Battery Charging": it stops at
// 80% to protect the battery, then hands you a phone that is already tired.
const LINE =
  "My iPhone stops charging at 80% to protect its battery, then sends me out the door already tired.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (!LINE.trim()) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and verify: the file must hold exactly the line, byte for byte.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the roast line");
}
const bytes = Buffer.byteLength(back, "utf8");
console.log(`wrote ${outFile} (${chars} code points, ${bytes} bytes)`);
console.log(`verified: entry.txt holds exactly the ${chars}-character line`);
