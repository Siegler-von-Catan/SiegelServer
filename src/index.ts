import env from "dotenv";
import express from "express";
import * as fs from "fs";
import * as path from 'path';

env.config();

const port = process.env.PORT || 8080;
const staticFiles = process.env.STATIC_FILES || "static";

const app = express();
app.use("/", express.static(staticFiles, {extensions: ["html"]}));

const data = JSON.parse(fs.readFileSync("assets/siegel.json", "utf-8"));
app.get("/data", (req, res) => {
    res.json(data);
});

app.get("/siegel", (req, res) => {
    res.sendFile(req.query.file.toString(), {root: "assets"});
})

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
});
