import { log } from "node:console";
import { createServer } from "node:http";
import { pool } from "workerpool";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(join(__filename));

const PORT = process.env.PORT || 5000;

//select fileRead-workers file
const fileReadPool = pool(join(__dirname, "fileRead-workers.js"));

createServer(async (req, res) => {
    if (req.url === "/") {
        res.writeHead(200, "Content-type:text/html");

        // worker name and pass the html file
        //read the file and send it
        try {
            const result = await fileReadPool.exec("html", ["home.html"]);
            res.end(result);
        } catch (err) {
            log(err);
            res.end(err);
        } finally {
            fileReadPool.terminate();
        }
    }
    else if (req.url==='/about'){
         res.writeHead(200, "Content-type:text/html");

        // worker name and pass the html file
        //read the file and send it
        try {
            const result = await fileReadPool.exec("html", ["about.html"]);
            res.end(result);
        } catch (err) {
            log(err);
            res.end(err);
        } finally {
            fileReadPool.terminate();
        }
    }
}).listen(PORT, () => log("server running..."));
