import env from "dotenv";
import express from "express";
import * as fs from "fs";
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
for (let i = 0; i < data.siegel.length; i++) {
    data.siegel[i].id = i;
}

app.get("/randomSiegels", (req, res) => {
    const amount = parseInt(req.query.amount?.toString());
    if (!isNaN(amount) && amount < data.siegel.length) {
        const shuffled = [...data.siegel].sort(() => 0.5 - Math.random());
        res.json({siegel: shuffled.slice(0, amount)});
    } else {
        res.status(400);
    }
});

app.get("/data", (req, res) => {
    const id = parseInt(req.query.i?.toString());
    if (!isNaN(id)) {
        res.json({siegel: data.siegel[id]})
    } else {
        res.json(data);
    }
});

const types = ["heightmap", "obj", "original"];
app.get("/siegel", (req, res) => {
    const type = req.query.type.toString();
    const id = req.query.id.toString();
    const siegel = data.siegel[id];
    if (!types.includes(type)) {
        res.sendStatus(400);
    } else if (!siegel) {
        res.sendStatus(400);
    } else {
        res.sendFile(`${type}/${siegel[type]}`, {root: "assets"});
    }
})

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
});
