import env from "dotenv";
import express from "express";
import * as fs from "fs";
import * as path from 'path';
import cors from "cors";

env.config();

const port = process.env.PORT || 8080;
const staticFiles = process.env.STATIC_FILES || "static";
const useDev = process.env.USE_DEV || false;


const app = express();

if (useDev) {
    app.use(cors());
    console.log("Using cors");
}

if (!useDev) {
    app.use("/", express.static(staticFiles, {extensions: ["html"]}));
}

const data = JSON.parse(fs.readFileSync("assets/siegel.json", "utf-8"));
app.get("/data", (req, res) => {
    const id = parseInt(req.query.i?.toString());
    if (!isNaN(id)) {
        res.json({siegel: data.siegel[id]})
    } else {
        res.json(data);
    }
});

app.get("/siegel", (req, res) => {
    res.sendFile(req.query.file.toString(), {root: "assets"});
})

app.get("/browseSealCoordinates", (req, res) => {
  res.sendFile("browseSealCoordinates.csv", {root: "assets"});
});

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
});
