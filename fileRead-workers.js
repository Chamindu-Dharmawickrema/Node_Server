//to create worker thread
//this worker thread to read a file
import { worker } from "workerpool";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(join(__filename));

//read the file
export const readHTMLFile = (filename) => {
    const data = readFileSync(join(__dirname, "public", filename));
    return data;
};

//worker
worker({
    html: readHTMLFile,
});
