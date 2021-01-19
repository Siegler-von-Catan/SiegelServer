/*
 * ShapeFromShading - Creating heightmaps out of 2D seal images.
 * Copyright (C) 2021
 * Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import env from "dotenv";
import express from "express";
import * as fs from "fs";
import * as path from 'path';
import cors from "cors";

env.config();

const port = process.env.PORT || 8080;
const staticFiles = process.env.STATIC_FILES || "static";
const useDev = process.env.USE_DEV || false;
const browseFiles = process.env.STATIC_FILES || "staticBrowse"


const app = express();

if (useDev) {
    app.use(cors());
}

app.use("/", express.static(staticFiles, {extensions: ["html"]}));
app.use("/staticBrowse", express.static(browseFiles));

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

app.get("/browseSealCoordinates", (req, res) => {
  res.sendFile("browseSealCoordinates.csv", {root: "assets"});
});

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
});
